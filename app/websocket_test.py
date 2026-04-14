# %%
import asyncio
import websockets
import pathlib
import ssl
import json
import random
import ast
import animation_data
import scaption

animation_data = scaption

camera_index = 0
zoomWide = 2.0
zoomNarrow = 0.6
camera_pos = [
    [-1*zoomWide, 1.5, 0.0],
    [-1*zoomWide, 1.5, -1*zoomWide],
    [0 , 1.5, -1*zoomWide],    
    [1*zoomWide, 1.5, -1*zoomWide],
    [1*zoomWide, 1.5, 0.0],
    [-1*zoomNarrow, 1.5, 0.0],
    [-1*zoomNarrow, 1.5, -1*zoomNarrow],
    [0 , 1.5, -1*zoomNarrow],    
    [1*zoomNarrow, 1.5, -1*zoomNarrow],
    [1*zoomNarrow, 1.5, 0.0]
    ]

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

exercise_set = list(animation_data.animations.keys()) #animation_data.animation_titles

# exercise_set = ['All Reset','FistLeft', 'FistRight']


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
asyncio.run(start_server())

# %%

k = ['All Reset both']
bones = ['Hips', 'Spine', 'Spine1', 'Spine2', 'Neck', 'Bone', 'HeadTop_End', 'RightEye', 'LeftEye', 'RightShoulder', 'LeftShoulder', 'RightArm', 'LeftArm', 'RightForeArm', 'LeftForeArm', 'RightHand', 'LeftHand', 'RightHandThumb1', 'LeftHandThumb1', 'RightHandThumb2', 'LeftHandThumb2', 'RightHandThumb3', 'LeftHandThumb3', 'RightHandThumb4', 'LeftHandThumb4', 'RightHandIndex1', 'LeftHandIndex1', 'RightHandIndex2', 'LeftHandIndex2', 'RightHandIndex3', 'LeftHandIndex3', 'RightHandIndex4', 'LeftHandIndex4', 'RightHandMiddle1', 'LeftHandMiddle1', 'RightHandMiddle2', 'LeftHandMiddle2', 'RightHandMiddle3', 'LeftHandMiddle3', 'RightHandMiddle4', 'LeftHandMiddle4', 'RightHandRing1', 'LeftHandRing1', 'RightHandRing2', 'LeftHandRing2', 'RightHandRing3', 'LeftHandRing3', 'RightHandRing4', 'LeftHandRing4', 'RightHandPinky1', 'LeftHandPinky1', 'RightHandPinky2', 'LeftHandPinky2', 'RightHandPinky3', 'LeftHandPinky3', 'RightHandPinky4', 'LeftHandPinky4', 'RightUpLeg', 'LeftUpLeg', 'RightLeg', 'LeftLeg', 'RightFoot', 'LeftFoot', 'RightToeBase', 'LeftToeBase', 'RightToe_End', 'LeftToe_End']
bones_subset = ['Spine','Neck', 'Bone', 'RightArm', 'LeftArm', 'RightForeArm', 'LeftForeArm']
all_exercises = ['All Reset both', 'All Reset Left', 'All Reset Right', 'Arm Cal 0 both', 'Arm Cal 0 Left', 'Arm Cal 0 Right', 'Arm Cal 45 both', 'Arm Cal 45 Left', 'Arm Cal 45 Right', 'Arm Cal 90 both', 'Arm Cal 90 Left', 'Arm Cal 90 Right', 'Arm Calibration both', 'Arm Calibration Left', 'Arm Calibration Right', 'Arm Only Calibration both', 'Arm Only Calibration Left', 'Arm Only Calibration Right', 'Arm Reset both', 'Arm Reset Left', 'Arm Reset Right', 'ArmatureAction', 'Bend 22.5 both', 'Bend 22.5 Left', 'Bend 22.5 Right', 'Bend 45 both', 'Bend 45 Left', 'Bend 45 Right', 'Bend Both 22.5 both', 'Bend Both 22.5 Left', 'Bend Both 22.5 Right', 'Bend Both 45 both', 'Bend Both 45 Left', 'Bend Both 45 Right', 'Chest Only Calibration both', 'Chest Only Calibration Left', 'Chest Only Calibration Right', 'Elbow Flexion 0 both', 'Elbow Flexion 0 Left', 'Elbow Flexion 0 Right', 'Elbow Flexion 135 both', 'Elbow Flexion 135 Left', 'Elbow Flexion 135 Right', 'Elbow Flexion 45 both', 'Elbow Flexion 45 Left', 'Elbow Flexion 45 Right', 'Elbow Flexion 90 both', 'Elbow Flexion 90 Left', 'Elbow Flexion 90 Right', 'Elbow flexion both', 'Elbow flexion Left', 'Elbow flexion Right', 'External Rotation both', 'External Rotation Left', 'External Rotation Right', 'Fist both', 'Fist Left', 'Fist Right', 'Flexion -22.5 both', 'Flexion -22.5 Left', 'Flexion -22.5 Right', 'Flexion -60 both', 'Flexion -60 Left', 'Flexion -60 Right', 'Flexion 0 both', 'Flexion 0 Left', 'Flexion 0 Right', 'Flexion 135 both', 'Flexion 135 Left', 'Flexion 135 Right', 'Flexion 180 both', 'Flexion 180 Left', 'Flexion 180 Right', 'Flexion 45 both', 'Flexion 45 Left', 'Flexion 45 Right', 'Flexion 90 both', 'Flexion 90 Left', 'Flexion 90 Right', 'Fore 0 both', 'Fore 0 Left', 'Fore 0 Right', 'Fore 45 both', 'Fore 45 Left', 'Fore 45 Right', 'Fore 90 both', 'Fore 90 Left', 'Fore 90 Right', 'GHJT 0 both', 'GHJT 0 Left', 'GHJT 0 Right', 'GHJT 90 both', 'GHJT 90 Left', 'GHJT 90 Right', 'Head Extension both', 'Head Extension Left', 'Head Extension Right', 'Head Flexion 25 both', 'Head Flexion 25 Left', 'Head Flexion 25 Right', 'Head Flexion both', 'Head Flexion Left', 'Head Flexion Right', 'Head Levator Scapula both', 'Head Levator Scapula Left', 'Head Levator Scapula Right', 'Head Neutral both', 'Head Neutral Left', 'Head Neutral Right', 'Head Only Calibration both', 'Head Only Calibration Left', 'Head Only Calibration Right', 'Head Roll both', 'Head Roll Left', 'Head Roll Right', 'Head Yaw both', 'Head Yaw Left', 'Head Yaw Right', 'Internal Rotation both', 'Internal Rotation Left', 'Internal Rotation Right', 'Neutral both', 'Neutral Left', 'Neutral Right', 'Pec Strech Trunk both', 'Pec Strech Trunk Left', 'Pec Strech Trunk Right', 'Pec Stretch 90 both', 'Pec Stretch 90 Left', 'Pec Stretch 90 Right', 'Pec Stretch Rest both', 'Pec Stretch Rest Left', 'Pec Stretch Rest Right', 'Prone Pendular 0 both', 'Prone Pendular 0 Left', 'Prone Pendular 0 Right', 'Prone Pendular B25 both', 'Prone Pendular B25 Left', 'Prone Pendular B25 Right', 'Prone Pendular BL25 both', 'Prone Pendular BL25 Left', 'Prone Pendular BL25 Right', 'Prone Pendular BR25 both', 'Prone Pendular BR25 Left', 'Prone Pendular BR25 Right', 'Prone Pendular F25 both', 'Prone Pendular F25 Left', 'Prone Pendular F25 Right', 'Prone Pendular FL25 both', 'Prone Pendular FL25 Left', 'Prone Pendular FL25 Right', 'Prone Pendular FR25 both', 'Prone Pendular FR25 Left', 'Prone Pendular FR25 Right', 'Prone Pendular L25 both', 'Prone Pendular L25 Left', 'Prone Pendular L25 Right', 'Prone Pendular R25 both', 'Prone Pendular R25 Left', 'Prone Pendular R25 Right', 'Rest both', 'Rest Left', 'Rest Right', 'Row -22.5 both', 'Row -22.5 Left', 'Row -22.5 Right', 'Row 0 both', 'Row 0 Left', 'Row 0 Right', 'Row 45 both', 'Row 45 Left', 'Row 45 Right', 'Row abduction 0 both', 'Row abduction 0 Left', 'Row abduction 0 Right', 'Row abduction 75 both', 'Row abduction 75 Left', 'Row abduction 75 Right', 'Row abduction both', 'Row abduction Left', 'Row abduction Right', 'Row neutral both', 'Row neutral Left', 'Row neutral Right', 'Scaption 0 both', 'Scaption 0 Left', 'Scaption 0 Right', 'Scaption 135 both', 'Scaption 135 Left', 'Scaption 135 Right', 'Scaption 180 both', 'Scaption 180 Left', 'Scaption 180 Right', 'Scaption 45 both', 'Scaption 45 Left', 'Scaption 45 Right', 'Scaption 90 both', 'Scaption 90 Left', 'Scaption 90 Right', 'Shoulder abduction both', 'Shoulder abduction Left', 'Shoulder abduction Right', 'Shoulder extension both', 'Shoulder extension Left', 'Shoulder extension Right', 'Shoulder external rotation both', 'Shoulder external rotation Left', 'Shoulder external rotation Right', 'Shoulder flexion both', 'Shoulder flexion Left', 'Shoulder flexion Right', 'Shoulder internal rotation both', 'Shoulder internal rotation Left', 'Shoulder internal rotation Right', 'Shoulder Press Base both', 'Shoulder Press Base Left', 'Shoulder Press Base Right', 'Shoulder Press Extend both', 'Shoulder Press Extend Left', 'Shoulder Press Extend Right', 'Shoulder scaption both', 'Shoulder scaption Left', 'Shoulder scaption Right', 'Side Abduction 135 Palm Forward both', 'Side Abduction 135 Palm Forward Left', 'Side Abduction 135 Palm Forward Right', 'Side Abduction 180 Palm Forward both', 'Side Abduction 180 Palm Forward Left', 'Side Abduction 180 Palm Forward Right', 'Side Abduction 45 Palm Forward both', 'Side Abduction 45 Palm Forward Left', 'Side Abduction 45 Palm Forward Right', 'Side Abduction 90 Palm Forward 2 both', 'Side Abduction 90 Palm Forward 2 Left', 'Side Abduction 90 Palm Forward 2 Right', 'Side Abduction 90 Palm Forward both', 'Side Abduction 90 Palm Forward Left', 'Side Abduction 90 Palm Forward Right', 'Side Abduction Palm Forward both', 'Side Abduction Palm Forward Left', 'Side Abduction Palm Forward Right', 'Side Down both', 'Side Down Left', 'Side Down Natural both', 'Side Down Natural Left', 'Side Down Natural Right', 'Side Down Right', 'Sitting Pose Natural both', 'Sitting Pose Natural Left', 'Sitting Pose Natural Right', 'Sitting Thoracic Rotation both', 'Sitting Thoracic Rotation Left', 'Sitting Thoracic Rotation Right', 'All Reset both Left', 'All Reset Left Left', 'All Reset Right Left', 'Arm Cal 0 both Left', 'Arm Cal 0 Left Left', 'Arm Cal 0 Right Left', 'Arm Cal 45 both Left', 'Arm Cal 45 Left Left', 'Arm Cal 45 Right Left', 'Arm Cal 90 both Left', 'Arm Cal 90 Left Left', 'Arm Cal 90 Right Left', 'Arm Calibration both Left', 'Arm Calibration Left Left', 'Arm Calibration Right Left', 'Arm Only Calibration both Left', 'Arm Only Calibration Left Left', 'Arm Only Calibration Right Left', 'Arm Reset both Left', 'Arm Reset Left Left', 'Arm Reset Right Left', 'ArmatureAction Left', 'Bend 22.5 both Left', 'Bend 22.5 Left Left', 'Bend 22.5 Right Left', 'Bend 45 both Left', 'Bend 45 Left Left', 'Bend 45 Right Left', 'Bend Both 22.5 both Left', 'Bend Both 22.5 Left Left', 'Bend Both 22.5 Right Left', 'Bend Both 45 both Left', 'Bend Both 45 Left Left', 'Bend Both 45 Right Left', 'Chest Only Calibration both Left', 'Chest Only Calibration Left Left', 'Chest Only Calibration Right Left', 'Elbow Flexion 0 both Left', 'Elbow Flexion 0 Left Left', 'Elbow Flexion 0 Right Left', 'Elbow Flexion 135 both Left', 'Elbow Flexion 135 Left Left', 'Elbow Flexion 135 Right Left', 'Elbow Flexion 45 both Left', 'Elbow Flexion 45 Left Left', 'Elbow Flexion 45 Right Left', 'Elbow Flexion 90 both Left', 'Elbow Flexion 90 Left Left', 'Elbow Flexion 90 Right Left', 'Elbow flexion both Left', 'Elbow flexion Left Left', 'Elbow flexion Right Left', 'External Rotation both Left', 'External Rotation Left Left', 'External Rotation Right Left', 'Fist both Left', 'Fist Left Left', 'Fist Right Left', 'Flexion -22.5 both Left', 'Flexion -22.5 Left Left', 'Flexion -22.5 Right Left', 'Flexion -60 both Left', 'Flexion -60 Left Left', 'Flexion -60 Right Left', 'Flexion 0 both Left', 'Flexion 0 Left Left', 'Flexion 0 Right Left', 'Flexion 135 both Left', 'Flexion 135 Left Left', 'Flexion 135 Right Left', 'Flexion 180 both Left', 'Flexion 180 Left Left', 'Flexion 180 Right Left', 'Flexion 45 both Left', 'Flexion 45 Left Left', 'Flexion 45 Right Left', 'Flexion 90 both Left', 'Flexion 90 Left Left', 'Flexion 90 Right Left', 'Fore 0 both Left', 'Fore 0 Left Left', 'Fore 0 Right Left', 'Fore 45 both Left', 'Fore 45 Left Left', 'Fore 45 Right Left', 'Fore 90 both Left', 'Fore 90 Left Left', 'Fore 90 Right Left', 'GHJT 0 both Left', 'GHJT 0 Left Left', 'GHJT 0 Right Left', 'GHJT 90 both Left', 'GHJT 90 Left Left', 'GHJT 90 Right Left', 'Head Extension both Left', 'Head Extension Left Left', 'Head Extension Right Left', 'Head Flexion 25 both Left', 'Head Flexion 25 Left Left', 'Head Flexion 25 Right Left', 'Head Flexion both Left', 'Head Flexion Left Left', 'Head Flexion Right Left', 'Head Levator Scapula both Left', 'Head Levator Scapula Left Left', 'Head Levator Scapula Right Left', 'Head Neutral both Left', 'Head Neutral Left Left', 'Head Neutral Right Left', 'Head Only Calibration both Left', 'Head Only Calibration Left Left', 'Head Only Calibration Right Left', 'Head Roll both Left', 'Head Roll Left Left', 'Head Roll Right Left', 'Head Yaw both Left', 'Head Yaw Left Left', 'Head Yaw Right Left', 'Internal Rotation both Left', 'Internal Rotation Left Left', 'Internal Rotation Right Left', 'Neutral both Left', 'Neutral Left Left', 'Neutral Right Left', 'Pec Strech Trunk both Left', 'Pec Strech Trunk Left Left', 'Pec Strech Trunk Right Left', 'Pec Stretch 90 both Left', 'Pec Stretch 90 Left Left', 'Pec Stretch 90 Right Left', 'Pec Stretch Rest both Left', 'Pec Stretch Rest Left Left', 'Pec Stretch Rest Right Left', 'Prone Pendular 0 both Left', 'Prone Pendular 0 Left Left', 'Prone Pendular 0 Right Left', 'Prone Pendular B25 both Left', 'Prone Pendular B25 Left Left', 'Prone Pendular B25 Right Left', 'Prone Pendular BL25 both Left', 'Prone Pendular BL25 Left Left', 'Prone Pendular BL25 Right Left', 'Prone Pendular BR25 both Left', 'Prone Pendular BR25 Left Left', 'Prone Pendular BR25 Right Left', 'Prone Pendular F25 both Left', 'Prone Pendular F25 Left Left', 'Prone Pendular F25 Right Left', 'Prone Pendular FL25 both Left', 'Prone Pendular FL25 Left Left', 'Prone Pendular FL25 Right Left', 'Prone Pendular FR25 both Left', 'Prone Pendular FR25 Left Left', 'Prone Pendular FR25 Right Left', 'Prone Pendular L25 both Left', 'Prone Pendular L25 Left Left', 'Prone Pendular L25 Right Left', 'Prone Pendular R25 both Left', 'Prone Pendular R25 Left Left', 'Prone Pendular R25 Right Left', 'Rest both Left', 'Rest Left Left', 'Rest Right Left', 'Row -22.5 both Left', 'Row -22.5 Left Left', 'Row -22.5 Right Left', 'Row 0 both Left', 'Row 0 Left Left', 'Row 0 Right Left', 'Row 45 both Left', 'Row 45 Left Left', 'Row 45 Right Left', 'Row abduction 0 both Left', 'Row abduction 0 Left Left', 'Row abduction 0 Right Left', 'Row abduction 75 both Left', 'Row abduction 75 Left Left', 'Row abduction 75 Right Left', 'Row abduction both Left', 'Row abduction Left Left', 'Row abduction Right Left', 'Row neutral both Left', 'Row neutral Left Left', 'Row neutral Right Left', 'Scaption 0 both Left', 'Scaption 0 Left Left', 'Scaption 0 Right Left', 'Scaption 135 both Left', 'Scaption 135 Left Left', 'Scaption 135 Right Left', 'Scaption 180 both Left', 'Scaption 180 Left Left', 'Scaption 180 Right Left', 'Scaption 45 both Left', 'Scaption 45 Left Left', 'Scaption 45 Right Left', 'Scaption 90 both Left', 'Scaption 90 Left Left', 'Scaption 90 Right Left', 'Shoulder abduction both Left', 'Shoulder abduction Left Left', 'Shoulder abduction Right Left', 'Shoulder extension both Left', 'Shoulder extension Left Left', 'Shoulder extension Right Left', 'Shoulder external rotation both Left', 'Shoulder external rotation Left Left', 'Shoulder external rotation Right Left', 'Shoulder flexion both Left', 'Shoulder flexion Left Left', 'Shoulder flexion Right Left', 'Shoulder internal rotation both Left', 'Shoulder internal rotation Left Left', 'Shoulder internal rotation Right Left', 'Shoulder Press Base both Left', 'Shoulder Press Base Left Left', 'Shoulder Press Base Right Left', 'Shoulder Press Extend both Left', 'Shoulder Press Extend Left Left', 'Shoulder Press Extend Right Left', 'Shoulder scaption both Left', 'Shoulder scaption Left Left', 'Shoulder scaption Right Left', 'Side Abduction 135 Palm Forward both Left', 'Side Abduction 135 Palm Forward Left Left', 'Side Abduction 135 Palm Forward Right Left', 'Side Abduction 180 Palm Forward both Left', 'Side Abduction 180 Palm Forward Left Left', 'Side Abduction 180 Palm Forward Right Left', 'Side Abduction 45 Palm Forward both Left', 'Side Abduction 45 Palm Forward Left Left', 'Side Abduction 45 Palm Forward Right Left', 'Side Abduction 90 Palm Forward 2 both Left', 'Side Abduction 90 Palm Forward 2 Left Left', 'Side Abduction 90 Palm Forward 2 Right Left', 'Side Abduction 90 Palm Forward both Left', 'Side Abduction 90 Palm Forward Left Left', 'Side Abduction 90 Palm Forward Right Left', 'Side Abduction Palm Forward both Left', 'Side Abduction Palm Forward Left Left', 'Side Abduction Palm Forward Right Left', 'Side Down both Left', 'Side Down Left Left', 'Side Down Natural both Left', 'Side Down Natural Left Left', 'Side Down Natural Right Left', 'Side Down Right Left', 'Sitting Pose Natural both Left', 'Sitting Pose Natural Left Left', 'Sitting Pose Natural Right Left', 'Sitting Thoracic Rotation both Left', 'Sitting Thoracic Rotation Left Left', 'Sitting Thoracic Rotation Right Left', 'All Reset both both', 'All Reset Left both', 'All Reset Right both', 'Arm Cal 0 both both', 'Arm Cal 0 Left both', 'Arm Cal 0 Right both', 'Arm Cal 45 both both', 'Arm Cal 45 Left both', 'Arm Cal 45 Right both', 'Arm Cal 90 both both', 'Arm Cal 90 Left both', 'Arm Cal 90 Right both', 'Arm Calibration both both', 'Arm Calibration Left both', 'Arm Calibration Right both', 'Arm Only Calibration both both', 'Arm Only Calibration Left both', 'Arm Only Calibration Right both', 'Arm Reset both both', 'Arm Reset Left both', 'Arm Reset Right both', 'ArmatureAction both', 'Bend 22.5 both both', 'Bend 22.5 Left both', 'Bend 22.5 Right both', 'Bend 45 both both', 'Bend 45 Left both', 'Bend 45 Right both', 'Bend Both 22.5 both both', 'Bend Both 22.5 Left both', 'Bend Both 22.5 Right both', 'Bend Both 45 both both', 'Bend Both 45 Left both', 'Bend Both 45 Right both', 'Chest Only Calibration both both', 'Chest Only Calibration Left both', 'Chest Only Calibration Right both', 'Elbow Flexion 0 both both', 'Elbow Flexion 0 Left both', 'Elbow Flexion 0 Right both', 'Elbow Flexion 135 both both', 'Elbow Flexion 135 Left both', 'Elbow Flexion 135 Right both', 'Elbow Flexion 45 both both', 'Elbow Flexion 45 Left both', 'Elbow Flexion 45 Right both', 'Elbow Flexion 90 both both', 'Elbow Flexion 90 Left both', 'Elbow Flexion 90 Right both', 'Elbow flexion both both', 'Elbow flexion Left both', 'Elbow flexion Right both', 'External Rotation both both', 'External Rotation Left both', 'External Rotation Right both', 'Fist both both', 'Fist Left both', 'Fist Right both', 'Flexion -22.5 both both', 'Flexion -22.5 Left both', 'Flexion -22.5 Right both', 'Flexion -60 both both', 'Flexion -60 Left both', 'Flexion -60 Right both', 'Flexion 0 both both', 'Flexion 0 Left both', 'Flexion 0 Right both', 'Flexion 135 both both', 'Flexion 135 Left both', 'Flexion 135 Right both', 'Flexion 180 both both', 'Flexion 180 Left both', 'Flexion 180 Right both', 'Flexion 45 both both', 'Flexion 45 Left both', 'Flexion 45 Right both', 'Flexion 90 both both', 'Flexion 90 Left both', 'Flexion 90 Right both', 'Fore 0 both both', 'Fore 0 Left both', 'Fore 0 Right both', 'Fore 45 both both', 'Fore 45 Left both', 'Fore 45 Right both', 'Fore 90 both both', 'Fore 90 Left both', 'Fore 90 Right both', 'GHJT 0 both both', 'GHJT 0 Left both', 'GHJT 0 Right both', 'GHJT 90 both both', 'GHJT 90 Left both', 'GHJT 90 Right both', 'Head Extension both both', 'Head Extension Left both', 'Head Extension Right both', 'Head Flexion 25 both both', 'Head Flexion 25 Left both', 'Head Flexion 25 Right both', 'Head Flexion both both', 'Head Flexion Left both', 'Head Flexion Right both', 'Head Levator Scapula both both', 'Head Levator Scapula Left both', 'Head Levator Scapula Right both', 'Head Neutral both both', 'Head Neutral Left both', 'Head Neutral Right both', 'Head Only Calibration both both', 'Head Only Calibration Left both', 'Head Only Calibration Right both', 'Head Roll both both', 'Head Roll Left both', 'Head Roll Right both', 'Head Yaw both both', 'Head Yaw Left both', 'Head Yaw Right both', 'Internal Rotation both both', 'Internal Rotation Left both', 'Internal Rotation Right both', 'Neutral both both', 'Neutral Left both', 'Neutral Right both', 'Pec Strech Trunk both both', 'Pec Strech Trunk Left both', 'Pec Strech Trunk Right both', 'Pec Stretch 90 both both', 'Pec Stretch 90 Left both', 'Pec Stretch 90 Right both', 'Pec Stretch Rest both both', 'Pec Stretch Rest Left both', 'Pec Stretch Rest Right both', 'Prone Pendular 0 both both', 'Prone Pendular 0 Left both', 'Prone Pendular 0 Right both', 'Prone Pendular B25 both both', 'Prone Pendular B25 Left both', 'Prone Pendular B25 Right both', 'Prone Pendular BL25 both both', 'Prone Pendular BL25 Left both', 'Prone Pendular BL25 Right both', 'Prone Pendular BR25 both both', 'Prone Pendular BR25 Left both', 'Prone Pendular BR25 Right both', 'Prone Pendular F25 both both', 'Prone Pendular F25 Left both', 'Prone Pendular F25 Right both', 'Prone Pendular FL25 both both', 'Prone Pendular FL25 Left both', 'Prone Pendular FL25 Right both', 'Prone Pendular FR25 both both', 'Prone Pendular FR25 Left both', 'Prone Pendular FR25 Right both', 'Prone Pendular L25 both both', 'Prone Pendular L25 Left both', 'Prone Pendular L25 Right both', 'Prone Pendular R25 both both', 'Prone Pendular R25 Left both', 'Prone Pendular R25 Right both', 'Rest both both', 'Rest Left both', 'Rest Right both', 'Row -22.5 both both', 'Row -22.5 Left both', 'Row -22.5 Right both', 'Row 0 both both', 'Row 0 Left both', 'Row 0 Right both', 'Row 45 both both', 'Row 45 Left both', 'Row 45 Right both', 'Row abduction 0 both both', 'Row abduction 0 Left both', 'Row abduction 0 Right both', 'Row abduction 75 both both', 'Row abduction 75 Left both', 'Row abduction 75 Right both', 'Row abduction both both', 'Row abduction Left both', 'Row abduction Right both', 'Row neutral both both', 'Row neutral Left both', 'Row neutral Right both', 'Scaption 0 both both', 'Scaption 0 Left both', 'Scaption 0 Right both', 'Scaption 135 both both', 'Scaption 135 Left both', 'Scaption 135 Right both', 'Scaption 180 both both', 'Scaption 180 Left both', 'Scaption 180 Right both', 'Scaption 45 both both', 'Scaption 45 Left both', 'Scaption 45 Right both', 'Scaption 90 both both', 'Scaption 90 Left both', 'Scaption 90 Right both', 'Shoulder abduction both both', 'Shoulder abduction Left both', 'Shoulder abduction Right both', 'Shoulder extension both both', 'Shoulder extension Left both', 'Shoulder extension Right both', 'Shoulder external rotation both both', 'Shoulder external rotation Left both', 'Shoulder external rotation Right both', 'Shoulder flexion both both', 'Shoulder flexion Left both', 'Shoulder flexion Right both', 'Shoulder internal rotation both both', 'Shoulder internal rotation Left both', 'Shoulder internal rotation Right both', 'Shoulder Press Base both both', 'Shoulder Press Base Left both', 'Shoulder Press Base Right both', 'Shoulder Press Extend both both', 'Shoulder Press Extend Left both', 'Shoulder Press Extend Right both', 'Shoulder scaption both both', 'Shoulder scaption Left both', 'Shoulder scaption Right both', 'Side Abduction 135 Palm Forward both both', 'Side Abduction 135 Palm Forward Left both', 'Side Abduction 135 Palm Forward Right both', 'Side Abduction 180 Palm Forward both both', 'Side Abduction 180 Palm Forward Left both', 'Side Abduction 180 Palm Forward Right both', 'Side Abduction 45 Palm Forward both both', 'Side Abduction 45 Palm Forward Left both', 'Side Abduction 45 Palm Forward Right both', 'Side Abduction 90 Palm Forward 2 both both', 'Side Abduction 90 Palm Forward 2 Left both', 'Side Abduction 90 Palm Forward 2 Right both', 'Side Abduction 90 Palm Forward both both', 'Side Abduction 90 Palm Forward Left both', 'Side Abduction 90 Palm Forward Right both', 'Side Abduction Palm Forward both both', 'Side Abduction Palm Forward Left both', 'Side Abduction Palm Forward Right both', 'Side Down both both', 'Side Down Left both', 'Side Down Natural both both', 'Side Down Natural Left both', 'Side Down Natural Right both', 'Side Down Right both', 'Sitting Pose Natural both both', 'Sitting Pose Natural Left both', 'Sitting Pose Natural Right both', 'Sitting Thoracic Rotation both both', 'Sitting Thoracic Rotation Left both', 'Sitting Thoracic Rotation Right both']

# %%
_n = 'Shoulder scaption both'
_n = 'All Reset both'
_a = animation_data.animations[_n]
_exer = {}
_exer[_n] = {}
for key in bones_subset:
    _exer[_n][key] = _a[key]



# %%
