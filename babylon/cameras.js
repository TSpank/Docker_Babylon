function Init_cameras(scene)
{
	// camera_dummy = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 1.7, -2.0), scene, true);
	// camera_dummy.setTarget(new BABYLON.Vector3(0,1.7,0));
	// camera_dummy.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
	// camera_dummy.minZ = -1;
	
	camera_dynamic = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 1.7, -2.0), scene, true);
	camera_dynamic.setTarget(new BABYLON.Vector3(0,1.7,0));
	camera_dynamic.minZ = -1;
	camera_dynamic.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
	camera_dynamic.orthoTop = 1;
	camera_dynamic.orthoBottom = -1;
	camera_dynamic.orthoRight = 1;
	camera_dynamic.orthoLeft = -1;
	camera_dummy = camera_dynamic.clone();
	UpdateCameraZoom(1);
	return [camera_dummy,camera_dynamic];
}

function update_camera(camera,position,target)
{
	camera.setPosition(new BABYLON.Vector3(position[0],position[1],position[2]));
	camera.setTarget(new BABYLON.Vector3(target[0],target[1],target[2]));
	camera.minZ = -1;
	return camera;
}
