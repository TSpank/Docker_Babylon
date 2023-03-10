
var Animations = (function() {
    var _animations;
    var privateVariable = 'This variable is private and cannot be accessed from outside the module.';
  
    function privateFunction() {
      console.log(privateVariable);
    }
  
    return {
      publicVariable: 'This variable is public and can be accessed from outside the module.',
      printText: function() {
        console.log(printText);
      },
      Text: function() {
        return privateVariable;
      },
      loadAnimations: function(animations)
      {
        let data = {};
        // for (let key in animations) {
        //     let frames = animations[key];
        //     data[key] = {};
        //     for (let frame in frames) {
        //         let bones = frames[frame];
        //         for (let bone in bones) {
        //             if (!data[key][bone]) {
        //                 data[key][bone] = {};
        //             }
        //             let q = bones[bone];
        //             data[key][bone][frame] = q;                        
        //         }
        //     }
        // }    
        for (let key in animations) {
            let bones = animations[key];
            data[key] = {};
            for (let bone in bones) {
                data[key][bone] = {};
                let frames = bones[bone];
                for (let frame in frames) {
                    let q = bones[bone][frame];
                    data[key][bone][frame] = q;                        
                }
            }
        }           
        _animations = data;
        return _animations;
      },
      getAnimations: function()
      {
        return _animations;
      },
      print: function (){
        for (let k in _animations)
        {
            console.log(k);
            for (let l in _animations[k])
            {
                // console.log(k + " - " + l);
                for (let b in _animations[k][l])
                {
                    console.log(k + " - " + l + " : " + b);
                }
            }
        }
      },
      animate: function (scene){
        var skeleton = scene.getSkeletonByName("Armature");
        //var root =  scene.getMeshByName('__root__');
        //console.log(skeleton);
        for (let key in _animations)
        {
            var animationGroup = new BABYLON.AnimationGroup(key);
            for (let bone in _animations[key])
            {                
                try{
                    var index;
                    if (bone == "Bone"){
                        index = skeleton.getBoneIndexByName("Head");
                    } else
                    {
                        index = skeleton.getBoneIndexByName(bone);
                    }
                    var bone_pose = skeleton.bones[index].getRotationQuaternion();
                    var keyFrames = [];
                    for (let _frame  in _animations[key][bone])
                    {
                        var q = _animations[key][bone][_frame];
                        var _q = new BABYLON.Quaternion(q[1],q[2],q[3],q[0]);
                        keyFrames.push({
                            frame: parseInt(_frame),
                            value: bone_pose.multiply(_q)
                        })
                    }
                    var animation = new BABYLON.Animation("animation"+index, "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION , BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                    animation.setKeys(keyFrames);
                    animationGroup.addTargetedAnimation(animation,skeleton.bones[index].getTransformNode());
                    } catch (err)
                {
                    console.log(key,bone,index);
                }
            }
        }
      }


    };
  })();