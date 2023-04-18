function setup_buttons(advancedTexture,camera_dummy,scene){
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

	// var Right = BABYLON.GUI.Button.CreateSimpleButton("Right", "Right");
	// 	Right.width = width;
	// 	Right.height = height;
	// 	Right.color = "black";
	// 	Right.background = "transparent";
	// 	Right.left = "-30%";
	// 	Right.top = "-25%";
	// 	Right.cornerRadius = 5;
	// 	Right.onPointerDownObservable.add(()=> {
	// 		camera_dummy.position = new BABYLON.Vector3(-2, 1.5, 0.0);
	// 		camera_dummy.setTarget(new BABYLON.Vector3(0,1.5,0));
	// 	})
	// 	advancedTexture.addControl(Right);

	var FR = BABYLON.GUI.Button.CreateSimpleButton("FR", "FR");
		FR.width = width;
		FR.height = height;
		FR.color = "black";
		FR.background = "transparent";
		FR.left = "-30%";
		FR.top = "-27%";
		FR.cornerRadius = 5;
		FR.onPointerDownObservable.add(()=> {
			camera_dummy.position = new BABYLON.Vector3(-2, 1.5, -2.0);
			camera_dummy.setTarget(new BABYLON.Vector3(0,1.5,0));
		})
		advancedTexture.addControl(FR);

	var FL = BABYLON.GUI.Button.CreateSimpleButton("FL", "FL");
		FL.width = width;
		FL.height = height;
		FL.color = "black";
		FL.FLground = "transparent";
		FL.left = "-40%";
		FL.top = "-27%";
		FL.cornerRadius = 5;
		FL.onPointerDownObservable.add(()=> {
			camera_dummy.position = new BABYLON.Vector3(2, 1.5, -2.0);
			camera_dummy.setTarget(new BABYLON.Vector3(0,1.5,0));
		})
		advancedTexture.addControl(FL);
	
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
					
					// let xsru = scene.getMeshByName('XSensRU');
					// xsru.setEnabled(false);
					// let xsrl = scene.getMeshByName('XSensRL');
					// xsrl.setEnabled(false);
					
					

	var Back = BABYLON.GUI.Button.CreateSimpleButton("Pose", "pose");
		Back.width = "120px";
		Back.height = height;
		Back.color = "black";
		Back.background = "transparent";
		Back.left = "-40%";
		Back.top = "-10%";
		Back.cornerRadius = 5;
		Back.onPointerDownObservable.add(()=> {
		//	scene.animationGroups[9].start();
			// const pointChest = scene.getAnimationGroupByName("Sensor PointChest Right");
			// const pointChest = scene.getAnimationGroupByName("Generated");
			// pointChest.start(false, 1.0, pointChest.from, pointChest.to, false);
			// let xsc = scene.getMeshByName('XSensChest');
			// xsc.setEnabled(true);
			scene.requestRotations(JSON.stringify({'request':'pose'}));
		})
		advancedTexture.addControl(Back);
		var Back = BABYLON.GUI.Button.CreateSimpleButton("Animation", "Animation");
		Back.width = "120px";
		Back.height = height;
		Back.color = "black";
		Back.background = "transparent";
		Back.left = "-40%";
		Back.top = "-8%";
		Back.cornerRadius = 5;
		Back.onPointerDownObservable.add(()=> {
			// let xsh = scene.getMeshByName('XSensHead');
			// xsh.setEnabled(true);
			// const pointHead = scene.getAnimationGroupByName("Sensor PointHead Right");
			// pointHead.start(false, 1.0, pointHead.from, pointHead.to, false);
			scene.skeletons[0].returnToRest();
			scene.requestRotations(JSON.stringify({'request':'animation'}));
		})
		advancedTexture.addControl(Back);
		var Back = BABYLON.GUI.Button.CreateSimpleButton("Camera", "Camera");
		Back.width = "120px";
		Back.height = height;
		Back.color = "black";
		Back.background = "transparent";
		Back.left = "-40%";
		Back.top = "-6%";
		Back.cornerRadius = 5;
		Back.onPointerDownObservable.add(()=> {
			// let xslu = scene.getMeshByName('XSensLU');
			// xslu.setEnabled(true);
			// const pointUpperArm = scene.getAnimationGroupByName("Sensor PointUpperArm Right");
			// pointUpperArm.start(false, 1.0, pointUpperArm.from, pointUpperArm.to, false);
			scene.requestRotations(JSON.stringify({'request':'camera'}));
		})
		advancedTexture.addControl(Back);
		var Back = BABYLON.GUI.Button.CreateSimpleButton("Animate", "Animate");
		Back.width = "120px";
		Back.height = height;
		Back.color = "black";
		Back.background = "transparent";
		Back.left = "-40%";
		Back.top = "-4%";
		Back.cornerRadius = 5;
		Back.onPointerDownObservable.add(()=> {
			// max_length = scene.animationGroups.length;
			// idx = Math.round(Math.random()*max_length);
			// scene.animationGroups[idx].start(false, 1.0,0,1, false );
			scene.requestRotations(JSON.stringify({'request':'control'}));
		})
		advancedTexture.addControl(Back);

		var Back = BABYLON.GUI.Button.CreateSimpleButton("Stop", "Stop");
		Back.width = "120px";
		Back.height = height;
		Back.color = "black";
		Back.background = "transparent";
		Back.left = "-40%";
		Back.top = "-2%";
		Back.cornerRadius = 5;
		Back.onPointerDownObservable.add(()=> {
			// var active_animation = false;
			// scene.animationGroups.map(function(item){ if (item.animatables.length > 0 ) { active_animation = true;}});
			// console.log('Active Animation: ' + active_animation);
			// scene.animationGroups.map(function(item){ if (item.animatables.length > 0 ) {item.stop(); console.log(item.name + " stopped"); return item.name} else { return "";}});
			scene.requestRotations(JSON.stringify({'request':'stop'}));
		})
		advancedTexture.addControl(Back);

		var Back = BABYLON.GUI.Button.CreateSimpleButton("Clear", "Clear");
		Back.width = "120px";
		Back.height = height;
		Back.color = "black";
		Back.background = "transparent";
		Back.left = "-40%";
		Back.top = "-0%";
		Back.cornerRadius = 5;
		Back.onPointerDownObservable.add(()=> {
			scene.getAnimationGroupByName("All Reset both").start(false, 1.0,0,1, false );
		})
		advancedTexture.addControl(Back);
}