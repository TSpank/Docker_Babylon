# %%
import asyncio
import websockets
import pathlib
import ssl
import json
import random
import ast
import animation_data
# %%
camera_index = 0
camera_pos = [
    [-2, 1.5, 0.0],
    [0, 1.5, -2.0],
    [-2, 1.5, -2.0],
    [2, 1.5, -2.0],
    [0, 1.5, 2.0]]
mojo_message = {'pose': {'theta_torso_pitch_r': '0.0',
  'theta_torso_bend_r': '0.0',
  'theta_torso_yaw_r': '0.0',
  'theta_torso_roll_r': '0.0',
  'theta_torso_tilt_r': '0.0',
  'theta_head_pitch_h': '0.0',
  'theta_head_yaw_h': '0.0',
  'theta_head_roll_h': '0.0',
  'theta_armright_upper_alpha': '0.0',
  'theta_armright_upper_beta': '0.0',
  'theta_armright_upper_gamma': '0.0',
  'theta_armright_lower_alpha': '0.0',
  'theta_armright_lower_beta': '0.0',
  'theta_armright_lower_gamma': '0.0',
  'theta_armright_elbow': '0.0',
  'theta_armleft_upper_alpha': '0.0',
  'theta_armleft_upper_beta': '0.0',
  'theta_armleft_upper_gamma': '0.0',
  'theta_armleft_lower_alpha': '0.0',
  'theta_armleft_lower_beta': '0.0',
  'theta_armleft_lower_gamma': '0.0',
  'theta_armleft_elbow': '0.0'},
  'camera': {'position': [-1.0, 1.6, 0.0], 'camera_target': [0.0, 1.6, 0.0],'animation':False}}



# js = json.loads(message)

def default_msg():
    msg = {}
    mojo_message['pose']['theta_armright_upper_alpha'] = str(float(mojo_message['pose']['theta_armright_upper_alpha']) + 0.1)
    # msg['pose'] = mojo_message['pose']            
    camera = [0., 1.5, -1.0] #camera_pos[0]
    target = [0,1.6,0]
    msg['camera'] = {}
    msg['camera']['position'] = camera
    msg['camera']['target'] = target
    msg['camera']['animation'] = False
    msg['animation'] = {'config':animation_data.animations}
    msg['control'] = {'command':'pause','animation':''}
    return msg

async def handle_websocket(websocket, path):
    global message
    global camera_index
    # This function will be called whenever a new WebSocket connection is established
    print("New WebSocket connection established")
    
    await websocket.send(json.dumps(default_msg()))
    
    # Receive messages from the client
    async for message in websocket:
        # try:
        #     request = json.loads(message)
        # except Exception as e:
        #     request = {}
        #     print(e)
        print(f'Request: {message}')
        request = ast.literal_eval(message)
        msg = {}
        if "request" in request:
            print(request["request"])
            if "pose" in request['request']:
                mojo_message['pose']['theta_armright_upper_alpha'] = str(float(mojo_message['pose']['theta_armright_upper_alpha']) + 0.1)
                msg['pose'] = mojo_message['pose']            
                # msg = default_msg()
            if "camera" in request['request']:
                camera = camera_pos[camera_index % len(camera_pos)]
                camera_index +=1
                target = [0,1.5*random.random(),0]
                msg['camera'] = {}
                msg['camera']['position'] = camera
                msg['camera']['target'] = target
                msg['camera']['animation'] = False
                # print(f"camera: {camera} Target: {target}")   
            if "animation" in request['request']:
                msg['animation'] = {}
                msg['animation']['config'] = animation_data.animations
                msg['animation']['list'] = True
                # print("Request: animation")
            if "control" in request['request']:
                msg['control'] = {}
                msg['control']['command'] = 'play'
                l = len(animation_data.animation_titles)-1
                msg['control']['animation'] = animation_data.animation_titles[random.randint(0,l)]
            if "stop" in request['request']:
                msg['control'] = {}
                msg['control']['command'] = 'stop'
            if "echo" in request['request']:
                msg = request['request']['echo']
            print(json.dumps(msg))
            await websocket.send(json.dumps(msg))
        else:
            print(request)


#ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
#ssl_context.load_cert_chain("server.crt", "server.key")

# Start a WebSocket server
async def start_server():
    # async with websockets.serve(handle_websocket, "localhost", 8000,ssl=ssl_context):
    async with websockets.serve(handle_websocket, "localhost", 8000):
        print("WebSocket server started")
        await asyncio.Future()  # Keep the server running indefinitely

# Run the server
# asyncio.run(start_server())
# %%
await start_server()

# %%
