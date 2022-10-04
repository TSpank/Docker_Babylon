# %%
from flask import Flask,jsonify
from flask import request
import numpy as np
import logging
import time
import paho.mqtt.client as paho
import json
import threading




# %%
mqtt_server = "207.154.244.181"
mqtt_port = 1883
mqtt_topic = "mojo/angles"
mqtt_user = "scope_mosquitto"
mqtt_pass = "dektzOWb3pmI"
client=paho.Client("mojo_python")
client.connect(mqtt_server, mqtt_port)
# client.loop_forever()
# %%

df_angles_local = pd.read_csv(os.path.join(_folder,_file))[:] #.reset_index()
indexes = df_angles_local.index
sdx = None
edx = None
# sdx = 1950
# edx = 15000
if sdx is None:
    idx = 0
else:
    idx = sdx
 
if edx is None:
    edx = len(indexes)
pause = True

q_cal = mojoquaternion.quaternion() #0.5439246720518753,-0.6657232963760954,0.22696988270292792,0.4576495560373948) #None #mojoquaternion.quaternion(0.707,-0.707,0,0)
def HeadRotations(frame):
    global q_cal
    fkh = DHFKHead(frame)
    fkh.Skull()
    fkh.Ear()
    th04 = DHRotationMatrix.MatMul(fkh.th01,fkh.th24)
    qr = mojoquaternion.quaternion(*DHRotationMatrix.mat33_to_quat_std(th04))
    if q_cal is None:
        q_cal = qr
        print('Q-Calibate')
        print(q_cal)
    q = q_cal.inverse()*qr
    abt = {}
    [a,b,t] = mojoquaternion.to_euler(q)
    abt['a'] = a
    abt['b'] = b
    abt['t'] = t
    return abt
# %%
app = Flask(__name__)
@app.route("/")
def home():
    global idx
    global indexes
    global df
    global all_angles
    global df_angles_local
    
    if pause==False:
        idx += 1
    if idx >= edx:
        if sdx is not None:
            idx = sdx
        else:    
            idx = 0
    
    #idx = 1000
    
    fr = df_angles_local.iloc[indexes[idx]].replace(np.nan, 0.0).to_dict()
    abt = HeadRotations(fr)
    fr['type']='euler'
    fr['theta_1_r'] = fr['theta_1_r'] - fr['theta_tilt_r']
    fr['theta_1_l'] = fr['theta_1_l'] + fr['theta_tilt_l']
    fr['theta_tilt_r'] = 0.
    fr['theta_tilt_l'] = 0.
    fr['theta_head_roll_h'] = -abt['a']
    fr['theta_head_yaw_h']  = -abt['b']
    fr['theta_head_pitch_h'] = abt['t']
    response = jsonify(fr)
    if pause==False:
        if client.connect(mqtt_server, mqtt_port)==0:
            client.publish(mqtt_topic,json.dumps(fr))
  

    # Enable Access-Control-Allow-Origin
    response.headers.add("Access-Control-Allow-Origin", "*")
    
    return response

@app.route("/reset")
def reset():
    idx = 0
    response = jsonify({})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
    
@app.route("/pause")
def pause():
    global pause
    pause = True
    response = jsonify({})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/run")
def run():
    global pause
    pause = False
    response = jsonify({})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/index")
def index():
    global idx
    try:
        _index = request.args.get('index','')
        if _index is not None:
            idx = int(_index)
    except:
        pass
    response = jsonify({})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
    
@app.route("/control")
def step():
    global idx
    global pause
    global q_cal
    try:
        print(request.args)
        _step = request.args.get('step',None)
        if _step is not None:
            idx = idx + int(_step)
        _run = request.args.get('run',None)
        if _run is not None:
            if _run=='1':
                pause = False
        _pause = request.args.get('pause',None)
        if _pause is not None:
            if _pause=='1':
                pause = True
        _index = request.args.get('index',None)
        if _index is not None:
            idx = int(_index)
        _reset = request.args.get('reset',None)
        if _reset is not None:
            print('q cal')
            q_cal = None
    except Exception as e:
        print(e)
    response = jsonify({})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == '__main__':
    log = logging.getLogger('werkzeug')
    log.disabled = True
    app.run(host='0.0.0.0', port=5000)



## %%

# %%
def mqtt_sent():
    global df_angles_local
    global idx
    global client
    global run
    if run == True:
        threading.Timer(1/15., mqtt_sent).start()
    idx += 1
    if idx >= edx:
        if sdx is not None:
            idx = sdx
        else:    
            idx = 0
    fr = df_angles_local.iloc[indexes[idx]].replace(np.nan, 0.0).to_dict()
    abt = HeadRotations(fr)
    fr['type']='euler'
    fr['theta_1_r'] = fr['theta_1_r'] - fr['theta_tilt_r']
    fr['theta_1_l'] = fr['theta_1_l'] + fr['theta_tilt_l']
    fr['theta_tilt_r'] = 0.
    fr['theta_tilt_l'] = 0.
    fr['theta_head_roll_h'] = -abt['a']
    fr['theta_head_yaw_h']  = -abt['b']
    fr['theta_head_pitch_h'] = abt['t']

    if client.connect(mqtt_server, mqtt_port)==0:
        client.publish(mqtt_topic,json.dumps(fr))
# %%
idx = 0
run = True
mqtt_sent()
# %%
