var camera_zooming = false;

function CameraY(y)
{
	camera_dummy.position.y = y;
	camera_dummy.target.y = y;
	update_camera(null, null, true);
}

function UpdateCameraZoom(zoom)
{
	if (zoom != null )
	{
		camera_zoom = zoom;				
	}

	camera_dummy.orthoTop = orthoTop;
	camera_dummy.orthoBottom = orthoBottom;
	camera_dummy.orthoLeft = orthoLeft;
	camera_dummy.orthoRight = orthoRight;

	// Camera Update
	if(true)
	{
		if ( camera_dummy.position.z != 0.0 )
		{
			_sign = Math.sign(camera_dummy.position.z);
			camera_dummy.position.z = _sign*2.0/camera_zoom;
		}
		if ( camera_dummy.position.x != 0.0 )
		{
			_sign = Math.sign(camera_dummy.position.x);
			camera_dummy.position.x = _sign*2.0/camera_zoom;
		}
		update_camera(null,null, true);
	}
	console.log("Zoom Updated:",camera_zoom);		
}


function Init_cameras(scene)
{
	// camera_dynamic = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 1.5, -2.0), scene, true);
	camera_dynamic = new BABYLON.ArcRotateCamera("UniversalCamera", 0, 0, 0,  new BABYLON.Vector3(0, 0, 0), scene, true);
	camera_dynamic.mode = BABYLON.Camera.PERSPECTIVE_CAMERA;
	camera_dynamic.minZ = -1;
	camera_dynamic.position = new BABYLON.Vector3(0, 1.5, -2.0);
	camera_dummy = camera_dynamic.clone();

	UpdateCameraZoom(1.0);

	return [camera_dummy,camera_dynamic];
}

function update_camera(position,target, animate = true)
{
	if (position == null)
	{
		position = camera_dummy.position;
	}
	
	if (target == null)
	{
		target = camera_dummy.target;
	}

	if (position[0] != camera_dummy.position.x || position[1] != camera_dummy.position.y || position[2] != camera_dummy.position.z || 
		target[0] != camera_dummy.target.x || target[1] != camera_dummy.target.y || target[2] != camera_dummy.target.z) 
	{
		camera_dummy.position = position;
		camera_dummy.target = target;
		// Object.assign(camera_dynamic.target, camera_dummy.target);
		// Object.assign(camera_dynamic.position, camera_dummy.position);

		// TODO: Fix the camera animation in iOS. Camera animation is set to false for now.
		animate = false;

		if (animate == true)
		{
			animateCameraPosition(camera_dynamic, camera_dummy.position, camera_dummy.target);
			camera_dynamic.target = camera_dummy.target;
		}
		else
		{
			camera_dynamic.position = camera_dummy.position;
			camera_dynamic.target = camera_dummy.target;
		}
	}
	return camera_dummy;
}


function animateCameraPosition(camera, position, target) {
    var animation = new BABYLON.Animation("cameraAnimation", "position", 3, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    keys.push({
        frame: 0,
        value: camera.position
    });
    keys.push({
        frame: 100,
        value: position
	});

    animation.setKeys(keys);
    camera.animations.push(animation);
	
	camera_zooming = true;
    scene.beginAnimation (camera, 0, 100, loop = false, speedRatio = 1.0, 
		onAnimationEnd = function() {
			camera.animations = [];
			camera_zooming = false;
    		camera.setTarget(target);

		}, 
		animatable = null, 
		stopCurrent = true, 
		targetMask = null, 
		onAnimationLoop = null, 
		isAdditive = true
	);
}

	


