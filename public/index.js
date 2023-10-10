import * as THREE from "/three";
import {OrbitControls} from "/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from '/three/examples/jsm/loaders/GLTFLoader.js';
const scene = new THREE.Scene(); 
const moveX=60; const moveZ=100;
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
//sphere object
/*
const geometry = new THREE.TorusGeometry( 5, 3, 16, 50 ); 
const material = new THREE.MeshStandardMaterial({
    color: "#fac802",
    roughness: 0.5
});
const mesh = new THREE.Mesh(geometry,material); 
scene.add(mesh); */

//load objects
let models = [];
let modelRotation = [];
let modelSetRotation = [];
let anim = [];
let sceneYLock = [];
let curScene = 0; 

//scene 1
sceneYLock.push(true); 
//title
const GLTFloader = new GLTFLoader();
GLTFloader.load( 'https://roelyoon.github.io/Portfolio/3DModels/portTitle.glb', function ( gltf ) {
	gltf.scene.position.x-=9;
    gltf.scene.position.y+=4;
    gltf.scene.scale.set(5,5,5);
    gltf.scene.rotateX(Math.PI/3);

    models.push(gltf.scene);
    modelRotation.push(new THREE.Vector3(0,0,0));
    modelSetRotation.push(new THREE.Vector3(gltf.scene.rotation.x,gltf.scene.rotation.y,gltf.scene.rotation.z));
    anim.push(function(){});
    scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

//color-changing panel
let id = 1; 
let panelColor = 0;
let panelChange = 50;
const panelGeometry = new THREE.BoxGeometry( 5, 5, 1 ); 
const panelMaterial = new THREE.MeshBasicMaterial( {color: 'red'} ); 
const panel = new THREE.Mesh( panelGeometry, panelMaterial ); 
panel.position.set(0+moveX*id,7,0+moveZ*id);
panel.rotateZ(0.78);
models.push(panel);
modelRotation.push(new THREE.Vector3(0,0.01,0));
anim.push(function(id){
    if(panelColor == 0){
        models[id].material.color.lerp(new THREE.Color('red'),0.15);
    }else if(panelColor==1){
        models[id].material.color.lerp(new THREE.Color('green'),0.15);
    }else if(panelColor==2){
        models[id].material.color.lerp(new THREE.Color('blue'),0.15);
    }else if(panelColor==3){
        models[id].material.color.lerp(new THREE.Color('green'),0.15);
    }
    if(panelChange<=0){
        panelColor=(panelColor+1)%4;
        panelChange=50;
    }else{
        panelChange--;
    }
});
scene.add( panel );

function addSprite(ratioWidth,ratioHeight,scaleFactor,id,xOffset,yOffset,zOffset,textureResource){
    const texture = new THREE.TextureLoader().load( textureResource ); 
    texture.colorSpace = THREE.SRGBColorSpace; 
    const material = new THREE.SpriteMaterial( { map:  texture} );
    const sprite = new THREE.Sprite( material );
    sprite.position.set(moveX*id+xOffset,0+yOffset,moveZ*id+zOffset);
    sprite.scale.set(ratioWidth*scaleFactor,ratioHeight*scaleFactor,1);
    scene.add( sprite );
}

//scene 2
sceneYLock.push(false);
//programming challenge 1 title
addSprite(1248,200,1/60,id,0,0,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 1/title.png');
/*
let ratioWidth = 1248;
let ratioHeight = 200; 
let scaleFactor = 1/60;
const pc1TitleTexture = new THREE.TextureLoader().load( 'https://roelyoon.github.io/Portfolio/Challenges/Challenge 1/title.png' ); 
pc1TitleTexture.colorSpace = THREE.SRGBColorSpace; 
const pc1TitleMaterial = new THREE.SpriteMaterial( { map:  pc1TitleTexture} );
const pc1Title = new THREE.Sprite( pc1TitleMaterial );
pc1Title.position.set(moveX*id,0,moveZ*id);
pc1Title.scale.set(ratioWidth*scaleFactor,ratioHeight*scaleFactor,1);
scene.add( pc1Title );*/

//maincode sprite
addSprite(377,662,1/40,id,0,-15,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 1/main.png');
/*
ratioWidth = 377
ratioHeight = 662
scaleFactor = 1/40
const mainCode1Texture = new THREE.TextureLoader().load( 'https://roelyoon.github.io/Portfolio/Challenges/Challenge 1/main.png' );
mainCode1Texture.colorSpace = THREE.SRGBColorSpace; 
const mainCode1Material = new THREE.SpriteMaterial( { map: mainCode1Texture} );
const mainCode1 = new THREE.Sprite( mainCode1Material );
mainCode1.position.set(moveX*id,-15,moveZ*id);
mainCode1.scale.set(ratioWidth*scaleFactor,ratioHeight*scaleFactor,1);
scene.add( mainCode1 );*/

//description
addSprite(1162,214,1/60,id,0,-3,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 1/description.png');
/*
ratioWidth = 1248;
ratioHeight = 200; 
scaleFactor = 1/60;
const desc1Texture = new THREE.TextureLoader().load( 'https://roelyoon.github.io/Portfolio/Challenges/Challenge 1/title.png' ); 
desc1Texture.colorSpace = THREE.SRGBColorSpace; 
const desc1Material = new THREE.SpriteMaterial( { map:  desc1Texture} );
const desc1 = new THREE.Sprite( desc1Material );
desc1.position.set(moveX*id,0,moveZ*id);
desc1.scale.set(ratioWidth*scaleFactor,ratioHeight*scaleFactor,1);
scene.add( desc1 );*/



//light
const titleBackPLight = new THREE.PointLight(0xffffff,5000);
const titleTopLight = new THREE.PointLight(0xffffff,50000);
titleBackPLight.position.set(0,-2,-4); 
titleTopLight.position.set(0,10,4); 
const hLight = new THREE.HemisphereLight( 0xffffff, 0x080820, 50000);
const amblight = new THREE.AmbientLight(0xffffff,1);
scene.add(titleBackPLight,titleTopLight,amblight); 


//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height);
camera.position.z = 30; 
scene.add(camera); 

const canvas  = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas }); 
renderer.setSize(sizes.width,sizes.height); 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene,camera); 

const controls = new OrbitControls(camera,canvas);
controls.enableDamping=true;
controls.enablePan = false;
controls.enableZoom = false; 
controls.target.x=0;controls.target.y=0;controls.target.z=29.99;

//skybox
const skyBoxInd = 1; //for randomization later when more skyboxes
scene.background = new THREE.CubeTextureLoader()
.setPath( 'https://roelyoon.github.io/Portfolio/Textures/Skybox/' )
.load( [
            `px${skyBoxInd}.png`, //left
            `nx${skyBoxInd}.png`, //right
            `py${skyBoxInd}.png`, //top
            `ny${skyBoxInd}.png`, //down
            `pz${skyBoxInd}.png`, //center
            `nz${skyBoxInd}.png` //back
        ] );

//sprite 
/*
const RASpriteMaterial = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( 'https://roelyoon.github.io/Portfolio/Sprites/rightArrow.png' ) } );
const LASpriteMaterial = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( 'https://roelyoon.github.io/Portfolio/Sprites/leftArrow.png' ) } );
const rightArrow = new THREE.Sprite( RASpriteMaterial );
const leftArrow = new THREE.Sprite( LASpriteMaterial );
scene.add( leftArrow );
scene.add( rightArrow );*/

//functions
const targetCameraPos = new THREE.Vector3( 0, 0, 30 );
const targetOrbitPos = new THREE.Vector3( 0, 0, 29.99 );
let lerpFrames = 0;
function leftArrClick(){
    if(curScene!=0){
        curScene--;
        targetCameraPos.x-=moveX; 
        targetCameraPos.y = 0; 
        targetCameraPos.z-=moveZ; 
        targetOrbitPos.x-=moveX; 
        targetOrbitPos.y = 0;
        targetOrbitPos.z-=moveZ;
        lerpFrames=60;
    }
}
function rightArrClick(){
    if(curScene!=1){
        curScene++;
        targetCameraPos.x+=moveX;
        targetCameraPos.y = 0; 
        targetCameraPos.z+=moveZ;
        targetOrbitPos.x+=moveX;
        targetOrbitPos.y = 0;
        targetOrbitPos.z+=moveZ; 
        lerpFrames=60;
    }
}

document.getElementById("leftArrow").onclick = leftArrClick;
document.getElementById("rightArrow").onclick = rightArrClick;

window.addEventListener('resize', ()=>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width,sizes.height);
})
  window.addEventListener("wheel", function(e) {
    if(!sceneYLock[curScene]){
        let isTouchPad = e.wheelDeltaY ? e.wheelDeltaY === -3 * e.deltaY : e.deltaMode === 0
        //let dY = isTouchPad?e.deltaY : e.wheelDeltaY * (-1); 
        let d = (Math.abs(e.deltaY)>5 ? (e.deltaY > 0)?5:-5 : e.deltaY)*(isTouchPad?3/4:2); 
        targetCameraPos.y=camera.position.y;
        controls.reset;
        targetOrbitPos.y=controls.target.y; 
        targetCameraPos.y-=d; 
        targetOrbitPos.y-=d;
        lerpFrames=2;
    }
    // code to increment object.position.z 
  }, true);
/*
document.body.addEventListener('keypress',(keyEvent)=>{
    let direction = new THREE.Vector3();
    camera.getWorldDirection( direction );
    let m = 2; 
    switch(keyEvent.key.toLowerCase()){
        case "w":
            camera.position.lerp( direction.multiplyScalar(m),0.1);
            break;
        case "s":
            camera.position.lerp( direction.multiplyScalar(-m),0.1);
            break;
    }
});*/

const loop = ()=>{
    if(lerpFrames>0){
        camera.position.lerp(targetCameraPos,0.1);
        controls.target.lerp(targetOrbitPos,0.1);
        lerpFrames--;
        if(camera.position==controls.target){
            controls.target.z+=-0.01;
        }
    }
    for(let i = 0; i < models.length; i++){
        models[i].rotation.x+=modelRotation[i].x; 
        models[i].rotation.y+=modelRotation[i].y; 
        models[i].rotation.z+=modelRotation[i].z; 
        anim[i](i);
    }
    controls.update(); 
    renderer.render(scene,camera); 
    window.requestAnimationFrame(loop); 
}

loop();