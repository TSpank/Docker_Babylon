# %%
from flask import Flask,jsonify
from flask import current_app, flash, jsonify, make_response, redirect, request, url_for, render_template
from flask_mqtt import Mqtt
from flask import request
import hmac
import os
import logging
import time
import paho.mqtt.client as paho
import json
import threading
from flask_cors import CORS

# %%
mqtt_server = "mhubweb.scopemp.net"
mqtt_port = 1883
# mqtt_topic = "mojo/pose"
#  mqtt_uuid = "#" #"86C48451-22D2-423A-BEFF-347C5AAC35F8"
mqtt_uuid = "jec" #"86C48451-22D2-423A-BEFF-347C5AAC35F8"
mqtt_topic = f"mojo/iOS/{mqtt_uuid}"
mqtt_client = "mojo_py_demo_24"
mqtt_user = "scope_mosquitto"
mqtt_pass = "dektzOWb3pmI"
app = Flask(__name__)
app.config['MQTT_BROKER_URL'] = mqtt_server  # use the free broker from HIVEMQ
app.config['MQTT_BROKER_PORT'] = 1883  # default port for non-tls connection
app.config['MQTT_USERNAME'] = mqtt_user # set the username here if you need authentication for the broker
app.config['MQTT_PASSWORD'] = mqtt_pass  # set the password here if the broker demands authentication
app.config['MQTT_KEEPALIVE'] = 5  # set the time interval for sending a ping to the broker to 5 seconds
app.config['MQTT_TLS_ENABLED'] = False  # set TLS to disabled for testing purposes
cors = CORS(app, resources={r"/": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


ip_uuid = {}
messages = {}
last_msg = None
message_keys = ['theta_armright_lower_beta', 'theta_armright_lower_gamma', 'theta_armleft_upper_beta', 'theta_torso_yaw_r', 'theta_head_yaw_h', 'theta_armleft_lower_gamma', 'theta_torso_tilt_r', 'theta_armright_upper_alpha', 'theta_head_roll_h', 'theta_armleft_upper_alpha', 'theta_torso_bend_r', 'theta_head_pitch_h', 'theta_armright_upper_gamma', 'theta_torso_pitch_r', 'theta_armleft_lower_alpha', 'theta_armright_upper_beta', 'theta_armleft_lower_beta', 'theta_armleft_upper_gamma', 'theta_armright_lower_alpha', 'theta_torso_roll_r']
message_template = {}
for key in message_keys:
    message_template[key] = 0.

mqtt = Mqtt(app)
payload = {}

@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    print('Connected to mqtt broker')
    mqtt.subscribe(mqtt_topic)

@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    global payload
    global messages
    payload=message.payload
   #  if type(payload)==str:
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()        
    )
    _uuid = message.topic.split('/')[-1]
    messages[_uuid] = message.payload
    print(messages)
 
@app.route("/cookie")
def cookie():
    _uuid = request.cookies.get('uuid')
    if _uuid != None:
        ip_uuid[request.remote_addr] = _uuid
        return f'success: uuid={_uuid}'
    else:
        return 'fail'
        
@app.route("/")
def home():
    # response = ''
    global message_template
    global payload
    global ip_uuid
    global last_msg
    msg = {}
    msg['pose'] = message_template.copy()
    _ip = request.remote_addr
    _payload = None
    if _ip in ip_uuid.keys():
        _uuid = ip_uuid[_ip]    
        if str(_uuid) in messages:
            payload = messages.pop(str(_uuid),msg)
            # payload = messages[str(_uuid)]
    try:
        if payload is not None:
            _payload = json.loads(payload)
            if 'deflection_x' in _payload.keys():
                msg['pose']['theta_head_pitch_h'] = _payload["deflection_y"]
                msg['pose']['theta_head_yaw_h'] = _payload["deflection_z"]
                msg['pose']['theta_head_roll_h'] = _payload["deflection_x"]
            else: #if 'pose' in _payload.keys():
                msg = _payload.copy()
            payload = None
            last_msg = msg
        elif last_msg is not None:
            msg = last_msg
        
    except Exception as e:
        # msg['type'] = _
        msg = {}
        msg['error'] = str(e)
        if _payload is not None:
            msg['payload'] = _payload
    
    return json.dumps(msg)

@app.route("/ip")
def ip():
    ip_address = request.remote_addr
    return "Requester IP: " + ip_address

@app.route("/uuid")
def user_uuid_inspect():
    global ip_uuid
    _uuid = request.cookies.get('uuid')
    if _uuid != None:
        ip_uuid[request.remote_addr] = _uuid
        return _uuid
    else:
        return ''

@app.route("/uuid/<user_uuid>")
def user_uuid_msg(user_uuid):
    global messages
    global ip_uuid
    msg = {}
    msg['pose'] = message_template.copy()
    ip_uuid[request.remote_addr] = user_uuid
    
    try:
        if str(user_uuid) in messages:
            _payload = json.loads(messages[str(user_uuid)])
            if 'deflection_x' in _payload.keys():
                msg['pose']['theta_head_pitch_h'] = _payload["deflection_y"]
                msg['pose']['theta_head_yaw_h'] = _payload["deflection_z"]
                msg['pose']['theta_head_roll_h'] = _payload["deflection_x"]
            else: #if 'theta_head_roll_h' in _payload.keys():
                msg = _payload.copy()
    except Exception as e:
        # msg['type'] = _
        msg['error'] = str(e)
    resp = make_response(render_template('template.html'))
    resp.set_cookie('uuid', user_uuid)
    resp.response = "OK"
    return resp #
    
@app.route("/uuids")
def uuids():
    global messages
    msg = []
    for k in messages.keys():
        msg.append(k)
    return json.dumps(msg)   
    
@app.route("/updateuuid")
def uuid():
    global mqtt_uuid
    global mqtt_topic
    global ip_uuid
    _s = {}
    _ip = request.remote_addr
    _uuid = request.args.get('uuid',"")
    _s['UUID old'] = mqtt_uuid
    if len(_uuid) > 0:
        _s['UUID New'] = _uuid
        mqtt.unsubscribe(mqtt_topic)
        _s['Unsubscribe'] = mqtt_topic
        mqtt_uuid = _uuid
        mqtt_topic = f"mojo/iOS/{_uuid}"
        mqtt.subscribe(mqtt_topic)
        _s['Subscribe'] = mqtt_topic
    else:
        if _ip in ip_uuid.keys():
            _s['IP UUID'] = ip_uuid[_ip]    
    return json.dumps(_s)


if __name__ == '__main__':
    log = logging.getLogger('werkzeug')
    log.disabled = True
    #//app.run(host='0.0.0.0', port=5000)
    app.run(host='0.0.0.0', port=5000,debug=True) #,ssl_context=('/etc/nginx/mojo.r7d.xyz.crt', '/etc/nginx/mojo.r7d.xyz.key'),debug=False)


# %%

'''
# Camera API

## Overview

This API allows you to control the position and target of a camera in a 3D environment.

## JSON Data Format

The data for the Camera API is represented as a JSON object with the following structure:

json
{
    "camera": {
        "position": [x, y, z],
        "target": [x, y, z],
        "animation": boolean
    }
}

### `camera`

The `camera` object contains information about the camera's position and target.

#### `position`

The `position` property is an array of three numbers representing the x, y, and z coordinates of the camera's position in 3D space. For example, `[0.0, 1.5, -5.0]` represents a camera positioned at x=0.0, y=1.5, and z=-5.0.

#### `target`

The `target` property is an array of three numbers representing the x, y, and z coordinates of the point that the camera is looking at. For example, `[0, 1.076873443174144, 0]` represents a target point at x=0, y=1.076873443174144, and z=0.

#### `animation`

The `animation` property is a boolean value that determines whether or not the camera's movement should be animated. If `animation` is set to `true`, the camera will smoothly transition from its current position to its new position when its position or target is changed. If `animation` is set to `false`, the camera will immediately move to its new position without any animation.
'''