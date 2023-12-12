function setup_lights(scene){
    // var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(2,1.6,-1), scene);
    // light.intesity = 100;
    // // env =  scene.createDefaultEnvironment();
    // // env.setMainColor(new BABYLON.Color3(0.112,0.638,0.356)); 
    // // env.setMainColor(new BABYLON.Color3(1,1,1)); 
    // var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(-2,1.6,-1), scene);
    // var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0,1.6,-2), scene);
    // //var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1,-5), scene);
    // var pointLight1 = new BABYLON.PointLight("pointLight1", new BABYLON.Vector3(0, 2, -1), scene);
    // var pointLight2 = new BABYLON.PointLight("pointLight2", new BABYLON.Vector3(1, 1, 1), scene);
    // var pointLight3 = new BABYLON.PointLight("pointLight3", new BABYLON.Vector3(-50, 1, 1), scene);

    // // Set light intensity and color for each point light
    // pointLight3.intensity = 1;
    // pointLight1.diffuse = new BABYLON.Color3(1, 1, 1);
    
    // Set light intensity and color for each point light
    //pointLight3.intensity = 1;
    //pointLight1.diffuse = new BABYLON.Color3(1, 1, 1);
    var hemiLight1 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1,0), scene);
    hemiLight1.intensity = 0.25;
    // var spotLight1 = new BABYLON.SpotLight("spotLight1", new BABYLON.Vector3(1, 1.7, -0.5),new BABYLON.Vector3(0, 0,1), Math.PI *2, 2, scene);
    // var spotLight2 = new BABYLON.SpotLight("spotLight2", new BABYLON.Vector3(1, 1.7, 0),new BABYLON.Vector3(-0.5,-0.5,-0.5), Math.PI , 2, scene);
    // var spotLight3 = new BABYLON.SpotLight("spotLight3", new BABYLON.Vector3(-0,2,-0.5),new BABYLON.Vector3(0, 0, 1), Math.PI *2, 2, scene);
    // spotLight1.intensity = 4;
    // spotLight2.intensity = 4;
    // spotLight3.intensity = 1;
    // const light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);

    // var spotLight1 = new BABYLON.SpotLight("spotLight1", new BABYLON.Vector3(2, 4, 2),  new BABYLON.Vector3(0, -1,0), Math.PI *2/3, 2, scene);
    // var spotLight2 = new BABYLON.SpotLight("spotLight2", new BABYLON.Vector3(-2, 4, 2), new BABYLON.Vector3(0, -1,0), Math.PI *2/3, 2, scene);
    // var spotLight3 = new BABYLON.SpotLight("spotLight3", new BABYLON.Vector3(2, 4, -2), new BABYLON.Vector3(0, -1,0), Math.PI *2/3, 2, scene);
    // var spotLight4 = new BABYLON.SpotLight("spotLight4", new BABYLON.Vector3(-2, 4, -2),new BABYLON.Vector3(0, -1,0), Math.PI *2/3, 2, scene);
    var spotLight5 = new BABYLON.SpotLight("spotLight5", new BABYLON.Vector3(0, 3, 2), new BABYLON.Vector3(0, -1,0), Math.PI *4/5, scene);
    var spotLight6 = new BABYLON.SpotLight("spotLight6", new BABYLON.Vector3(0, 3, -2), new BABYLON.Vector3(0, -1,0), Math.PI *4/5, 2, scene);
    // var spotLight7 = new BABYLON.SpotLight("spotLight7", new BABYLON.Vector3(0, 1.8, 2), new BABYLON.Vector3(0, 1,0), Math.PI, scene);
    // var spotLight8 = new BABYLON.SpotLight("spotLight8", new BABYLON.Vector3(0, 1.8, -2), new BABYLON.Vector3(0, 1,0), Math.PI, 2, scene);
    // spotLight1.intensity = 10;
    // spotLight2.intensity = 10;
    // spotLight3.intensity = 10;
    // spotLight4.intensity = 10;
    spotLight5.intensity = 25;
    spotLight6.intensity = 50;
    // spotLight5.intensity = 10;
    // spotLight6.intensity = 10;
    // const light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, 1, 0), scene);
    scene.requestRotations = requestRotations;

}