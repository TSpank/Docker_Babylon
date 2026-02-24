

function stopAllAnimationsByTarget (scene, target)
{
    var animatables = scene.getAllAnimatablesByTarget(target);
    for (let i = 0; i < animatables.length; i++)
    {
        animatables[i].stop();
    }
}

function stopAllAnimationsByGroupName (groupName)
{
    var group = scene.getAnimationGroupByName(groupName);
    group.stop();
}




var Animations = (function() {
    var _animations;
    var animation_idx;
    var privateVariable = 'This variable is private and cannot be accessed from outside the module.';
  
    function privateFunction() {
              console.log(privateVariable);
    }

    function getAnimationName(item)
    {
      return item.name;
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
      getAnimationNames: function()
      {
        animation_idx = 0;
        const names = scene.animationGroups.map(getAnimationName);
        return names;
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
        // skeleton.returnToRest(true);
        // scene.render();
        
        //var root =  scene.getMeshByName('__root__');
        //console.log(skeleton);
        for (let key in _animations)
        {
            var oldAnimation = scene.getAnimationGroupByName(key);
            if (oldAnimation != null)
            {
              oldAnimation.dispose();
            }
            var animationGroup = new BABYLON.AnimationGroup(key);
            // animationGroup.
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
                    // var animation = new BABYLON.Animation("animation"+index, "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION , ANIMATIONLOOPMODE_CONSTANT );
                    animation.setKeys(keyFrames);
                    // animation.onAnimationGroupEndObservable.addOnce( () => {
                    //   console.log("All animations in the group have ended.");
                    //   animation.dispose();
                    // });
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