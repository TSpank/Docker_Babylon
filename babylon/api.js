function Process_json(rotationValues)
    try{
        let values = {};
        try{
            json_data = JSON.parse(rotationValues);
            rotationValues = "{}";
                
            if (typeof(json_data['animation']) != "undefined")
            {	
                if (typeof(json_data['animation']['config']) != "undefined")
                {
                    let pose_data = JSON.parse("{ \"pose\": {  \"theta_torso_pitch_r\" : \"0.0\",  \"theta_torso_bend_r\" : \"0.0\",  \"theta_torso_yaw_r\" : \"0.0\", \"theta_torso_roll_r\" : \"0.0\",  \"theta_torso_tilt_r\" : \"0.0\",  \"theta_head_pitch_h\" : \"0.0\",  \"theta_head_yaw_h\" : \"0.0\",  \"theta_head_roll_h\" : \"0.0\",  \"theta_armright_upper_alpha\" : \"0.0\", \"theta_armright_upper_beta\" : \"0.0\",  \"theta_armright_upper_gamma\" : \"0.0\",  \"theta_armright_lower_alpha\" : \"0.0\",  \"theta_armright_lower_beta\" : \"0.0\",  \"theta_armright_lower_gamma\" : \"0.0\",  \"theta_armright_elbow\" : \"0.0\",  \"theta_armleft_upper_alpha\" : \"0.0\",  \"theta_armleft_upper_alpha\" : \"0.0\",  \"theta_armleft_upper_beta\" : \"0.0\",  \"theta_armleft_upper_gamma\" : \"0.0\",  \"theta_armleft_lower_alpha\" : \"0.0\",  \"theta_armleft_lower_beta\" : \"0.0\",  \"theta_armleft_lower_gamma\" : \"0.0\",  \"theta_armleft_elbow\" : \"0.0\"} }");
                    values = pose_data['pose'];
                    parse_data(scene.getSkeletonByName("Armature"),values);
                    //console.log(json_data['animation']['config']);
                    animations = json_data['animation']['config'];
                    Animations.loadAnimations(animations);
                    Animations.animate(scene);
                    scene.getAnimationGroupByName("All Reset both").start(false, 1.0,0,1, false );
                }
                if (typeof(json_data['animation']['list']) != "undefined")
                {
                    const animation_list = scene.animationGroups.map(function(item){ return item.name;}); 
                }
            }
            if (typeof(json_data['camera']) != "undefined")
            {
                let cam_pos = json_data['camera']['position'];
                let cam_target = json_data['camera']['target'];
                // console.log(cam_pos,cam_target);
                camera_dummy.position = new BABYLON.Vector3(cam_pos[0],cam_pos[1],cam_pos[2]);
                camera_dummy.setTarget(new BABYLON.Vector3(cam_target[0],cam_target[1],cam_target[2]));
                camera_dynamic = camera_dummy;
                camera_animation = json_data['camera']['animation']
                if (camera_animation == false)
                {
                    steps_perc = 1.0;
                } else
                {
                    steps_perc = 0.0;
                }
            }
            if (typeof(json_data['pose']) != "undefined")
            {
                values = json_data['pose'];
                parse_data(scene.getSkeletonByName("Armature"),values);
            }
            if (typeof(json_data['control']) != "undefined")
            {
                var cntrl = json_data['control'];
                var animation_name;
                if (typeof(cntrl['animation']) != "undefined")
                {
                    animation_name = cntrl['animation'];
                } else
                {
                    animation_name = "All Reset both";
                }
                
                var animation_command = cntrl['command'];
                if (animation_command == "play")
                {
                    scene.getAnimationGroupByName(animation_name).start(false, 1.0,0,1, false );
                } else if (animation_command == "stop")
                {
                    scene.animationGroups.map(function(item){ if (item.animatables.length > 0 ) {item.stop(); console.log(item.name + " stopped"); return item.name} else { return "";}});
                } else if (animation_command == "active")
                {
                    var active_animation = false;
                    scene.animationGroups.map(function(item){ if (item.animatables.length > 0 ) { active_animation = true;}});
                }
            }
        } catch (err)
        {
            
        }
        
        if(typeof(values['camera_position']) != "undefined")
        {
            camera_dummy.position = new BABYLON.Vector3();
            camera_dummy.position.x = values['camera_position'][0];
            camera_dummy.position.y = values['camera_position'][1];
            camera_dummy.position.z = values['camera_position'][2];
            steps_perc = 0.0;
        }

        if(typeof(values['camera_target']) != "undefined")
        {
            camera_dummy.setTarget(new BABYLON.Vector3(values['camera_target'][0],values['camera_target'][1],values['camera_target'][2]));
            steps_perc = 0.0;
        }

        //Pan Camera view
        if ( false ) //(camera_dummy.position != camera_dynamic.position )) //|| (camera_dummy.target != camera_dynamic.target ))
        {
            if( steps_perc == 0.0)
            {
                cam_dir = direction(camera_dynamic.position,camera_dummy.position);
                cam_dist = distance(camera_dynamic.position,camera_dummy.position);
                cam_dir_target = direction(camera_dynamic.target,camera_dummy.target);
                cam_start = camera_dynamic.position;
            }
            if ( steps_perc >= 1.0 )
            {
                // camera_dynamic.position = camera_dummy.position;
                // camera_dynamic.target = camera_dummy.target;
                steps_perc = 0.0; // keep variable zero for next slerp	
            } else
            {
                [x0,y0,z0] = [cam_start.x,cam_start.y,cam_start.z];
                [x1,y1,z1] = [cam_dir.x,cam_dir.y,cam_dir.z];
                var new_pos = new BABYLON.Vector3((x1*steps_perc+x0),(y1*steps_perc+y0),(z1*steps_perc+z0))
                var dist = distance(camera_dummy.position,camera_dummy.target);
                var new_pos_dist = distance(new_pos,camera_dummy.target);
                var f = dist/new_pos_dist;
                if (f > 2.){
                    f = dist;
                }
                var new_pos2 = new BABYLON.Vector3(new_pos.x*f,new_pos.y*f,new_pos.z);
                camera_dynamic.position = new_pos2;
                steps_perc +=0.01;		
            }
        } else {
            steps_perc = 0.0; // keep variable zero for next slerp									
        }

        scene.activeCamera = camera_dynamic;		
    } catch(err) {
        console.log(err.message);
    }