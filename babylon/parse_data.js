function reset(skeleton)
{
	// LEFT Shoulder		   
	skeleton.bones[9].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.5,0.5,-0.5,0.5);    
	skeleton.bones[10].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
	skeleton.bones[11].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
	skeleton.bones[12].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
	// RIGHT Shoulder
	skeleton.bones[33].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.5,-0.5,0.5,0.5); 
	skeleton.bones[34].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
	skeleton.bones[35].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
	skeleton.bones[36].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);

	//Neck
	skeleton.bones[4].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
	//Head
	skeleton.bones[5].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);

	// Upper Back
	skeleton.bones[1].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
	skeleton.bones[2].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
	// Lower Back
	skeleton.bones[3].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);

	skeleton.bones[0].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
}

function parse_data(skeleton,values,angles)
{
	
	//return skeleton;
	/*

	USED FOR TESTING
	AVATAR ANIMATION FROM SLIDER DATA

	*/
	if (  angles != null )
	{
		// console.log(angles);
		animate_lower_back = true;
		// LEFT Shoulder		   
		skeleton.bones[9].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.5,0.5,-0.5,0.5);    
		skeleton.bones[10].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
		skeleton.bones[11].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
		skeleton.bones[12].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
		// RIGHT Shoulder
		skeleton.bones[33].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.5,-0.5,0.5,0.5); 
		skeleton.bones[34].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
		skeleton.bones[35].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
		skeleton.bones[36].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);

		//Neck
		skeleton.bones[4].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
		//Head
		skeleton.bones[5].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);

		// Upper Back
		skeleton.bones[1].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
		skeleton.bones[2].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
		// Lower Back
		skeleton.bones[3].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);

		skeleton.bones[0].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);

		alpha_upper_r = angles.theta_armright_upper_alpha;
		beta_upper_r = angles.theta_armright_upper_beta;
		gamma_upper_r = angles.theta_armright_upper_gamma;
		alpha_lower_r = angles.theta_armright_lower_alpha;
		beta_lower_r = angles.theta_armright_lower_beta;
		gamma_lower_r = angles.theta_armright_lower_gamma;

		alpha_upper_l = angles.theta_armright_upper_alpha;
		beta_upper_l = angles.theta_armright_upper_beta;
		gamma_upper_l = angles.theta_armright_upper_gamma;
		alpha_lower_l = angles.theta_armright_lower_alpha;
		beta_lower_l = angles.theta_armright_lower_beta;
		gamma_lower_l = angles.theta_armright_lower_gamma;

		// var rotation_upper_left = BABYLON.Quaternion.FromEulerAngles(alpha_upper_l,beta_upper_l,gamma_upper_l);
		// var q33c_l = skeleton.bones[9].getTransformNode().rotationQuaternion;
		// var q34r_l = new BABYLON.Quaternion(0.707,0.707,0.0,0.0).multiply(BABYLON.Quaternion.Inverse(q33c_l).multiply(rotation_upper_left));
		
		// // Rotation
		// var q34_l = q34r_l.multiply(rotation_upper_left).multiply(BABYLON.Quaternion.Inverse(q34r_l));
		// skeleton.bones[10].getTransformNode().rotationQuaternion.multiplyInPlace(q34_l);

		// var rotation_lower_left = BABYLON.Quaternion.FromEulerAngles(alpha_lower_l,-beta_lower_l,-gamma_lower_l);
		// var q34c_l = skeleton.bones[10].getTransformNode().rotationQuaternion;
		// var q35r_l = BABYLON.Quaternion.Inverse(q34c_l).multiply(rotation_lower_left).multiply(new BABYLON.Quaternion(0.707,0.0,0.0,0.707));
		// skeleton.bones[11].getTransformNode().rotationQuaternion.multiplyInPlace(q35r_l);


		var rotation_upper_right = BABYLON.Quaternion.FromEulerAngles(alpha_upper_r,beta_upper_r,gamma_upper_r);
		var q33c_r = skeleton.bones[34].getTransformNode().rotationQuaternion;
		var q34r_r = BABYLON.Quaternion.Inverse(q33c_r).multiply(rotation_upper_right);
		// Rotation by q34r_r
		var q34_r = q34r_r.multiply(rotation_upper_right).multiply(BABYLON.Quaternion.Inverse(q34r_r));
		skeleton.bones[34].getTransformNode().rotationQuaternion.multiplyInPlace(q34_r);

		var rotation_lower_right = BABYLON.Quaternion.FromEulerAngles(alpha_lower_r,beta_lower_r,gamma_lower_r);
		var q34c_r = skeleton.bones[34].getTransformNode().rotationQuaternion;
		var q35r_r = BABYLON.Quaternion.Inverse(q34c_r).multiply(rotation_lower_right).multiply(new BABYLON.Quaternion(0.707,0.0,0.0,0.707));
		skeleton.bones[35].getTransformNode().rotationQuaternion.multiplyInPlace(q35r_r);

		
	} else {
		// LEFT Shoulder		   
		skeleton.bones[9].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.5,0.5,-0.5,0.5);    
		skeleton.bones[10].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
		skeleton.bones[11].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);

		// RIGHT Shoulder
		skeleton.bones[33].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.5,-0.5,0.5,0.5); 
		skeleton.bones[34].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
		skeleton.bones[35].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);

		//Neck
		skeleton.bones[4].getTransformNode().rotation = BABYLON.Vector3.Zero();
		//Head
		skeleton.bones[5].getTransformNode().rotation = BABYLON.Vector3.Zero();

		// Upper Back
		skeleton.bones[1].getTransformNode().rotation = BABYLON.Vector3.Zero();
		skeleton.bones[2].getTransformNode().rotation = BABYLON.Vector3.Zero();
		// Lower Back
		skeleton.bones[3].getTransformNode().rotation = BABYLON.Vector3.Zero();

		skeleton.bones[0].getTransformNode().rotation = BABYLON.Vector3.Zero();
		/*

			AVATAR ANIMATION FROM SENSORS DATA

		*/
		if (typeof(values) != "undefined")
		{
			let animate_lower_back = true;
			
			
			//Chest
			let pitch = -values['theta_torso_pitch_r'];
			let bend = -values['theta_torso_bend_r'];
			let yaw =  values['theta_torso_yaw_r'];
			let roll = -values['theta_torso_roll_r']; 
			let tilt = values['theta_torso_tilt_r']; 
			
			// Head / neck
			let head_pitch = AngleLimit(values['theta_head_pitch_h'],pitch_neck_limit,pitch_head_limit);
			let head_yaw = AngleLimit(values['theta_head_yaw_h'],yaw_neck_limit,yaw_head_limit);
			let head_roll = AngleLimit(values['theta_head_roll_h'],roll_neck_limit,roll_head_limit); 	
			
			//Right Arm
			let alpha_upper_r = values['theta_armright_upper_alpha'];
			let beta_upper_r =  values['theta_armright_upper_beta'];
			let gamma_upper_r = values['theta_armright_upper_gamma'];
			let alpha_lower_r = values['theta_armright_lower_alpha'];
			let beta_lower_r =  values['theta_armright_lower_beta'];
			let gamma_lower_r = values['theta_armright_lower_gamma'];

			//Left Arm
			let alpha_upper_l = values['theta_armleft_upper_alpha'];
			let beta_upper_l =  values['theta_armleft_upper_beta'];
			let gamma_upper_l = values['theta_armleft_upper_gamma'];
			let alpha_lower_l = values['theta_armleft_lower_alpha'];
			let beta_lower_l =  values['theta_armleft_lower_beta'];
			let gamma_lower_l = values['theta_armleft_lower_gamma'];
			// Chest
			// Lower Back
			if (animate_lower_back == true)
			{
				//yaw = 0.785;
				skeleton.bones[0].getTransformNode().rotate(BABYLON.Axis.Y,yaw );
				skeleton.bones[1].getTransformNode().rotate(BABYLON.Axis.X, -pitch );
				skeleton.bones[1].getTransformNode().rotate(BABYLON.Axis.Z, -bend );
			}
			// Upper Back
			skeleton.bones[3].getTransformNode().rotate(BABYLON.Axis.Z, tilt );
			
			// Neck
			skeleton.bones[5].getTransformNode().rotate(BABYLON.Axis.X, head_pitch['neck']); //Neck Pitch
			skeleton.bones[5].getTransformNode().rotate(BABYLON.Axis.Y, head_yaw['neck']); // Neck Yaw
			skeleton.bones[5].getTransformNode().rotate(BABYLON.Axis.Z, head_roll['neck']); // Neck roll

			// Head
			skeleton.bones[4].getTransformNode().rotate(BABYLON.Axis.X, head_pitch['head']); //Head Pitch
			skeleton.bones[4].getTransformNode().rotate(BABYLON.Axis.Y, head_yaw['head']); // Head Yaw
			skeleton.bones[4].getTransformNode().rotate(BABYLON.Axis.Z, head_roll['head']); // Head roll

			// Left Arm
			var rotation_upper_left = BABYLON.Quaternion.FromEulerAngles(alpha_upper_l,beta_upper_l,gamma_upper_l);
			var q33c_l = skeleton.bones[9].getTransformNode().rotationQuaternion;
			var q34r_l = new BABYLON.Quaternion(0.707,0.707,0.0,0.0).multiply(BABYLON.Quaternion.Inverse(q33c_l).multiply(rotation_upper_left));
			var q34_l = q34r_l.multiply(rotation_upper_left).multiply(BABYLON.Quaternion.Inverse(q34r_l));
			skeleton.bones[10].getTransformNode().rotationQuaternion.multiplyInPlace(q34_l);

			var rotation_lower_left = BABYLON.Quaternion.FromEulerAngles(alpha_lower_l,-beta_lower_l,-gamma_lower_l);
			var q34c_l = skeleton.bones[10].getTransformNode().rotationQuaternion;
			var q35r_l = BABYLON.Quaternion.Inverse(q34c_l).multiply(rotation_lower_left).multiply(new BABYLON.Quaternion(0.707,0.0,0.0,0.707));
			skeleton.bones[11].getTransformNode().rotationQuaternion.multiplyInPlace(q35r_l);

			// Right Arm
			var rotation_upper_right = BABYLON.Quaternion.FromEulerAngles(alpha_upper_r,beta_upper_r,gamma_upper_r);
			var q33c_r = skeleton.bones[34].getTransformNode().rotationQuaternion;
			var q34r_r = BABYLON.Quaternion.Inverse(q33c_r).multiply(rotation_upper_right);
			var q34_r = q34r_r.multiply(rotation_upper_right).multiply(BABYLON.Quaternion.Inverse(q34r_r));
			skeleton.bones[34].getTransformNode().rotationQuaternion.multiplyInPlace(q34_r);

			var rotation_lower_right = BABYLON.Quaternion.FromEulerAngles(alpha_lower_r,beta_lower_r,gamma_lower_r);
			var q34c_r = skeleton.bones[34].getTransformNode().rotationQuaternion;
			var q35r_r = BABYLON.Quaternion.Inverse(q34c_r).multiply(rotation_lower_right).multiply(new BABYLON.Quaternion(0.707,0.0,0.0,0.707));
			skeleton.bones[35].getTransformNode().rotationQuaternion.multiplyInPlace(q35r_r);			
		}
	}
	return skeleton
}
