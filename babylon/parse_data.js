function parse_data(skeleton,values)
{
	if (typeof(values) != "undefined")
	{
		let animate_lower_back = true;
		// RIGHT Shoulder                
		skeleton.bones[34].getTransformNode().rotation = BABYLON.Vector3.Zero();
		skeleton.bones[35].getTransformNode().rotation = BABYLON.Vector3.Zero();
		skeleton.bones[36].getTransformNode().rotation = BABYLON.Vector3.Zero();

		// LEFT Shoulder
		skeleton.bones[10].getTransformNode().rotation = BABYLON.Vector3.Zero();
		skeleton.bones[11].getTransformNode().rotation = BABYLON.Vector3.Zero();
		skeleton.bones[12].getTransformNode().rotation = BABYLON.Vector3.Zero();

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
		let alpha_upper_r = Math.PI/2.2 - values['theta_armright_upper_alpha'];
		let beta_upper_r =    values['theta_armright_upper_beta'];
		let gamma_upper_r =   values['theta_armright_upper_gamma'];
		let alpha_lower_r =  values['theta_armright_lower_alpha'];
		let beta_lower_r =  -values['theta_armright_lower_beta'];
		let gamma_lower_r = values['theta_armright_lower_gamma'];
		
		//Left Arm
		let alpha_upper_l =  Math.PI/2.2 - values['theta_armleft_upper_alpha'];
		let beta_upper_l =  -values['theta_armleft_upper_beta'];
		let gamma_upper_l = values['theta_armleft_upper_gamma'];
		let alpha_lower_l =  -values['theta_armleft_lower_alpha'];
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


		// RIGHT Shoulder
		skeleton.bones[34].getTransformNode().rotate(BABYLON.Axis.X, alpha_upper_r); 
		skeleton.bones[34].getTransformNode().rotate(BABYLON.Axis.Y, gamma_upper_r);
		skeleton.bones[34].getTransformNode().rotate(BABYLON.Axis.Z, beta_upper_r); 
		skeleton.bones[35].getTransformNode().rotate(BABYLON.Axis.X, alpha_lower_r);
		skeleton.bones[35].getTransformNode().rotate(BABYLON.Axis.Y, gamma_lower_r);
		skeleton.bones[35].getTransformNode().rotate(BABYLON.Axis.Z, beta_lower_r);

		// LEFT Shoulder
		skeleton.bones[10].getTransformNode().rotate(BABYLON.Axis.X, alpha_upper_l);
		skeleton.bones[10].getTransformNode().rotate(BABYLON.Axis.Y, gamma_upper_l);
		skeleton.bones[10].getTransformNode().rotate(BABYLON.Axis.Z, beta_upper_l);
		skeleton.bones[11].getTransformNode().rotate(BABYLON.Axis.X, alpha_lower_l);
		skeleton.bones[11].getTransformNode().rotate(BABYLON.Axis.Y, gamma_lower_l);
		skeleton.bones[11].getTransformNode().rotate(BABYLON.Axis.Z, beta_lower_l);
	}
}
