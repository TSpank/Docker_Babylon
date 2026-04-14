function reset(_skeleton)
{
    // LEFT Shoulder
    _skeleton.bones[9].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.5,0.5,-0.5,0.5);
    _skeleton.bones[10].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
    _skeleton.bones[11].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
    _skeleton.bones[12].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
    // RIGHT Shoulder
    _skeleton.bones[33].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.5,-0.5,0.5,0.5);
    _skeleton.bones[34].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
    _skeleton.bones[35].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
    _skeleton.bones[36].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);

    //Neck
    _skeleton.bones[4].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
    //Head
    _skeleton.bones[5].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);

    // Upper Back
    _skeleton.bones[1].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
    _skeleton.bones[2].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
    // Lower Back
    _skeleton.bones[3].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);

    _skeleton.bones[0].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
}

function resetAvatar(_skeleton)
{
    _skeleton.returnToRest();
}


function parse_data(skeleton,values,angles)
{
    console.log("� parse_data: Using Euler angles (.rotate() method)");
    
    // Debug input values
    if (values && typeof values === 'object' && values !== "undefined") {
        const sampleKeys = Object.keys(values).slice(0, 3);
        console.log("📊 Sample input values:", sampleKeys.map(k => `${k}: ${values[k]}`));
        
        // Check if values are all zeros
        const allZero = Object.values(values).every(v => parseFloat(v) === 0);
        console.log("⚠️ All input values are zero:", allZero);
    } else {
        console.log("📊 Input values:", values);
    }
    
    // return skeleton;
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

        // LEFT Leg
        skeleton.bones[57].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
        skeleton.bones[58].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
        // RIGHT Leg
        skeleton.bones[62].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
        skeleton.bones[63].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
        
        // Hands
        skeleton.bones[36].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
        skeleton.bones[12].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);

        // Feet
        skeleton.bones[64].getTransformNode().rotation = new BABYLON.Vector3(Math.PI/3, 0, 0.0);
        skeleton.bones[59].getTransformNode().rotation = new BABYLON.Vector3(Math.PI/3, 0, 0.0);

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

        // LEFT Leg
        skeleton.bones[57].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
        skeleton.bones[58].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
        // RIGHT Leg
        skeleton.bones[62].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
        skeleton.bones[63].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);

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

        skeleton.bones[62].getTransformNode().rotation = new BABYLON.Vector3(Math.PI, Math.PI, 0.0);
        skeleton.bones[63].getTransformNode().rotation = new BABYLON.Vector3(0, 0, 0);
        skeleton.bones[64].getTransformNode().rotation = new BABYLON.Vector3(Math.PI/2, 0, 0.0);

        skeleton.bones[57].getTransformNode().rotation = new BABYLON.Vector3(Math.PI, Math.PI, 0.0);
        skeleton.bones[58].getTransformNode().rotation = new BABYLON.Vector3(0, 0, 0);
        skeleton.bones[59].getTransformNode().rotation = new BABYLON.Vector3(Math.PI/2, 0, 0.0);

        //hands and feet
        skeleton.bones[36].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
        skeleton.bones[12].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);

        skeleton.bones[64].getTransformNode().rotation = new BABYLON.Vector3(Math.PI/3, 0, 0.0);
        skeleton.bones[59].getTransformNode().rotation = new BABYLON.Vector3(Math.PI/3, 0, 0.0);


        /*

         AVATAR ANIMATION FROM SENSORS DATA

         */
        if (typeof(values) != "undefined")
        {
            let animate_lower_back = true;


            //Chest
            let pitch = values['theta_torso_pitch_r'];
            let bend = values['theta_torso_bend_r'];
            let yaw =  values['theta_torso_yaw_r'];
            let roll = values['theta_torso_roll_r'];
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

            // ========== LOWER BODY ADDITIONS ==========

            // Pelvis
            let pelvis_pitch = values['theta_pelvis_pitch'] || 0.0;
            let pelvis_tilt = values['theta_pelvis_tilt'] || 0.0;
            let pelvis_yaw = values['theta_pelvis_yaw'] || 0.0;

            // Right Leg
            let legright_upper_alpha = values['theta_legright_upper_alpha'] || 0.0;
            let legright_upper_beta = values['theta_legright_upper_beta'] || 0.0;
            let legright_upper_gamma = values['theta_legright_upper_gamma'] || 0.0;
            let legright_lower_alpha = values['theta_legright_lower_alpha'] || 0.0;
            let legright_lower_beta = values['theta_legright_lower_beta'] || 0.0;
            let legright_lower_gamma = values['theta_legright_lower_gamma'] || 0.0;

            // Left Leg
            let legleft_upper_alpha = values['theta_legleft_upper_alpha'] || 0.0;
            let legleft_upper_beta = values['theta_legleft_upper_beta'] || 0.0;
            let legleft_upper_gamma = values['theta_legleft_upper_gamma'] || 0.0;
            let legleft_lower_alpha = values['theta_legleft_lower_alpha'] || 0.0;
            let legleft_lower_beta = values['theta_legleft_lower_beta'] || 0.0;
            let legleft_lower_gamma = values['theta_legleft_lower_gamma'] || 0.0;

            // ========== HANDS / FEET (placeholders) ==========
            // These keys are optional; they default to 0.0.
            // Update the key names to match your publisher if needed.

            // Right Hand
            let handright_alpha = values['theta_handright_alpha'] || 0.0;
            let handright_beta = values['theta_handright_beta'] || 0.0;
            let handright_gamma = values['theta_handright_gamma'] || 0.0;

            // Left Hand
            let handleft_alpha = values['theta_handleft_alpha'] || 0.0;
            let handleft_beta = values['theta_handleft_beta'] || 0.0;
            let handleft_gamma = values['theta_handleft_gamma'] || 0.0;

            // Right Foot / Ankle
            let footright_alpha = values['theta_footright_alpha'] || 0.0;
            let footright_beta = values['theta_footright_beta'] || 0.0;
            let footright_gamma = values['theta_footright_gamma'] || 0.0;

            // Left Foot / Ankle
            let footleft_alpha = values['theta_footleft_alpha'] || 0.0;
            let footleft_beta = values['theta_footleft_beta'] || 0.0;
            let footleft_gamma = values['theta_footleft_gamma'] || 0.0;

            // ========== END HANDS / FEET (placeholders) ==========

            // ========== END LOWER BODY ADDITIONS ==========

            // Chest
            // Lower Back
            
            skeleton.bones[0].getTransformNode().rotate(BABYLON.Axis.Y, pelvis_yaw );
            skeleton.bones[0].getTransformNode().rotate(BABYLON.Axis.X, pelvis_pitch );
            skeleton.bones[0].getTransformNode().rotate(BABYLON.Axis.Z, pelvis_tilt );

            skeleton.bones[2].getTransformNode().rotate(BABYLON.Axis.Y, yaw);
            skeleton.bones[2].getTransformNode().rotate(BABYLON.Axis.X, pitch);
            skeleton.bones[3].getTransformNode().rotate(BABYLON.Axis.Z, tilt);

            // Neck
            skeleton.bones[5].getTransformNode().rotate(BABYLON.Axis.X, head_pitch['neck']); //Neck Pitch
            skeleton.bones[5].getTransformNode().rotate(BABYLON.Axis.Y, head_yaw['neck']); // Neck Yaw
            skeleton.bones[5].getTransformNode().rotate(BABYLON.Axis.Z, head_roll['neck']); // Neck roll

            // Head
            skeleton.bones[4].getTransformNode().rotate(BABYLON.Axis.X, head_pitch['head']); //Head Pitch
            skeleton.bones[4].getTransformNode().rotate(BABYLON.Axis.Y, head_yaw['head']); // Head Yaw
            skeleton.bones[4].getTransformNode().rotate(BABYLON.Axis.Z, head_roll['head']); // Head roll

            // Left Arm
            // LEFT Shoulder
            skeleton.bones[10].getTransformNode().rotate(BABYLON.Axis.Z, beta_upper_l);
            skeleton.bones[10].getTransformNode().rotate(BABYLON.Axis.Y, gamma_upper_l);
            skeleton.bones[10].getTransformNode().rotate(BABYLON.Axis.X, alpha_upper_l);

            skeleton.bones[11].getTransformNode().rotate(BABYLON.Axis.Z, beta_lower_l);
            skeleton.bones[11].getTransformNode().rotate(BABYLON.Axis.Y, gamma_lower_l);
            skeleton.bones[11].getTransformNode().rotate(BABYLON.Axis.X, alpha_lower_l);


            // var rotation_upper_left = BABYLON.Quaternion.FromEulerAngles(alpha_upper_l,beta_upper_l,gamma_upper_l);
            // var q33c_l = skeleton.bones[9].getTransformNode().rotationQuaternion;
            // var q34r_l = new BABYLON.Quaternion(0.707,0.707,0.0,0.0).multiply(BABYLON.Quaternion.Inverse(q33c_l).multiply(rotation_upper_left));
            // var q34_l = q34r_l.multiply(rotation_upper_left).multiply(BABYLON.Quaternion.Inverse(q34r_l));
            // skeleton.bones[10].getTransformNode().rotationQuaternion.multiplyInPlace(q34_l);

            // var rotation_lower_left = BABYLON.Quaternion.FromEulerAngles(alpha_lower_l,-beta_lower_l,-gamma_lower_l);
            // var q34c_l = skeleton.bones[10].getTransformNode().rotationQuaternion;
            // var q35r_l = BABYLON.Quaternion.Inverse(q34c_l).multiply(rotation_lower_left).multiply(new BABYLON.Quaternion(0.707,0.0,0.0,0.707));
            // skeleton.bones[11].getTransformNode().rotationQuaternion.multiplyInPlace(q35r_l);

            // Right Arm
            skeleton.bones[34].getTransformNode().rotate(BABYLON.Axis.Z, -beta_upper_r);
            skeleton.bones[34].getTransformNode().rotate(BABYLON.Axis.Y, -gamma_upper_r);
            skeleton.bones[34].getTransformNode().rotate(BABYLON.Axis.X, alpha_upper_r);
            skeleton.bones[35].getTransformNode().rotate(BABYLON.Axis.Z, -beta_lower_r);
            skeleton.bones[35].getTransformNode().rotate(BABYLON.Axis.Y, -gamma_lower_r);
            skeleton.bones[35].getTransformNode().rotate(BABYLON.Axis.X, alpha_lower_r);

            //Hands
            skeleton.bones[36].getTransformNode().rotate(BABYLON.Axis.Z, -handright_beta);
            skeleton.bones[36].getTransformNode().rotate(BABYLON.Axis.Y, -handright_gamma);
            skeleton.bones[36].getTransformNode().rotate(BABYLON.Axis.X, handright_alpha);
        
            skeleton.bones[12].getTransformNode().rotate(BABYLON.Axis.Z, handleft_beta);
            skeleton.bones[12].getTransformNode().rotate(BABYLON.Axis.Y, handleft_gamma);
            skeleton.bones[12].getTransformNode().rotate(BABYLON.Axis.X, handleft_alpha);

            // ========== LOWER BODY ROTATIONS ==========

            // Pelvis rotations (Hips - bone index 0)
            // Note: Pelvis rotations are already being applied above via skeleton.bones[0] for yaw
            // Uncomment these if you need additional pelvis control separate from torso:
//             skeleton.bones[0].getTransformNode().rotate(BABYLON.Axis.X, pelvis_pitch);
//             skeleton.bones[0].getTransformNode().rotate(BABYLON.Axis.Z, pelvis_tilt);
//             skeleton.bones[0].getTransformNode().rotate(BABYLON.Axis.Y, pelvis_yaw);

            // Right upper leg (RightUpLeg - bone index 62)
            skeleton.bones[62].getTransformNode().rotate(BABYLON.Axis.Z, -legright_upper_beta);
            skeleton.bones[62].getTransformNode().rotate(BABYLON.Axis.Y, -legright_upper_gamma);
            skeleton.bones[62].getTransformNode().rotate(BABYLON.Axis.X, legright_upper_alpha);

            // Right lower leg (RightLeg - bone index 63)
            skeleton.bones[63].getTransformNode().rotate(BABYLON.Axis.Z, -legright_lower_beta);
            skeleton.bones[63].getTransformNode().rotate(BABYLON.Axis.Y, -legright_lower_gamma);
            skeleton.bones[63].getTransformNode().rotate(BABYLON.Axis.X, legright_lower_alpha);

            // Left Leg rotations
            // Left upper leg (LeftUpLeg - bone index 57)
            skeleton.bones[57].getTransformNode().rotate(BABYLON.Axis.Z, legleft_upper_beta);
            skeleton.bones[57].getTransformNode().rotate(BABYLON.Axis.Y, legleft_upper_gamma);
            skeleton.bones[57].getTransformNode().rotate(BABYLON.Axis.X, legleft_upper_alpha);

            // Left lower leg (LeftLeg - bone index 58)
            skeleton.bones[58].getTransformNode().rotate(BABYLON.Axis.Z, legleft_lower_beta);
            skeleton.bones[58].getTransformNode().rotate(BABYLON.Axis.Y, legleft_lower_gamma);
            skeleton.bones[58].getTransformNode().rotate(BABYLON.Axis.X, legleft_lower_alpha);

            // ========== HANDS / FEET ROTATIONS (TEMP INDICES) ==========
            // Guarded: if TEMP_BONE_INDICES.* stays -1, these do nothing.
            
            //Feet
            skeleton.bones[64].getTransformNode().rotate(BABYLON.Axis.Z, -footright_beta);
            skeleton.bones[64].getTransformNode().rotate(BABYLON.Axis.Y, -footright_gamma);
            skeleton.bones[64].getTransformNode().rotate(BABYLON.Axis.X, footright_alpha);
        
            skeleton.bones[59].getTransformNode().rotate(BABYLON.Axis.Z, footleft_beta);
            skeleton.bones[59].getTransformNode().rotate(BABYLON.Axis.Y, footleft_gamma);
            skeleton.bones[59].getTransformNode().rotate(BABYLON.Axis.X, footleft_alpha);
            
            // ========== END HANDS / FEET ROTATIONS ==========

            // ========== END LOWER BODY ROTATIONS ==========


            // var rotation_upper_right = BABYLON.Quaternion.FromEulerAngles(alpha_upper_r,beta_upper_r,gamma_upper_r);
            // var q33c_r = skeleton.bones[34].getTransformNode().rotationQuaternion;
            // var q34r_r = BABYLON.Quaternion.Inverse(q33c_r).multiply(rotation_upper_right);
            // var q34_r = q34r_r.multiply(rotation_upper_right).multiply(BABYLON.Quaternion.Inverse(q34r_r));
            // skeleton.bones[34].getTransformNode().rotationQuaternion.multiplyInPlace(q34_r);

            // var rotation_lower_right = BABYLON.Quaternion.FromEulerAngles(alpha_lower_r,beta_lower_r,gamma_lower_r);
            // var q34c_r = skeleton.bones[34].getTransformNode().rotationQuaternion;
            // var q35r_r = BABYLON.Quaternion.Inverse(q34c_r).multiply(rotation_lower_right).multiply(new BABYLON.Quaternion(0.707,0.0,0.0,0.707));
            // skeleton.bones[35].getTransformNode().rotationQuaternion.multiplyInPlace(q35r_r);

        }
    }
    
    return skeleton
}

/**
 * Parse quaternion data from JSON and apply directly to skeleton bones
 * @param {BABYLON.Skeleton} skeleton - The skeleton to animate
 * @param {Object} quaternionData - JSON object containing quaternion data for each bone
 * Expected format: {
 *   "pelvis": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "spine1": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "spine2": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "spine3": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "neck": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "head": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "left_shoulder": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "left_upper_arm": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "left_lower_arm": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "left_hand": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "right_shoulder": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "right_upper_arm": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "right_lower_arm": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "right_hand": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "left_upper_leg": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "left_lower_leg": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "left_foot": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "right_upper_leg": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "right_lower_leg": {"x": 0, "y": 0, "z": 0, "w": 1},
 *   "right_foot": {"x": 0, "y": 0, "z": 0, "w": 1}
 * }
 */
function parseQuaternionData(skeleton, quaternionData) {
    if (!skeleton || !quaternionData) {
        console.warn("parseQuaternionData: Invalid skeleton or quaternion data");
        return skeleton;
    }

    

    ///////////////////////////////setup

    // skeleton.bones[9].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.5,0.5,-0.5,0.5);
    // skeleton.bones[10].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
    // skeleton.bones[11].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);

    // //RIGHT Shoulder
    // skeleton.bones[33].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.5,-0.5,0.5,0.5);
    // skeleton.bones[34].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
    // skeleton.bones[35].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);

    // LEFT Leg
    skeleton.bones[57].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
    skeleton.bones[58].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
    // RIGHT Leg
    skeleton.bones[62].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
    skeleton.bones[63].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);

    //Neck
    skeleton.bones[4].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1.0);
    //Head
    skeleton.bones[5].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1.0);
    // Upper Back
    skeleton.bones[1].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1.0);
    skeleton.bones[2].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1.0);
    // Lower Back
    skeleton.bones[3].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1.0);
    skeleton.bones[0].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1.0);

    skeleton.bones[62].getTransformNode().rotationQuaternion = new BABYLON.Quaternion.FromEulerAngles(Math.PI, Math.PI, 0.0);
    skeleton.bones[63].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1.0);
    skeleton.bones[64].getTransformNode().rotationQuaternion = new BABYLON.Quaternion.FromEulerAngles(Math.PI/2, 0, 0.0);

    skeleton.bones[57].getTransformNode().rotationQuaternion = new BABYLON.Quaternion.FromEulerAngles(Math.PI, Math.PI, 0.0);
    skeleton.bones[58].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0, 0, 0, 1.0);
    skeleton.bones[59].getTransformNode().rotationQuaternion = new BABYLON.Quaternion.FromEulerAngles(Math.PI/2, 0, 0.0);

    //hands and feet
    skeleton.bones[36].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
    skeleton.bones[12].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);

    skeleton.bones[64].getTransformNode().rotationQuaternion = new BABYLON.Quaternion.FromEulerAngles(Math.PI/3, 0, 0.0);
    skeleton.bones[59].getTransformNode().rotationQuaternion = new BABYLON.Quaternion.FromEulerAngles(Math.PI/3, 0, 0.0);

    ///////////////////////
    
    function computeLocalQuat(parentGlobal, childGlobal) {
        let parentInv = parentGlobal.clone().invert();
        return parentInv.multiply(childGlobal);
    }


    function convertQuat(q) {
        // Convert JSON quat to Babylon quaternion
        let babylonQuat = new BABYLON.Quaternion(
            parseFloat(q.x) || 0,
            parseFloat(q.y) || 0,
            parseFloat(q.z) || 0,
            parseFloat(q.w) || 1
        );
        return babylonQuat;
    }

    function convertQuat_swapaxis(q) {
        // Convert JSON quat to Babylon quaternion
        let babylonQuat = new BABYLON.Quaternion(
            parseFloat(q.x) || 0,
            -parseFloat(q.y) || 0,
            -parseFloat(q.z) || 0,
            parseFloat(q.w) || 1
        );
        return babylonQuat;
    }

    //extract quaternions from JSON, with defaults if missing
    const hip_q = convertQuat(quaternionData["hip_quat"]);
    const torso_q = convertQuat(quaternionData["torso_quat"]);
    const torso_q_swapped = convertQuat_swapaxis(quaternionData["torso_quat"]);
    const head_q = convertQuat(quaternionData["head_quat"]);

    const l_arm_upper_q = convertQuat(quaternionData["l_arm_upper"]) ;
    const l_arm_lower_q = convertQuat(quaternionData["l_arm_lower"]);
    const l_hand_q = convertQuat(quaternionData["l_hand"]);

    const r_arm_upper_q = convertQuat(quaternionData["r_arm_upper"]);
    const r_arm_lower_q = convertQuat(quaternionData["r_arm_lower"]);
    const r_hand_q = convertQuat(quaternionData["r_hand"]);

    const l_leg_upper_q = convertQuat(quaternionData["l_leg_upper"]);
    const l_leg_lower_q = convertQuat(quaternionData["l_leg_lower"]);
    const l_foot_q = convertQuat(quaternionData["l_foot"]);

    const r_leg_upper_q = convertQuat(quaternionData["r_leg_upper"]);
    const r_leg_lower_q = convertQuat(quaternionData["r_leg_lower"]);
    const r_foot_q = convertQuat(quaternionData["r_foot"]);

    const legs  = BABYLON.Quaternion.FromEulerAngles(0.0, 0, Math.PI);
    const feet  = BABYLON.Quaternion.FromEulerAngles(Math.PI/2, 0, 0.0);



    const torso = BABYLON.Quaternion.FromEulerAngles(Math.PI/3, Math.PI, 0);
    const arms = BABYLON.Quaternion.FromEulerAngles(Math.PI, Math.PI , Math.PI);




    //convert to local quats by accounting for parent bone rotations
    let torso_l = computeLocalQuat(hip_q, torso_q);
    let head_l = computeLocalQuat(torso_q, head_q);



    let l_arm_upper_l = computeLocalQuat(torso_q.multiply(torso), l_arm_upper_q.multiply(arms));
    let l_arm_lower_l = computeLocalQuat(l_arm_upper_q.multiply(arms), l_arm_lower_q.multiply(arms));
    let l_hand_l = computeLocalQuat(l_arm_lower_q.multiply(arms), l_hand_q.multiply(arms));

    let r_arm_upper_l = computeLocalQuat(torso_q.multiply(torso), r_arm_upper_q.multiply(arms));
    let r_arm_lower_l = computeLocalQuat(r_arm_upper_q.multiply(arms), r_arm_lower_q.multiply(arms));
    let r_hand_l = computeLocalQuat(r_arm_lower_q.multiply(arms), r_hand_q.multiply(arms));  




    let l_leg_upper_l = computeLocalQuat(hip_q, l_leg_upper_q.multiply(legs));
    let l_leg_lower_l = computeLocalQuat(l_leg_upper_q.multiply(legs), l_leg_lower_q.multiply(legs));
    let l_foot_l = computeLocalQuat(l_leg_lower_q, l_foot_q.multiply(feet));   

    let r_leg_upper_l = computeLocalQuat(hip_q, r_leg_upper_q.multiply(legs));
    let r_leg_lower_l = computeLocalQuat(r_leg_upper_q.multiply(legs), r_leg_lower_q.multiply(legs));
    let r_foot_l = computeLocalQuat(r_leg_lower_q, r_foot_q.multiply(feet));  

    //apply quaternions to skeleton bones
    skeleton.bones[0].getTransformNode().rotationQuaternion = hip_q;
    skeleton.bones[3].getTransformNode().rotationQuaternion = torso_l;
    skeleton.bones[5].getTransformNode().rotationQuaternion = head_l;   

    skeleton.bones[10].getTransformNode().rotationQuaternion = l_arm_upper_l;
    skeleton.bones[11].getTransformNode().rotationQuaternion = l_arm_lower_l;
    skeleton.bones[12].getTransformNode().rotationQuaternion = l_hand_l;

    skeleton.bones[34].getTransformNode().rotationQuaternion = r_arm_upper_l;
    skeleton.bones[35].getTransformNode().rotationQuaternion = r_arm_lower_l;
    skeleton.bones[36].getTransformNode().rotationQuaternion = r_hand_l;

    skeleton.bones[62].getTransformNode().rotationQuaternion = r_leg_upper_l;
    skeleton.bones[63].getTransformNode().rotationQuaternion = r_leg_lower_l;
    skeleton.bones[64].getTransformNode().rotationQuaternion = r_foot_l;

    skeleton.bones[57].getTransformNode().rotationQuaternion = l_leg_upper_l;
    skeleton.bones[58].getTransformNode().rotationQuaternion = l_leg_lower_l;
    skeleton.bones[59].getTransformNode().rotationQuaternion = l_foot_l;

    console.log("✅ parseQuaternionData: Global quaternion application and conversion to local space completed");
    return skeleton;
}



function parse_data_quats_and_angles(skeleton,values,quaternionData)
{
    function computeLocalQuat(parentGlobal, childGlobal) {
        let parentInv = parentGlobal.clone().invert();
        return parentInv.multiply(childGlobal);
    }


    function convertQuat(q) {
        // Convert JSON quat to Babylon quaternion
        let babylonQuat = new BABYLON.Quaternion(
            parseFloat(q.x) || 0,
            parseFloat(q.y) || 0,
            parseFloat(q.z) || 0,
            parseFloat(q.w) || 1
        );
        return babylonQuat;
    }

    function eulerToQuat_XYZ(alpha, beta, gamma, isRight = false) {
        // Match your sign conventions
        const bx = alpha;
        const by = isRight ? -gamma : gamma;
        const bz = isRight ? -beta  : beta;

        const qx = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.X, bx);
        const qy = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, by);
        const qz = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Z, bz);

        // IMPORTANT: order = X * Y * Z (matches your rotate sequence)
        return qx.multiply(qy).multiply(qz);
    }
        
    const OFFSETS = {
        l_upper: new BABYLON.Quaternion(0.707,0.0,0.0,0.707),
        l_lower: new BABYLON.Quaternion(0.0,0.0,0.0,1.0),

        r_upper: new BABYLON.Quaternion(0.707,0.0,0.0,0.707),
        r_lower: new BABYLON.Quaternion(0.0,0.0,0.0,1.0),

        l_shoulder: new BABYLON.Quaternion(0.5,0.5,-0.5,0.5),
        r_shoulder: new BABYLON.Quaternion(0.5,-0.5,0.5,0.5),
    };

  // swing twist decomposition and clamping functions for joint limits
    function swingTwistDecompose(q, twistAxis) {
        // FIX: normalize the twist axis — the projection math requires a unit vector.
        const axis = twistAxis.normalizeToNew();

        const projection = new BABYLON.Vector3(q.x, q.y, q.z);
        const dot = BABYLON.Vector3.Dot(projection, axis);
        const twistVec = axis.scale(dot);

        const twist = new BABYLON.Quaternion(twistVec.x, twistVec.y, twistVec.z, q.w);

        if (twist.length() < 1e-6) {
            twist.copyFromFloats(0, 0, 0, 1);
        } else {
            twist.normalize();
        }

        const twistInv = BABYLON.Quaternion.Inverse(twist);
        const swing = q.multiply(twistInv);
        swing.normalize();

        return { swing, twist };
    }

    function clampQuatAngle(q, maxAngleRad) {
        // FIX: canonicalize to the positive-w hemisphere before measuring the angle.
        // q and -q represent the same rotation; without this, a quaternion slightly past
        // w=0 would appear to have a ~360° angle instead of the correct ~0° angle.
        const sign = q.w < 0 ? -1 : 1;
        const cx = q.x * sign;
        const cy = q.y * sign;
        const cz = q.z * sign;
        const cw = q.w * sign;

        const clampedW = Math.max(-1, Math.min(1, cw));
        const halfAngle = Math.acos(clampedW);
        const maxHalf = maxAngleRad / 2;

        if (halfAngle <= maxHalf) {
            return new BABYLON.Quaternion(cx, cy, cz, cw);
        }

        const sinH = Math.sin(halfAngle);
        if (sinH < 1e-6) return BABYLON.Quaternion.Identity();

        const scale = Math.sin(maxHalf) / sinH;
        return new BABYLON.Quaternion(
            cx * scale,
            cy * scale,
            cz * scale,
            Math.cos(maxHalf)
        );
    }

    function clampSwingEllipse(swingQ, maxForwardX, maxBackwardX, maxOutwardY, maxInwardY) {
        // --- normalize safety ---
        swingQ.normalize();

        const w = Math.max(-1, Math.min(1, swingQ.w));
        const halfAngle = Math.acos(w);

        if (halfAngle < 1e-6) return swingQ.clone();

        const sinH = Math.sin(halfAngle);
        if (sinH < 1e-6) return swingQ.clone();

        // --- swing axis (unit vector in swing space) ---
        const axisX = swingQ.x / sinH;
        const axisY = swingQ.y / sinH;

        // --- choose directional limits ---
        const maxX = axisX >= 0 ? maxForwardX : maxBackwardX;
        const maxY = axisY >= 0 ? maxOutwardY : maxInwardY;

        const maxHalfX = maxX / 2;
        const maxHalfY = maxY / 2;

        // --- avoid divide-by-zero ellipse collapse ---
        const denom = Math.sqrt(
            (maxHalfY * axisX) ** 2 +
            (maxHalfX * axisY) ** 2
        );

        if (denom < 1e-9) return swingQ.clone();

        // --- ellipse radius in this direction ---
        const ellipseLimit = (maxHalfX * maxHalfY) / denom;

        // --- inside allowed region ---
        if (halfAngle <= ellipseLimit) return swingQ.clone();

        // --- clamp to boundary ---
        const scale = Math.sin(ellipseLimit) / sinH;

        return new BABYLON.Quaternion(
            swingQ.x * scale,
            swingQ.y * scale,
            swingQ.z * scale,
            Math.cos(ellipseLimit)
        ).normalize();
    }
                                              // pos         neg            pos         neg
    function limitSwingTwist(localQ, twistAxis, maxForwardX, maxBackwardX, maxOutwardY, maxInwardY, maxTwistRad, twistRestAngle = 0) {
        // FIX: normalize localQ before decomposition; upstream interpolation or
        // concatenation can produce a slightly non-unit quaternion.
        const q = localQ.clone();
        q.normalize();

        const { swing, twist } = swingTwistDecompose(q, twistAxis);
        const clampedSwing = clampSwingEllipse(swing, maxForwardX, maxBackwardX, maxOutwardY, maxInwardY);

        // Measure twist relative to the rest angle, clamp it, then restore.
        // restCorrection = rotation by -twistRestAngle around twistAxis, i.e. R⁻¹.
        // twistRelative  = R⁻¹ * twist  (twist expressed from the rest pose)
        // After clamping: clampedTwist = R * clampedRelative
        //
        // FIX (clarification): for pure single-axis twists, left- and right-multiplication
        // commute, so the original order produced the same numeric result. The corrected
        // order below is semantically clearer and safe if the math ever generalises.
        const restCorrection = BABYLON.Quaternion.RotationAxis(twistAxis.normalizeToNew(), -twistRestAngle);
        const twistRelative = restCorrection.multiply(twist);
        const clampedRelative = clampQuatAngle(twistRelative, maxTwistRad);
        const clampedTwist = BABYLON.Quaternion.Inverse(restCorrection).multiply(clampedRelative);

        return clampedSwing.multiply(clampedTwist).normalize();
    }

    //extract quaternions from JSON, with defaults if missing
    //-----------------------------------------------------------------------------------------------
    const hip_q = convertQuat(quaternionData["hip_quat"]);
    const torso_q = convertQuat(quaternionData["torso_quat"]);
    const head_q = convertQuat(quaternionData["head_quat"]);

    const l_arm_upper_q = convertQuat(quaternionData["l_arm_upper"]) ;
    const l_arm_lower_q = convertQuat(quaternionData["l_arm_lower"]);
    const l_hand_q = convertQuat(quaternionData["l_hand"]);

    const r_arm_upper_q = convertQuat(quaternionData["r_arm_upper"]);
    const r_arm_lower_q = convertQuat(quaternionData["r_arm_lower"]);
    const r_hand_q = convertQuat(quaternionData["r_hand"]);

    const l_leg_upper_q = convertQuat(quaternionData["l_leg_upper"]);
    const l_leg_lower_q = convertQuat(quaternionData["l_leg_lower"]);
    const l_foot_q = convertQuat(quaternionData["l_foot"]);

    const r_leg_upper_q = convertQuat(quaternionData["r_leg_upper"]);
    const r_leg_lower_q = convertQuat(quaternionData["r_leg_lower"]);
    const r_foot_q = convertQuat(quaternionData["r_foot"]);

    const legs  = BABYLON.Quaternion.FromEulerAngles(0.0, 0, Math.PI);
    const feet  = BABYLON.Quaternion.FromEulerAngles(Math.PI/2, 0, 0.0);
    const arms_l = BABYLON.Quaternion.FromEulerAngles(Math.PI, Math.PI/2, 0);
    const arms_r = BABYLON.Quaternion.FromEulerAngles(Math.PI, -Math.PI/2, 0);

    //convert to local quats by accounting for parent bone rotations
    //-----------------------------------------------------------------------------------------------
    let torso_l = computeLocalQuat(hip_q, torso_q);
    let head_l = computeLocalQuat(torso_q, head_q);

    let l_shoulder_g = torso_q.multiply(OFFSETS.l_shoulder);
    let r_shoulder_g = torso_q.multiply(OFFSETS.r_shoulder);

    let l_leg_upper_l = computeLocalQuat(hip_q, l_leg_upper_q.multiply(legs));
    let l_leg_lower_l = computeLocalQuat(l_leg_upper_q.multiply(legs), l_leg_lower_q.multiply(legs));
    let l_foot_l = computeLocalQuat(l_leg_lower_q, l_foot_q.multiply(feet));   

    let r_leg_upper_l = computeLocalQuat(hip_q, r_leg_upper_q.multiply(legs));
    let r_leg_lower_l = computeLocalQuat(r_leg_upper_q.multiply(legs), r_leg_lower_q.multiply(legs));
    let r_foot_l = computeLocalQuat(r_leg_lower_q, r_foot_q.multiply(feet));  

    let l_arm_upper_l = computeLocalQuat(l_shoulder_g, l_arm_upper_q.multiply(arms_l));
    let l_arm_lower_l = computeLocalQuat(l_arm_upper_q.multiply(arms_l), l_arm_lower_q.multiply(arms_l));
    let l_hand_l = computeLocalQuat(l_arm_lower_q.multiply(arms_l), l_hand_q.multiply(arms_l));

    let r_arm_upper_l = computeLocalQuat(r_shoulder_g, r_arm_upper_q.multiply(arms_r));
    let r_arm_lower_l = computeLocalQuat(r_arm_upper_q.multiply(arms_r), r_arm_lower_q.multiply(arms_r ));
    let r_hand_l = computeLocalQuat(r_arm_lower_q.multiply(arms_r ), r_hand_q.multiply(arms_r ));

    //Apply swing twist limiting

    function debugQuat_xy(label, q, twistAxis, maxForwardX, maxBackwardX, maxOutwardY, maxInwardY, maxTwistRad, twistRestAngle = 0) {
        q.normalize();

        const { swing, twist } = swingTwistDecompose(q, twistAxis);

        const clampedSwing = clampSwingEllipse(swing, maxForwardX, maxBackwardX, maxOutwardY, maxInwardY);
        const swingDeg = 2 * Math.acos(Math.min(1, Math.abs(clampedSwing.w))) * (180 / Math.PI);

        // Apply same rest correction as limitSwingTwist
        const restCorrection = BABYLON.Quaternion.RotationAxis(twistAxis, -twistRestAngle);
        const twistRelative = twist.multiply(restCorrection);
        const clampedRelative = clampQuatAngle(twistRelative, maxTwistRad);
        const clampedTwist = BABYLON.Quaternion.Inverse(restCorrection).multiply(clampedRelative);

        const twistDeg = 2 * Math.acos(Math.min(1, Math.abs(clampedTwist.w))) * (180 / Math.PI);

        const sinHalf = Math.sin(swingDeg * DEG / 2);
        const swingX = sinHalf > 1e-6 ? (clampedSwing.x / sinHalf) * swingDeg : 0;
        const swingY = sinHalf > 1e-6 ? (clampedSwing.y / sinHalf) * swingDeg : 0;

        console.log(`${label} — swing: ${swingDeg.toFixed(1)}° (x:${swingX.toFixed(1)}° y:${swingY.toFixed(1)}°)  twist: ${twistDeg.toFixed(1)}°`);
    }
    //-----------------------------------------------------------------------------------------------
    const DEG = Math.PI / 180;

    // --- Torso / Head ---

    //debugQuat_xy("head", head_l, BABYLON.Vector3.Forward(), 70*DEG, 70*DEG, 70*DEG, 70*DEG, 90*DEG);
    // debugQuat_xy("torso", torso_l, BABYLON.Vector3.Forward(), 70*DEG, 70*DEG, 70*DEG, 70*DEG, 90*DEG);
    torso_l = limitSwingTwist(torso_l, BABYLON.Vector3.Up(), 70*DEG, 70*DEG, 70*DEG, 70*DEG, 90*DEG);
    head_l  = limitSwingTwist(head_l,  BABYLON.Vector3.Up(), 70*DEG, 70*DEG, 70*DEG, 70*DEG, 90*DEG);

    // // --- Arms (upper): more freedom forward/back than side-to-side ---
    //debugQuat_xy("l_arm_upper", l_arm_upper_l, BABYLON.Vector3.Forward(), 360*DEG, 360*DEG, 360*DEG, 360*DEG, 90*DEG);
    //debugQuat_xy("r_arm_upper", r_arm_upper_l, BABYLON.Vector3.Forward(), 360*DEG, 360*DEG, 360*DEG, 360*DEG, 90*DEG);
    l_arm_upper_l = limitSwingTwist(l_arm_upper_l, BABYLON.Vector3.Forward(), 360*DEG, 360*DEG, 360*DEG, 360*DEG, 90*DEG);
    r_arm_upper_l = limitSwingTwist(r_arm_upper_l, BABYLON.Vector3.Forward(), 360*DEG, 360*DEG, 360*DEG, 360*DEG, 90*DEG);

    // // --- Forearms: hinge-like, very tight swing ---
    debugQuat_xy("l_arm_lower", l_arm_lower_l, new BABYLON.Vector3.Forward(), 180*DEG, 180*DEG, 180*DEG, 180*DEG, 180*DEG);
    debugQuat_xy("r_arm_lower", r_arm_lower_l, new BABYLON.Vector3.Forward(), 180*DEG, 180*DEG, 180*DEG, 180*DEG, 180*DEG);
    l_arm_lower_l = limitSwingTwist(l_arm_lower_l, new BABYLON.Vector3.Forward(), 180*DEG, 180*DEG, 180*DEG, 180*DEG, 180*DEG);
    r_arm_lower_l = limitSwingTwist(r_arm_lower_l, new BABYLON.Vector3.Forward(), 180*DEG, 180*DEG, 180*DEG, 180*DEG, 180*DEG);

    // // --- Hands: more flex/extend than side deviation ---

    // // debugQuat_xy("l_hand", l_hand_l, BABYLON.Vector3.Forward());
    // // debugQuat_xy("r_hand", r_hand_l, BABYLON.Vector3.Forward());
    // l_hand_l = limitSwingTwist(l_hand_l, BABYLON.Vector3.Right(), 60*DEG, 30*DEG, 20*DEG);
    // r_hand_l = limitSwingTwist(r_hand_l, BABYLON.Vector3.Right(), 60*DEG, 30*DEG, 20*DEG);

    // --- Legs (upper): more forward/back than abduction ---
    //debugQuat_xy("l_leg_upper", l_leg_upper_l, BABYLON.Vector3.Forward(), 90*DEG, 90*DEG, 30*DEG, 30*DEG, 45*DEG, 180*DEG);
    //debugQuat_xy("r_leg_upper", r_leg_upper_l, BABYLON.Vector3.Forward(), 90*DEG, 90*DEG, 30*DEG, 30*DEG, 45*DEG, 180*DEG);
    l_leg_upper_l = limitSwingTwist(l_leg_upper_l, BABYLON.Vector3.Forward(), 90*DEG, 90*DEG, 30*DEG, 30*DEG, 45*DEG, 180*DEG);
    r_leg_upper_l = limitSwingTwist(r_leg_upper_l, BABYLON.Vector3.Forward(), 90*DEG, 90*DEG, 30*DEG, 30*DEG, 45*DEG, 180*DEG);

    // --- Knees: pure hinge, almost no side swing ---
    //debugQuat_xy("l_leg_lower", l_leg_lower_l, BABYLON.Vector3.Forward(), 1*DEG, 180*DEG, 10*DEG, 10*DEG, 20*DEG);
    //debugQuat_xy("r_leg_lower", r_leg_lower_l, BABYLON.Vector3.Forward(), 1*DEG, 180*DEG, 10*DEG, 10*DEG, 20*DEG);
    l_leg_lower_l = limitSwingTwist(l_leg_lower_l, BABYLON.Vector3.Forward(), 1*DEG, 180*DEG, 30*DEG, 30*DEG, 20*DEG);
    r_leg_lower_l = limitSwingTwist(r_leg_lower_l, BABYLON.Vector3.Forward(), 1*DEG, 180*DEG, 30*DEG, 30*DEG, 20*DEG);

    // --- Feet: more up/down than side tilt ---
    // debugQuat_xy("l_foot", l_foot_l, BABYLON.Vector3.Forward(), 1*DEG, 180*DEG, 30*DEG, 30*DEG, 20*DEG);
    // debugQuat_xy("r_foot", r_foot_l, BABYLON.Vector3.Forward(), 1*DEG, 180*DEG, 30*DEG, 30*DEG, 20*DEG);
    l_foot_l = limitSwingTwist(l_foot_l, BABYLON.Vector3.Forward(), 90*DEG, 90*DEG, 30*DEG, 30*DEG, 20*DEG);
    r_foot_l = limitSwingTwist(r_foot_l, BABYLON.Vector3.Forward(), 90*DEG, 90*DEG, 30*DEG, 30*DEG, 20*DEG);

    //apply quaternions to skeleton bones
    //-----------------------------------------------------------------------------------------------
    skeleton.bones[0].getTransformNode().rotationQuaternion = hip_q;
    skeleton.bones[3].getTransformNode().rotationQuaternion = torso_l;
    skeleton.bones[5].getTransformNode().rotationQuaternion = head_l;  

    //skeleton.bones[9].getTransformNode().rotationQuaternion = OFFSETS.l_shoulder;
    skeleton.bones[10].getTransformNode().rotationQuaternion = l_arm_upper_l;
    skeleton.bones[11].getTransformNode().rotationQuaternion = l_arm_lower_l;
    skeleton.bones[12].getTransformNode().rotationQuaternion = l_hand_l;

    //skeleton.bones[33].getTransformNode().rotationQuaternion = OFFSETS.r_shoulder;
    skeleton.bones[34].getTransformNode().rotationQuaternion = r_arm_upper_l;
    skeleton.bones[35].getTransformNode().rotationQuaternion = r_arm_lower_l;
    skeleton.bones[36].getTransformNode().rotationQuaternion = r_hand_l;

    skeleton.bones[62].getTransformNode().rotationQuaternion = r_leg_upper_l;
    skeleton.bones[63].getTransformNode().rotationQuaternion = r_leg_lower_l;
    skeleton.bones[64].getTransformNode().rotationQuaternion = r_foot_l;

    skeleton.bones[57].getTransformNode().rotationQuaternion = l_leg_upper_l;
    skeleton.bones[58].getTransformNode().rotationQuaternion = l_leg_lower_l;
    skeleton.bones[59].getTransformNode().rotationQuaternion = l_foot_l;

    return skeleton
}
