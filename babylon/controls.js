function setup_buttons(advancedTexture,camera_dummy){
	var width = "60px"; //"90px"
	var height = "20px"; //"40px"

	var Left = BABYLON.GUI.Button.CreateSimpleButton("Left", "Left");
		Left.width = width;
		Left.height = height;
		Left.color = "black";
		Left.background = "transparent";
		Left.left = "-40%";
		Left.top = "-25%";
		Left.cornerRadius = 5;
		Left.onPointerDownObservable.add(()=> {
            camera_dummy.position = new BABYLON.Vector3(2, 1.5, 0.0);
			camera_dummy.setTarget(new BABYLON.Vector3(0,1.5,0));            
		})
		advancedTexture.addControl(Left);

	var Right = BABYLON.GUI.Button.CreateSimpleButton("Right", "Right");
		Right.width = width;
		Right.height = height;
		Right.color = "black";
		Right.background = "transparent";
		Right.left = "-30%";
		Right.top = "-25%";
		Right.cornerRadius = 5;
		Right.onPointerDownObservable.add(()=> {
			camera_dummy.position = new BABYLON.Vector3(-2, 1.5, 0.0);
			camera_dummy.setTarget(new BABYLON.Vector3(0,1.5,0));
		})
		advancedTexture.addControl(Right);

	var Front = BABYLON.GUI.Button.CreateSimpleButton("Front", "Front");
		Front.width = width;
		Front.height = height;
		Front.color = "black";
		Front.background = "transparent";
		Front.left = "-35%";
		Front.top = "-30%";
		Front.cornerRadius = 5;
		Front.onPointerDownObservable.add(()=> {
			camera_dummy.position = new BABYLON.Vector3(0, 1.5, -2.0);
			camera_dummy.setTarget(new BABYLON.Vector3(0,1.5,0));
		})
		advancedTexture.addControl(Front);

	var Back = BABYLON.GUI.Button.CreateSimpleButton("Back", "Back");
		Back.width = width;
		Back.height = height;
		Back.color = "black";
		Back.background = "transparent";
		Back.left = "-35%";
		Back.top = "-20%";
		Back.cornerRadius = 5;
		Back.onPointerDownObservable.add(()=> {
			camera_dummy.position = new BABYLON.Vector3(0, 1.5, 2.0);
			camera_dummy.setTarget(new BABYLON.Vector3(0,1.5,0));
		})
		advancedTexture.addControl(Back);
}