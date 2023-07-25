function setup_buttons(advancedTexture,camera_dummy,scene,angles){
	var width = "60px"; //"90px"
	var height = "20px"; //"40px"
	let use_radians = true;
	var Left = BABYLON.GUI.Button.CreateSimpleButton("Left", "Left");
		Left.width = width;
		Left.height = height;
		Left.color = "black";
		Left.background = "transparent";
		Left.left = "-40%";
		Left.top = "-25%";
		Left.cornerRadius = 5;
		Left.onPointerDownObservable.add(()=> {
            camera_dummy.position = new BABYLON.Vector3(2, 1.7, 0.0);
			camera_dummy.setTarget(new BABYLON.Vector3(0,1.7,0));            
		})
		advancedTexture.addControl(Left);

	var Out = BABYLON.GUI.Button.CreateSimpleButton("Zoom Out", "Out");
	Out.width = width;
	Out.height = height;
	Out.color = "black";
	Out.background = "transparent";
	Out.left = "-35%";
	Out.top = "-25%";
	Out.cornerRadius = 5;
	Out.onPointerDownObservable.add(()=> {
		camera_zoom = camera_zoom-0.05;
		UpdateCameraZoom(camera_zoom);
		// pos = camera_dummy.position;
		// if (pos.x != 0)
		// {
		// 	if (pos.x > 0)
		// 	{
		// 		pos.x = pos.x + 0.1;
		// 	}
		// 	if (pos.x < 0)
		// 	{
		// 		pos.x = pos.x - 0.1;
		// 	}
		// }
		// if (pos.z != 0)
		// {
		// 	if (pos.z > 0)
		// 	{
		// 		pos.z = pos.z + 0.1;
		// 	}
		// 	if (pos.z < 0)
		// 	{
		// 		pos.z = pos.z - 0.1;
		// 	}
		// }
		// camera_dummy.position = pos;
		// camera_dummy.setTarget(new BABYLON.Vector3(0,1.5,0));
	})
	advancedTexture.addControl(Out);

	var Right = BABYLON.GUI.Button.CreateSimpleButton("Right", "Right");
		Right.width = width;
		Right.height = height;
		Right.color = "black";
		Right.background = "transparent";
		Right.left = "-30%";
		Right.top = "-25%";
		Right.cornerRadius = 5;
		Right.onPointerDownObservable.add(()=> {
			camera_dummy.position = new BABYLON.Vector3(-2, 1.7, 0.0);
			camera_dummy.setTarget(new BABYLON.Vector3(0,1.7,0));
			CameraY(1.3);
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
			camera_dummy.position = new BABYLON.Vector3(0, 1.7, -2.0);
			camera_dummy.setTarget(new BABYLON.Vector3(0,1.7,0));
			CameraY(1.3);
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
			camera_dummy.position = new BABYLON.Vector3(-2, 1.7, -2.0);
			camera_dummy.setTarget(new BABYLON.Vector3(0,1.7,0));
			CameraY(1.3);
		})
		advancedTexture.addControl(FR);

	var In = BABYLON.GUI.Button.CreateSimpleButton("Zoom In", "In");
		In.width = width;
		In.height = height;
		In.color = "black";
		In.background = "transparent";
		In.left = "-35%";
		In.top = "-27%";
		In.cornerRadius = 5;
		In.onPointerDownObservable.add(()=> {
			camera_zoom = camera_zoom+0.05;
			UpdateCameraZoom(camera_zoom);
			// pos = camera_dummy.position;
			// if (pos.x != 0)
			// {
			// 	if (pos.x > 0.2)
			// 	{
			// 		pos.x = pos.x - 0.1;
			// 	}
			// 	if (pos.x < -0.2)
			// 	{
			// 		pos.x = pos.x + 0.1;
			// 	}
			// }
			// if (pos.z != 0)
			// {
			// 	if (pos.z > 0.2)
			// 	{
			// 		pos.z = pos.z - 0.1;
			// 	}
			// 	if (pos.z < -0.2)
			// 	{
			// 		pos.z = pos.z + 0.1;
			// 	}
			// }
			// camera_dummy.position = pos;
			// camera_dummy.setTarget(new BABYLON.Vector3(0,1.5,0));
		})
		advancedTexture.addControl(In);

	var FL = BABYLON.GUI.Button.CreateSimpleButton("FL", "FL");
		FL.width = width;
		FL.height = height;
		FL.color = "black";
		FL.FLground = "transparent";
		FL.left = "-40%";
		FL.top = "-27%";
		FL.cornerRadius = 5;
		FL.onPointerDownObservable.add(()=> {
			camera_dummy.position = new BABYLON.Vector3(2, 1.7, -2.0);
			camera_dummy.setTarget(new BABYLON.Vector3(0,1.7,0));
			CameraY(1.3);
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
			camera_dummy.position = new BABYLON.Vector3(0, 1.7, 2.0);
			camera_dummy.setTarget(new BABYLON.Vector3(0,1.7,0));
			CameraY(1.3);
		})
		advancedTexture.addControl(Back);
					
					// let xsru = scene.getMeshByName('XSensRU');
					// xsru.setEnabled(false);
					// let xsrl = scene.getMeshByName('XSensRL');
					// xsrl.setEnabled(false);
					
					

	var Back = BABYLON.GUI.Button.CreateSimpleButton("Pose", "pose")
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
			// scene.getAnimationGroupByName("All Reset both").start(false, 1.0,0,1, false );
			// reset(scene.skeletons[1]);
			scene.skeletons[1].returnToRest();
			reset(scene.getSkeletonById("Ghost"));
		})
		advancedTexture.addControl(Back);

		// alpha_upper_r = Math.PI/2.2 - values['theta_armright_upper_alpha'];
		// beta_upper_r =    values['theta_armright_upper_beta'];
		// gamma_upper_r =   values['theta_armright_upper_gamma'];
		// alpha_lower_r =  values['theta_armright_lower_alpha'];
		// beta_lower_r =  -values['theta_armright_lower_beta'];
		// gamma_lower_r = values['theta_armright_lower_gamma'];
		
		// // Create a slider control.
		// var slider = new BABYLON.GUI.Slider("slider", 0, 180, 0);
		// slider.height = "30px";
		// slider.width = "120px";
		// slider.left = "-40%";
		// slider.top = "10%";
		// slider.text = "Theta";
		// slider.onValueChangedObservable.add(function(value) {
		// 	angles.theta_armright_upper_alpha = value;			
		// });
		var panel = new BABYLON.GUI.StackPanel();
		panel.width = "220px";
		panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFTT;
		panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
		advancedTexture.addControl(panel);

		var headerAU = new BABYLON.GUI.TextBlock();
		headerAU.text = "Alpha Upper: 0 deg";
		headerAU.height = "30px";
		headerAU.color = "white";
		panel.addControl(headerAU); 

		var sliderAU = new BABYLON.GUI.Slider();
		sliderAU.minimum = -Math.PI;
		sliderAU.maximum = Math.PI;
		sliderAU.value = 0.0;
		sliderAU.height = "20px";
		sliderAU.width = "200px";
		sliderAU.onValueChangedObservable.add(function(value) {
			if (use_radians){
				headerAU.text = "Alpha Upper: " + (value).toFixed(2) + " rad";
			} else {
				headerAU.text = "Alpha Upper: " + (BABYLON.Tools.ToDegrees(value) | 0) + " deg";
			}
			angles.theta_armright_upper_alpha = value;	
		});
		panel.addControl(sliderAU);    

		var headerBU = new BABYLON.GUI.TextBlock();
		headerBU.text = "Beta Upper: 0 deg";
		headerBU.height = "30px";
		headerBU.color = "white";
		panel.addControl(headerBU); 

		var sliderBU = new BABYLON.GUI.Slider();
		sliderBU.minimum = -Math.PI;
		sliderBU.maximum = Math.PI;
		sliderBU.value = 0.0;
		sliderBU.height = "20px";
		sliderBU.width = "200px";
		sliderBU.onValueChangedObservable.add(function(value) {
			if (use_radians){
				headerBU.text = "Beta Upper: " + (value).toFixed(2) + " rad";
			} else {
				headerBU.text = "Beta Upper: " + (BABYLON.Tools.ToDegrees(value) | 0) + " deg";
			}
			angles.theta_armright_upper_beta = value;	
		});
		panel.addControl(sliderBU);   

		var headerGU = new BABYLON.GUI.TextBlock();
		headerGU.text = "Gamma Upper: 0 deg";
		headerGU.height = "30px";
		headerGU.color = "white";
		panel.addControl(headerGU); 

		var sliderGU = new BABYLON.GUI.Slider();
		sliderGU.minimum = -Math.PI;
		sliderGU.maximum = Math.PI;
		sliderGU.value = 0.0;
		sliderGU.height = "20px";
		sliderGU.width = "200px";
		sliderGU.onValueChangedObservable.add(function(value) {
			if (use_radians){
				headerGU.text = "Gamma Upper: " + (value).toFixed(2) + " rad";
			} else {
				headerGU.text = "Gamma Upper: " + (BABYLON.Tools.ToDegrees(value) | 0) + " deg";
			}
			angles.theta_armright_upper_gamma = value;	
		});
		panel.addControl(sliderGU);

		var headerAL = new BABYLON.GUI.TextBlock();
		headerAL.text = "Alpha Lower: 0 deg";
		headerAL.height = "30px";
		headerAL.color = "white";
		panel.addControl(headerAL); 

		var sliderAL = new BABYLON.GUI.Slider();
		sliderAL.minimum = -Math.PI;
		sliderAL.maximum = Math.PI;
		sliderAL.value = 0.0;
		sliderAL.height = "20px";
		sliderAL.width = "200px";
		sliderAL.onValueChangedObservable.add(function(value) {
			if (use_radians){
				headerAL.text = "Alpha Lower: " + (value).toFixed(2) + " rad";	
			} else {
				headerAL.text = "Alpha Lower: " + (BABYLON.Tools.ToDegrees(value) | 0) + " deg";
			}
			angles.theta_armright_lower_alpha = value;	
		});
		panel.addControl(sliderAL);    

		var headerBL = new BABYLON.GUI.TextBlock();
		headerBL.text = "Beta Lower: 0 deg";
		headerBL.height = "30px";
		headerBL.color = "white";
		panel.addControl(headerBL); 

		var sliderBL = new BABYLON.GUI.Slider();
		sliderBL.minimum = -Math.PI;
		sliderBL.maximum = Math.PI;
		sliderBL.value = 0.0;
		sliderBL.height = "20px";
		sliderBL.width = "200px";
		sliderBL.onValueChangedObservable.add(function(value) {
			if (use_radians){
				headerBL.text = "Beta Lower: " + (value).toFixed(2) + " rad";
			} else {
				headerBL.text = "Beta Lower: " + (BABYLON.Tools.ToDegrees(value) | 0) + " deg";
			}
			angles.theta_armright_lower_beta = value;	
		});
		panel.addControl(sliderBL);   

		var headerGL = new BABYLON.GUI.TextBlock();
		headerGL.text = "Gamma Lower: 0 deg";
		headerGL.height = "30px";
		headerGL.color = "white";
		panel.addControl(headerGL); 

		var sliderGL = new BABYLON.GUI.Slider();
		sliderGL.minimum = -Math.PI;
		sliderGL.maximum = Math.PI;
		sliderGL.value = 0.0;
		sliderGL.height = "20px";
		sliderGL.width = "200px";
		sliderGL.onValueChangedObservable.add(function(value) {
			if (use_radians){
				headerGL.text = "Gamma Lower: " + (value).toFixed(2) + " rad";
			} else
			{
				headerGL.text = "Gamma Lower: " + (BABYLON.Tools.ToDegrees(value) | 0) + " deg";
			}
			angles.theta_armright_lower_gamma = value;	
		});
		panel.addControl(sliderGL);
		// advancedTexture.addControl(slider);
}