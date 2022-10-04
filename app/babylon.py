# %%
from flask import Flask,jsonify
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
mqtt_server = "207.154.244.181"
mqtt_port = 1883
# mqtt_topic = "mojo/pose"
mqtt_uuid = "86C48451-22D2-423A-BEFF-347C5AAC35F8"
mqtt_topic = f"mojo/iOS/{mqtt_uuid}"
mqtt_client = "mojo_py_demo"
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
    payload=message.payload
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()        
    )
    
@app.route("/")
def home():
    # response = ''
    global message_template
    global payload
    msg = message_template.copy()
    try:
        _payload = json.loads(payload)
        if 'deflection_x' in _payload.keys():
            msg['theta_head_pitch_h'] = _payload["deflection_y"]
            msg['theta_head_yaw_h'] = _payload["deflection_z"]
            msg['theta_head_roll_h'] = _payload["deflection_x"]
        if 'theta_head_roll_h' in _payload.keys():
            msg = _payload.copy()
    except Exception as e:
        # msg['type'] = _
        msg['error'] = str(e)
    return json.dumps(msg)

@app.route("/updateuuid")
def uuid():
    global mqtt_uuid
    global mqtt_topic
    _s = {}
    _uuid = request.args.get('uuid',"")
    _s['UUID'] = _uuid
    if len(_uuid) > 0:
        mqtt.unsubscribe(mqtt_topic)
        _s['Unsubscribe'] = mqtt_topic
        mqtt_uuid = _uuid
        mqtt_topic = f"mojo/iOS/{_uuid}"
        mqtt.subscribe(mqtt_topic)
        _s['Subscribe'] = mqtt_topic
    else:
        _s['Error'] = 'Bad UUID: {_uuid}'
    return json.dumps(_s)


if __name__ == '__main__':
    log = logging.getLogger('werkzeug')
    log.disabled = True
    app.run(host='0.0.0.0', port=5000)
    #app.run(host='0.0.0.0', port=5000,ssl_context=('/cert/fullchain.pem', '/cert/privkey.pem'),debug=False)

