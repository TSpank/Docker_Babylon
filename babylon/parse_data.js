function parse_data(skeleton,values,angles)
{
	
	if ( angles != null )
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

		var rotation_upper_right = BABYLON.Quaternion.FromEulerAngles(alpha_upper_r,beta_upper_r,gamma_upper_r);
		var rq = rotation_upper_right.multiply(new BABYLON.Quaternion(-0.707,0.0,0.0,0.707));
		var quat_33 = skeleton.bones[33].getTransformNode().rotationQuaternion;
		var q33_r = BABYLON.Quaternion.Inverse(quat_33).multiply(rotation_upper_right);
		var q3 = new BABYLON.Quaternion(0.5,-0.5,0.5,0.5);
		var q33_707 = q33_r.multiply(q3);
		skeleton.bones[34].getTransformNode().rotationQuaternion.multiplyInPlace(q33_707);

		// skeleton.bones[34].getTransformNode().rotationQuaternion.multiplyInPlace(rotation_upper_right);

		var rotation_lower_right = BABYLON.Quaternion.FromEulerAngles(alpha_lower_r,beta_lower_r,gamma_lower_r);
		//var rotation_lower_right = BABYLON.Quaternion.FromEulerAngles(gamma_lower_r,-beta_lower_r,-alpha_lower_r);
		var quat_34 = skeleton.bones[34].getTransformNode().rotationQuaternion;
		var q34_r = BABYLON.Quaternion.Inverse(quat_34).multiply(rotation_lower_right);
		var q_707 = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
		var q34_707 = q34_r.multiply(q_707);
		skeleton.bones[35].getTransformNode().rotationQuaternion.multiplyInPlace(q34_707);
		//skeleton.bones[35].getTransformNode().rotationQuaternion.multiplyInPlace(quat_34.multiply(BABYLON.Quaternion.Inverse(rotation_lower_right)));
		//skeleton.bones[35].getTransformNode().rotationQuaternion.multiplyInPlace(quat_35.multiply(rotation_lower_right));

		if ( false ){
			
			var rotation_lower_right = BABYLON.Quaternion.FromEulerAngles(0.0,0.0,gamma_lower_r);
			skeleton.bones[35].getTransformNode().rotationQuaternion.multiplyInPlace(rotation_lower_right);
			
			var rotation_wrist_right = BABYLON.Quaternion.FromEulerAngles(alpha_lower_r,beta_lower_r,0.0);
			skeleton.bones[36].getTransformNode().rotationQuaternion.multiplyInPlace(rotation_wrist_right);

			var rotation_upper_left = BABYLON.Quaternion.FromEulerAngles(alpha_upper_r,-beta_upper_r,-gamma_upper_r);
			skeleton.bones[10].getTransformNode().rotationQuaternion.multiplyInPlace(rotation_upper_left);
			
			var rotation_lower_left = BABYLON.Quaternion.FromEulerAngles(0.0,0.0,gamma_lower_r);
			skeleton.bones[11].getTransformNode().rotationQuaternion.multiplyInPlace(BABYLON.Quaternion.Inverse(rotation_lower_left));
			
			var rotation_wrist_left = BABYLON.Quaternion.FromEulerAngles(alpha_lower_r,-beta_lower_r,0.0);
			skeleton.bones[12].getTransformNode().rotationQuaternion.multiplyInPlace(rotation_wrist_left);
		}

		
	} else {
		if (typeof(values) != "undefined")
		{
			let animate_lower_back = true;
			
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
			skeleton.bones[4].getTransformNode().rotation = BABYLON.Vector3.Zero();
			//Head
			skeleton.bones[5].getTransformNode().rotation = BABYLON.Vector3.Zero();

			// Upper Back
			skeleton.bones[1].getTransformNode().rotation = BABYLON.Vector3.Zero();
			skeleton.bones[2].getTransformNode().rotation = BABYLON.Vector3.Zero();
			// Lower Back
			skeleton.bones[3].getTransformNode().rotation = BABYLON.Vector3.Zero();

			skeleton.bones[0].getTransformNode().rotation = BABYLON.Vector3.Zero();
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
			// let qu_r = values['theta_armright_upper_quaternion'];
			let ql_r = values['theta_armright_lower_quaternion'];

			//Left Arm
			let alpha_upper_l = arm_offset - values['theta_armleft_upper_alpha'];
			let beta_upper_l =  values['theta_armleft_upper_beta'];
			let gamma_upper_l = values['theta_armleft_upper_gamma'];
			let alpha_lower_l =  values['theta_armleft_lower_alpha'];
			let beta_lower_l =  -values['theta_armleft_lower_beta'];
			let gamma_lower_l = values['theta_armleft_lower_gamma'];
			// Chest
			// Lower Back
			if (animate_lower_back == true)
			{
				//yaw = 0.785;
				skeleton.bones[0].getTransformNode().rotate(BABYLON.Axis.Y,yaw );
				// skeleton.bones[1].getTransformNode().rotate(BABYLON.Axis.Y,-yaw * 0.5);
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

			if (false) {// LEFT arm
				var rotation_upper_left = BABYLON.Quaternion.FromEulerAngles(alpha_upper_l,-beta_upper_l,-gamma_upper_l);
				skeleton.bones[10].getTransformNode().rotationQuaternion.multiplyInPlace(rotation_upper_left);

				var rotation_lower_left = BABYLON.Quaternion.FromEulerAngles(0.0,0.0,-gamma_lower_l);
				skeleton.bones[11].getTransformNode().rotationQuaternion.multiplyInPlace(rotation_lower_left);

				var rotation_wrist_left = BABYLON.Quaternion.FromEulerAngles(alpha_lower_l,-beta_lower_l,0.0);
				skeleton.bones[12].getTransformNode().rotationQuaternion.multiplyInPlace(rotation_wrist_left);
				
				// RIGHT arm
				var rotation_upper_right = BABYLON.Quaternion.FromEulerAngles(alpha_upper_r,beta_upper_r,gamma_upper_r);
				skeleton.bones[34].getTransformNode().rotationQuaternion.multiplyInPlace(rotation_upper_right);

				var rotation_lower_right = BABYLON.Quaternion.FromEulerAngles(0.0,0.0,gamma_lower_r);
				skeleton.bones[35].getTransformNode().rotationQuaternion.multiplyInPlace(rotation_lower_right);
				
				var rotation_wrist_right = BABYLON.Quaternion.FromEulerAngles(alpha_lower_r,beta_lower_r,0.0);
				skeleton.bones[36].getTransformNode().rotationQuaternion.multiplyInPlace(rotation_wrist_right);			
			} else {
				if (false){
					//var rotation_upper_right = new BABYLON.Quaternion(qu_r[0],qu_r[1],qu_r[2],qu_r[3]);//BABYLON.Quaternion.FromEulerAngles(alpha_upper_r,beta_upper_r,gamma_upper_r);
					var rotation_upper_right = BABYLON.Quaternion.FromEulerAngles(alpha_upper_r,beta_upper_r,gamma_upper_r);
					var quat_33 = skeleton.bones[33].getTransformNode().rotationQuaternion;
					var q33_r = BABYLON.Quaternion.Inverse(quat_33).multiply(rotation_upper_right);
					var q3 = new BABYLON.Quaternion(0.5,-0.5,0.5,0.5);
					var q33_707 = q33_r.multiply(q3);
					skeleton.bones[34].getTransformNode().rotationQuaternion.multiplyInPlace(q33_707);
					//RIGHT arm					
					skeleton.bones[34].getTransformNode().rotationQuaternion.multiplyInPlace(rotation_upper_right);
				} else {
					var rotation_upper_right = BABYLON.Quaternion.FromEulerAngles(alpha_upper_r,beta_upper_r,gamma_upper_r);
					//var rotation_upper_right = new BABYLON.Quaternion(qu_r[0],qu_r[1],qu_r[2],qu_r[3]);
					skeleton.bones[34].getTransformNode().rotationQuaternion.multiplyInPlace(rotation_upper_right);
				}

				// var rotation_lower_right = new BABYLON.Quaternion.FromEulerAngles(alpha_lower_r,beta_lower_r,gamma_lower_r); //
				var rotation_lower_right = new BABYLON.Quaternion(ql_r[0],ql_r[1],ql_r[2],ql_r[3]);//.FromEulerAngles(alpha_lower_r,beta_lower_r,gamma_lower_r);
				if (true)
				{
					var quat_34 = skeleton.bones[34].getTransformNode().rotationQuaternion;
					var q34_r = BABYLON.Quaternion.Inverse(quat_34).multiply(rotation_lower_right);
					var q_707 = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
					var q34_707 = q34_r.multiply(q_707);
					skeleton.bones[35].getTransformNode().rotationQuaternion.multiplyInPlace(q34_707);
				} else {
					var ql_r2 = new BABYLON.Quaternion();
					skeleton.bones[35].getTransformNode().rotationQuaternion.multiplyToRef(BABYLON.Quaternion.Inverse(rotation_lower_right),ql_r2);
					skeleton.bones[35].getTransformNode().rotationQuaternion = ql_r2;
				}
			}
			
			
		}
	}
	return skeleton
}
