
var currentAvatarUrl = "avatar.glb";
var avatarAnimationData = ""
var avatarUrl = "";
var avatarLoaded = false;

function ShowAvatar(id, show) {
    scene.meshes.forEach((m) => { if (m.skeleton != null && m.skeleton.id == id) { m.isVisible = show } });
}

function ScaleAvatar(id, scale) {
    scene.meshes.forEach((m) => { if (m.skeleton != null && m.skeleton.id == id) { m.scaling = new BABYLON.Vector3(scale, scale, scale); } });
}

function DisposeAvatar(id) {
    try {
        scene.getSkeletonById(id).dispose();
    }
    catch (e) {
        console.log("Skeleton not found: " + e.error);
    }
}


function loadAvatarUrl(objDataURL) {
    if (objDataURL == null) {
        objDataURL = currentAvatarUrl;
    }
    else {
        currentAvatarUrl = objDataURL;
    }

    console.log("Loading " + objDataURL);
    BABYLON.SceneLoader.ImportMesh('', '', objDataURL, scene, function (meshes, particleSystems, skeletons) {
        skeletons[0].id = "Primary";
        skeleton = skeletons[0]

        _y = scene.getMeshByName('Wolf3D_Head').getBoundingInfo().boundingBox.center.y;
        meshes[0].rotationQuaternion = null;

        avatarLoaded = true;

        try {
            window.webkit.messageHandlers.contentReadyMessage.postMessage({
                "message": meshReady
            })
            iOS_Platform = true;
            //iOS_request = true;
        } catch {
            console.log("Not iOS");
            //iOS_request = false;
            iOS_Platform = false;
        }

        if (debuglayer == true) {
            scene.debugLayer.show();
        }

        if (avatarAnimationData != "") {
            Process_json(avatarAnimationData);
            avatarAnimationData = "";
        }
    }, undefined, undefined, ".glb");
    return _y;
}

function isAvatarLoaded() {
    return avatarLoaded;
}
