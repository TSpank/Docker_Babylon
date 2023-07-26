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
    [-2, 1.5, -2.0],
    [0 , 1.5, -2.0],    
    [2, 1.5, -2.0],
    [2, 1.5, 0.0]]

def Mojo_message():
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
    return mojo_message



# js = json.loads(message)

def default_msg():
    msg = {}
    mojo_message = Mojo_message()
    mojo_message['pose']['theta_armright_upper_alpha'] = str(float(mojo_message['pose']['theta_armright_upper_alpha']) + 0.1)
    # msg['pose'] = mojo_message['pose']            
    camera = [0., 1.5, -2.0] #camera_pos[0]
    target = [0,1.6,0]
    msg['camera'] = {}
    msg['camera']['position'] = camera
    msg['camera']['target'] = target
    msg['camera']['animation'] = False
    msg['animation'] = {'config':animation_data.animations}
    # msg['animation'] = {}
    # msg['animation']['config'] = {}
    # msg['animation']['config']['All Reset'] = animation_data.animations['All Reset']
    msg['control'] = {'command':'pause','animation':''}
    return msg

exercise_set_1 = [
 'Shoulder flexion',
 'Shoulder scaption',
 'Shoulder abduction',
 'Shoulder extension',
 'Row neutral',
 'Row abduction',
 'Elbow flexion',
]
exercise_set = ['All Reset',
 'Arm Reset',
 'Arm Cal 90',
 'Arm Cal 45',
 'Arm Cal 0',
 'Side Down',
 'Side Down Natural',
 'Neutral',
 'Side Abduction Palm Forward',
 'Side Abduction 45 Palm Forward',
 'Side Abduction 90 Palm Forward 2',
 'Side Abduction 90 Palm Forward',
 'Side Abduction 135 Palm Forward',
 'Side Abduction 180 Palm Forward',
 'Flexion 0',
 'Flexion 45',
 'Flexion 90',
 'Flexion 135',
 'Flexion 180',
 'Flexion -22.5',
 'Flexion -60',
 'Scaption 0',
 'Scaption 45',
 'Scaption 90',
 'Scaption 135',
 'Scaption 180',
 'Fore 0',
 'Fore 45',
 'Fore 90',
 'External Rotation',
 'Internal Rotation',
 'GHJT 0',
 'Elbow Flexion 45',
 'Shoulder Press Base',
 'Shoulder Press Extend',
 'Row -22.5',
 'Row 0',
 'Row 45',
 'Row abduction 75',
 'All Reset both']

exercise_set_2 = ['All Reset',
 'Arm Reset',
 'Arm Cal 90',
 'Arm Cal 45',
 'Arm Cal 0',
 'Side Down',
 'Side Down Natural',
 'Neutral',
 'Side Abduction Palm Forward',
 'Side Abduction 45 Palm Forward',
 'Side Abduction 90 Palm Forward 2',
 'Side Abduction 90 Palm Forward',
 'Side Abduction 135 Palm Forward',
 'Side Abduction 180 Palm Forward',
 'Flexion 0',
 'Flexion 45',
 'Flexion 90',
 'Flexion 135',
 'Flexion 180',
 'Flexion -22.5',
 'Flexion -60',
 'Scaption 0',
 'Scaption 45',
 'Scaption 90',
 'Scaption 135',
 'Scaption 180',
 'Fore 0',
 'Fore 45',
 'Fore 90',
 'External Rotation',
 'Internal Rotation',
 'GHJT 0',
 'GHJT 90',
 'Elbow Flexion 0',
 'Elbow Flexion 45',
 'Elbow Flexion 90',
 'Elbow Flexion 135',
 'Shoulder Press Base',
 'Shoulder Press Extend',
 'Row -22.5',
 'Row 0',
 'Row 45',
 'Row abduction 0',
 'Row abduction 75',
 'Prone Pendular 0',
 'Prone Pendular R25',
 'Prone Pendular L25',
 'Prone Pendular B25',
 'Prone Pendular F25',
 'Prone Pendular FR25',
 'Prone Pendular BL25',
 'Prone Pendular BR25',
 'Prone Pendular FL25',
 'Pec Stretch Rest',
 'Pec Stretch 90',
 'Pec Strech Trunk',
 'Bend 45',
 'Bend Both 45',
 'Bend 22.5',
 'Bend Both 22.5',
 'Sitting Pose Natural',
 'Sitting Thoracic Rotation',
 'Rest',
 'Head Neutral',
 'Head Yaw',
 'Head Roll',
 'Head Flexion',
 'Head Flexion 25',
 'Head Extension',
 'Head Levator Scapula',
 'All Reset both']

anim = {key: animation_data.animations[key] for key in exercise_set if key in animation_data.animations}
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
                mojo_message = Mojo_message()
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
                # msg['animation']['config'] = anim #animation_data.animations #{}
                msg['animation']['config'] = animation_data.animations #{}
                #msg['animation']['config']['Shoulder scaption'] = animation_data.animations['Shoulder scaption']
                msg['animation']['list'] = True
                # print("Request: animation")
            if "control" in request['request']:
                msg['control'] = {}
                msg['control']['command'] = 'play'
                l = len(exercise_set)-1 #
                # l = len(animation_data.animation_titles)-1
                msg['control']['animation'] = exercise_set[random.randint(0,l)]#animation_data.animation_titles[random.randint(0,l)]
                # msg['control']['animation'] = animation_data.animation_titles[random.randint(0,l)]
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
