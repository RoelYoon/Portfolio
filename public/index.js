import * as THREE from "/three";
import {OrbitControls} from "/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from '/three/examples/jsm/loaders/GLTFLoader.js';
import {Interaction} from './interaction.js';
function abs(n){
    return n<0?-1*n:n;
}
const scene = new THREE.Scene(); 
const moveX=80; const moveZ=100;
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height);
camera.position.z = 30; 
scene.add(camera); 
//renderer
const canvas  = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas }); 
renderer.setSize(sizes.width,sizes.height); 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene,camera); 

const interaction = new Interaction(renderer, scene, camera);
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
let zero = 9;
let curScene = zero; 

function addSprite(ratioWidth,ratioHeight,scaleFactor,id,xOffset,yOffset,zOffset,textureResource){
    const texture = new THREE.TextureLoader().load( textureResource ); 
    texture.colorSpace = THREE.SRGBColorSpace; 
    const material = new THREE.SpriteMaterial( { map:  texture} );
    const sprite = new THREE.Sprite( material );
    sprite.position.set(moveX*(id<=zero?-1*abs(id-zero):abs(id-zero))+xOffset,0+yOffset,moveZ*(id<=zero?abs(id-zero):abs(id-zero))+zOffset);
    sprite.scale.set(ratioWidth*scaleFactor,ratioHeight*scaleFactor,1);
    scene.add( sprite );
}

const GLTFloader = new GLTFLoader();
/*
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
*/
function addModel(id,xOffset,yOffset,zOffset,scaleFactor,rotationAnim,additionalAnim,additionalFunc,modelResource){
    GLTFloader.load( modelResource, function ( gltf ) {
    gltf.scene.position.x=moveX*(id<=zero?-1*abs(id-zero):abs(id-zero)) + xOffset;
    gltf.scene.position.y=yOffset;
    gltf.scene.position.z=moveZ*(id<=zero?abs(id-zero):abs(id-zero)) + zOffset; 
    gltf.scene.scale.set(scaleFactor,scaleFactor,scaleFactor);
    additionalFunc(gltf);
    models.push(gltf.scene);
    modelRotation.push(rotationAnim);
    modelSetRotation.push(new THREE.Vector3(gltf.scene.rotation.x,gltf.scene.rotation.y,gltf.scene.rotation.z));
    anim.push(additionalAnim);
    scene.add( gltf.scene );
    })
}
let id = 0; 

//scene -9 hidden image
sceneYLock.push(false);

//maincode sprite
addSprite(311,803,1/25,id,0,-5,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 9/s1.png');

//youtube
addModel(id,0,-25,0,1/30,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://youtu.be/cnkVt9Qk9wc");});},'https://roelyoon.github.io/Portfolio/3DModels/youtube.glb');


//scene -8 castle crasher
sceneYLock.push(false);
id++;

//title

//maincode sprite
addSprite(277,899,1/25,id,-10,-10,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 8/main.png');

//move sprite
addSprite(535,283,1/25,id,5,0,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 8/move.png');

//color sprite
addSprite(410,529,1/30,id,5,-17,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 8/color.png');

//initial sprite
addSprite(540,514,1/25,id,0,-42,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 8/initial.png');

//youtube
addModel(id,0,-60,0,1/30,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://youtu.be/a9YWQslez_4");});},'https://roelyoon.github.io/Portfolio/3DModels/youtube.glb');

//scene -7 castle crasher
sceneYLock.push(false);
id++;

//title

//maincode sprite
addSprite(395,632,1/25,id,-7,-10,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 7/main.png');

//move sprite
addSprite(535,95,1/15,id,0,-27,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 7/move.png');

//turn sprite
addSprite(324,532,1/25,id,7,-10,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 7/turn.png');

//print sprite
addSprite(426,536,1/25,id,-10,-42,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 7/print.png');

//auto sprite
addSprite(526,474,1/25,id,8,-42,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 7/auto.png');

//youtube
addModel(id,0,-60,0,1/30,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://youtu.be/C0RLwcDUZ2o");});},'https://roelyoon.github.io/Portfolio/3DModels/youtube.glb');

//scene -6 coral
sceneYLock.push(false);
id++;

//title
addSprite(438,85,1/25,id,0,0,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 6/title.png');

//maincode sprite
addSprite(416,600,1/27,id,-6.1,-13,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 6/main.png');

//s1
addSprite(557,448,1/43,id,6,-7,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 6/s1.png');

//youtube
addModel(id,6,-18.5,0,1/30,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://youtu.be/c8x-gFHnKX8");});},'https://roelyoon.github.io/Portfolio/3DModels/youtube.glb');

//certificate

addSprite(968,681,1/30,id,0,-40,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 6/certificate.png');

//scene -5 disk transport
sceneYLock.push(false);
id++;
//title
addSprite(438,85,1/25,id,0,0,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 5/title.png');

//maincode sprite
addSprite(309,807,1/25,id,-6.5,-18,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 5/code.png');

//s1
addSprite(598,244,1/45,id,6,-7,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 5/s1.png');

//s2
addSprite(628,266,1/46,id,6,-15,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 5/s2.png');

//s3
addSprite(644,210,1/49,id,6,-19,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 5/s3.png');

//youtube
addModel(id,6,-26.5,0,1/30,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://youtu.be/L-NNTbl6dmk");});},'https://roelyoon.github.io/Portfolio/3DModels/youtube.glb');

//scene -4 robot vacuum
sceneYLock.push(false);
id++;

//title
addSprite(438,85,1/25,id,0,0,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 4/title.png');

//maincode sprite
addSprite(387,644,1/25,id,-6.1,-15,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 4/main.png');

//s1
addSprite(669,373,1/45,id,6,-6.7,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 4/s1.png');

//s2
addSprite(668,286,1/46,id,6,-17.6,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 4/s2.png');

//choose sprite
addSprite(235,118,1/6.5,id,0,-37,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 4/choose.png');

//pos sprite
//addSprite(183,245,1/20,id,0,-35,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 4/pos.png');

//s3
addSprite(658,296,1/40,id,0,-51,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 4/s3.png');

//backtrack sprite
addSprite(897,278,1/25,id,0,-61,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 4/backtrack.png');

//s4
addSprite(320,109,1/20,id,0,-70,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 4/s4.png');

//youtube
addModel(id,0,-76,0,1/30,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://youtu.be/nfkg8jZRXZ4");});},'https://roelyoon.github.io/Portfolio/3DModels/youtube.glb');

//scene -3 number grid 
sceneYLock.push(false);
id++;

// title
addSprite(422,54,1/20,id,0,0,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 2/title.png');

//description 
addSprite(580,102,1/25,id,0,-4,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 2/description.png');

//maincode sprite
addSprite(422,404,1/40,id,-6.1,-12,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 2/main.png');

//exaplanation 1
addSprite(444,300,1/50,id,5,-12,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 2/explanation.png');

//traverse
addSprite(212,692,1/20,id,-6.3,-36,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 2/traverse.png');

//explanation 2
addSprite(448,692,1/50,id,5,-25.7,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 2/explanation2.png');

addModel(id,4.7,-37,0,1/30,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://youtu.be/tBt82UaFuO0");});},'https://roelyoon.github.io/Portfolio/3DModels/youtube.glb');


//scene -2 Grid Map Spiral
sceneYLock.push(false);
id++;

//programming challenge 3 title
addSprite(568,111,1/30,id,0,0,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 3/title.png');

//description 
addSprite(568,62,1/25,id,0,-4,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 3/description.png');

//maincode sprite
addSprite(506,664,1/50,id,-6.1,-13,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 3/main.png');

//exaplanation 1
addSprite(446,148,1/50,id,5,-11,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 3/explanation.png');

//drawSpiral() sprite
addSprite(362,692,1/40,id,-6,-30,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 3/drawSpiral.png');

//exaplanation 2
addSprite(458,624,1/50,id,5,-27.2,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 3/explanation2.png');

//drawLayer() sprite
addSprite(568,419,1/50,id,-6,-45,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 3/drawLayer.png');

//exaplanation 3
addSprite(448,322,1/50,id,5,-45,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 3/explanation3.png');

addModel(id,0,-54,0,1/30,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://youtu.be/qKD48ETBLVM");});},'https://roelyoon.github.io/Portfolio/3DModels/youtube.glb');

//scene -1 disk maze
id++;

//color-changing panel
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

/*youtube logo
GLTFloader.load( 'https://roelyoon.github.io/Portfolio/3DModels/youtube.glb', function ( gltf ) {
	gltf.scene.position.x=moveX;
    gltf.scene.position.z=moveZ;
    gltf.scene.position.x+=5;
    gltf.scene.position.y-=17;
    gltf.scene.scale.set(1/30,1/30,1/30);
    models.push(gltf.scene);
    modelRotation.push(new THREE.Vector3(0,0.03,0));
    modelSetRotation.push(new THREE.Vector3(gltf.scene.rotation.x,gltf.scene.rotation.y,gltf.scene.rotation.z));
    anim.push(function(){});
    gltf.scene.on('click',function(ev){window.open("https://www.youtube.com/watch?v=7YWV9jVAKl8");});
    scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );
*/
addModel(id,5,-17,0,1/30,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://www.youtube.com/watch?v=7YWV9jVAKl8");});},'https://roelyoon.github.io/Portfolio/3DModels/youtube.glb');

sceneYLock.push(false);
//programming challenge 1 title
addSprite(1248,200,1/60,id,0,0,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 1/title.png');

//maincode sprite
addSprite(377,662,1/40,id,-5,-13,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 1/main.png');

//description
addSprite(1162,214,1/60,id,0,-3,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 1/description.png');

//explanation
addSprite(688,514,1/60,id,5,-9,0,'https://roelyoon.github.io/Portfolio/Challenges/Challenge 1/explanation.png');

//scene 0 port-title
id++;
sceneYLock.push(true); 
addModel(id,-9,4,0,5,new THREE.Vector3(0,0,0),function(){},function(gltf){gltf.scene.rotateX(Math.PI/3);},'https://roelyoon.github.io/Portfolio/3DModels/portTitle.glb');


//scene 1 clawbot
sceneYLock.push(false);
id++;

//title
addSprite(482,84,1/23,id,0,0,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/title.png');
addSprite(483,69,1/17.5,id,0,-5,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/goal.png');

//subtitle 1
addSprite(476,74,1/20,id,0,-8.5,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/ideate.png');

//s1
addSprite(483,90,1/18,id,0,-13,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/s1.png');

//design blueprint 1
addSprite(483,355,1/15,id,0,-28,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/Prototypes/prototype1.jpeg');

//s2
addSprite(483,41,1/18,id,0,-43,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/s2.png');

//design 2
addSprite(483,355,1/15,id,0,-58,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/Prototypes/prototype2.jpeg');

//s3
addSprite(483,55,1/18,id,0,-73,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/s3.png');

//s4
addSprite(476,75,1/18,id,0,-77,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/s4.png');

//subtitle 2
addSprite(476,96,1/20,id,0,-81,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/build.png');

//s5
addSprite(476,60,1/36,id,-6.5,-84,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/s5.png');

//robot 1
addSprite(476,338,1/20,id,0,-94,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/Robot/robot.jpeg');

//s6
addSprite(568,67,1/21,id,0,-105,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/s6.png');

//robot 2
addSprite(476,504,1/20,id,0,-120,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/Robot/robot bottom.jpeg');

//s7
addSprite(568,86,1/21,id,0,-135.3,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/s7.png');

//robot 3
addSprite(476,504,1/20,id,0,-151,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/Robot/robot close.jpeg');

//s8
addSprite(568,67,1/21,id,0,-166,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/s8.png');

//robot code
addSprite(475,517,1/20,id,0,-181,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/Robot/robotCode.png');

//s9
addSprite(568,110,1/21,id,0,-197.5,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/s9.png');

//s10
addSprite(568,35,1/21.5,id,0,-202,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/s10.png');

//form model
addModel(id,-5,-208,0,1/2,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://docs.google.com/forms/d/1Vj5zRn2x5jyOrFZ3HKxp1Ie5DyuHBQ3D_OlGI-qr6Xk/edit");});},'https://roelyoon.github.io/Portfolio/3DModels/checkmark.glb');
//youtube model
addModel(id,5,-207,0,1/30,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://youtu.be/E9W1SYJOrHU");});},'https://roelyoon.github.io/Portfolio/3DModels/youtube.glb');

//s11
addSprite(568,125,1/21,id,0,-213.5,0,'https://roelyoon.github.io/Portfolio/Images/Unit 1/s11.png');

//scene 2 intro gears
sceneYLock.push(false);
id++;

//title
addSprite(472,102,1/26,id,0,0,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/Introduction/title.png');

//s1
addSprite(696,358,1/28,id,0,-9,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/Introduction/s1.png');

//bike
addSprite(56,34,1/2,id,0,-24.5,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/Introduction/bike.jpeg');

//s2
addSprite(790,316,1/31,id,0,-39,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/Introduction/s2.png');

//car
addSprite(72,41,1/2.5,id,0,-53,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/Introduction/car.jpeg');

//s3
addSprite(783,319,1/32,id,0,-67,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/Introduction/s3.png');

//source 1
addModel(id,-5,-76,0,1/2,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://ilovebicycling.com/how-to-use-bike-gears/");});},'https://roelyoon.github.io/Portfolio/3DModels/checkmark.glb');
//soruce 2
addModel(id,5,-76,0,1/2,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://wuling.id/en/blog/autotips/all-about-car-gears-from-definition-to-functions");});},'https://roelyoon.github.io/Portfolio/3DModels/checkmark.glb');

//video
addModel(id,0,-81.5,0,1/30,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://youtube.com/shorts/ffFYDlkwsvE");});},'https://roelyoon.github.io/Portfolio/3DModels/youtube.glb');

//scene 3 6 bar arm
sceneYLock.push(false);
id++;

//title
addSprite(402,110,1/26,id,0,0,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/title.png');

//s1
addSprite(988,192,1/37,id,0,-5,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/s1.png')

//s2
addSprite(966,106,1/37,id,0,-9,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/s2.png');

//bar image
addSprite(377,136,1/18,id,0,-15.5,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/bar.png');

//s3
addSprite(729,99,1/28,id,0,-22,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/s3.png');

//top img
addSprite(243,334,1/14,id,0,-38,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/top.png');

//side img
addSprite(729,452,1/25,id,0,-62,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/side.png');

//close img
addSprite(3,4,6,id,0,-86,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/close.png');

//s4
addSprite(675,370,1/28,id,0,-106,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/s4.png');

//video
addModel(id,0,-116,0,1/30,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://drive.google.com/file/d/1soxKbMkDJD1lcj4JveznaTjcGZP-4ZD6/view");});},'https://roelyoon.github.io/Portfolio/3DModels/youtube.glb');

//code
addSprite(347,527,1/22,id,0,-133,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/code.png');

//s5
addSprite(729,180,1/28,id,0,-150,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/s5.png');

//s6
addSprite(729,212,1/28,id,0,-158,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/s6.png');

//fixed img
addSprite(567,440,1/28,id,0,-170,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/next.png');

//s7
addSprite(729,155,1/28,id,0,-181.5,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/s7.png');

//source
addModel(id,-5,-189,0,1/2,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://kb.vex.com/hc/en-us/articles/360037389012-Building-V5-Robot-Arms");});},'https://roelyoon.github.io/Portfolio/3DModels/checkmark.glb');

//pros
addModel(id,5,-189,0,1/2,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://pros.cs.purdue.edu/v5/");});},'https://roelyoon.github.io/Portfolio/3DModels/checkmark.glb');

//extra media
addSprite(532,86,1/35,id,0,-194,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/6-Bar/s8.png');
addModel(id,0,-201,0,1/2,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://drive.google.com/drive/folders/1EtHpaarBqEKeAAl05oCAf-ux1Ii6-o6K?usp=sharing");});},'https://roelyoon.github.io/Portfolio/3DModels/checkmark.glb');

//scene 4 autonomous delivery
sceneYLock.push(false);
id++;

//title
addSprite(544,196,1/28,id,0,0,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/Delivery/title.png');

//s1
addSprite(566,94,1/28,id,0,-5,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/Delivery/s1.png');


//link sprite
addModel(id,0,-11,0,1/2,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://docs.google.com/presentation/d/15ty9tlpOofBx4aZwlhjmeZ4wjSpObLwOO3J-z-2RqkM/edit?usp=sharing");});},'https://roelyoon.github.io/Portfolio/3DModels/checkmark.glb');

//scene 5 arcade game
sceneYLock.push(false);
id++;

//title
//addSprite(544,196,1/28,id,0,0,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/Delivery/title.png');

//s1
addSprite(566,94,1/28,id,0,-5,0,'https://roelyoon.github.io/Portfolio/Images/Unit 2/Delivery/s1.png');

//link sprite
addModel(id,0,-11,0,1/2,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://docs.google.com/presentation/d/1MZmHO2u6UVsTgZRNZ-cvZ-2smARZY8B3MaoTj1T9v-4/edit?usp=sharing");});},'https://roelyoon.github.io/Portfolio/3DModels/checkmark.glb');

//scene 6 home project
sceneYLock.push(false);
id++;

var accY = 0;
//title 
addSprite(960,720,1/30,id,0,0,0,'https://docs.google.com/drawings/d/e/2PACX-1vTqYhnrRnFVBKdJf2J1wUsehv2koiulNVVEAsaT6afKwWxAzwMj4G5ZbiFeNWQNh4tA_sb89agNrM8_/pub?w=960&amp;h=720');

//client profile
addSprite(960,720,1/30,id,0,accY-=12,0,'https://docs.google.com/drawings/d/e/2PACX-1vQCUmYar2o_20qKMQ9rv3H3qYZJqHtLAiLiK_YuyOs1YRm4ymsaVgmlyCakGKTP369d81RgBjKg5BD-/pub?w=960&amp;h=720');

//pre-research interview plan doc
addModel(id,-8.5,accY-=6,0,3,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://docs.google.com/document/d/1UsF_CmrMRNP5i4Q1jpuCHyt90Owf2hSltBhd86qJl0M/edit?usp=sharing");});},'https://roelyoon.github.io/Portfolio/3DModels/drive.glb');

//interview results
addSprite(960,720,1/30,id,0,accY-=12,0,'https://docs.google.com/drawings/d/e/2PACX-1vQKr-BHuCik0o3CGFpmlWBQHuFKfXEdw6B26_FdixOBkiNAXmn9xLqkG-eyq8aiJpBpcsf5zpEEumf9/pub?w=960&amp;h=720');

//interview audio
addModel(id,0,accY-=21,0,3,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://drive.google.com/file/d/17hAdfmAu-_UenWBccvk5L8rS82C712A0/view?usp=sharing");});},'https://roelyoon.github.io/Portfolio/3DModels/drive.glb');

//prototype 1
addSprite(973,1866,1/30,id,0,accY-=30,0,'https://docs.google.com/drawings/d/e/2PACX-1vTt09Av1J9cAji_23oag3qzdCRmwjjI5QcQWJnkd2m9gpaahY1GI5XxwcRVJNnJ92jS-53mz3WZEa2R/pub?w=973&amp;h=1866');

//prototype side
addSprite(960,720,1/30,id,0,accY-=43,0,'https://docs.google.com/drawings/d/e/2PACX-1vQcn50AhmpVZ2ad7kqizm3dMnJcTl-CJE-t51SM7frqxRDlulxiNkGpSNAGuJ_7ZdTMuuICqqZ2HimI/pub?w=960&amp;h=720');

//prototype final
addSprite(957,943,1/30,id,0,accY-=28,0,'https://docs.google.com/drawings/d/e/2PACX-1vQ2ciPxxWcGWVr9fkFf1D2SamRdEumgSIQMAHCfbMPVzMW8eWvYQPbgqgkJ-wYs3X07uDhv5IF6oH0P/pub?w=957&amp;h=943');

//source dentist
addModel(id,0,accY-=20,0,1/2,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://www.medicalexpo.com/prod/whip-mix-corporation/product-74510-479299.html");});},'https://roelyoon.github.io/Portfolio/3DModels/checkmark.glb');

//building txt
addSprite(960,720,1/30,id,0,accY-=12,0,'https://docs.google.com/drawings/d/e/2PACX-1vQ5c5W4r6mAAIJTDHt6jSpKo4tbF5x_tOO2I82e3Wgajqcx15ZYK1mUWDouhFTFpqGZ-0nYetNJLmBG/pub?w=960&amp;h=720');

//build 1
addModel(id,-8,accY-=5,0,3,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://drive.google.com/file/d/17k7E6lOo-5I69ALoHU_B08LWVRvxi21Z/view?usp=sharing");});},'https://roelyoon.github.io/Portfolio/3DModels/drive.glb');

//build 2
addModel(id,8,accY,0,3,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://drive.google.com/file/d/17m0XC3JxL6QKvbE85A291JNDrBmKgWtF/view?usp=sharing");});},'https://roelyoon.github.io/Portfolio/3DModels/drive.glb');

//test txt
addSprite(960,720,1/30,id,0,accY-=12,0,'https://docs.google.com/drawings/d/e/2PACX-1vQ-9Pk67l_tbifT-tFziYSFgA8-hQkbgiLP1mSLZ9IXxCxh9WfhQ3ZlXO_nBHtLhIjuIQyeSXB85ft6/pub?w=960&amp;h=720');

//test 1
addModel(id,-8,accY-5,0,3,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://drive.google.com/file/d/17MdXfjZUsXAaJk_PT9oYBDiniGLf4Ug9/view?usp=sharing");});},'https://roelyoon.github.io/Portfolio/3DModels/drive.glb');

//test 1
addModel(id,8,accY,0,3,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://drive.google.com/file/d/185ltfKy184xVByNvoFm9hdx0_Cn1RLGd/view?usp=sharing");});},'https://roelyoon.github.io/Portfolio/3DModels/drive.glb');

/*
//test txt
addSprite(960,720,1/30,id,0,accY-=12,0,'https://docs.google.com/drawings/d/e/2PACX-1vQ-9Pk67l_tbifT-tFziYSFgA8-hQkbgiLP1mSLZ9IXxCxh9WfhQ3ZlXO_nBHtLhIjuIQyeSXB85ft6/pub?w=960&amp;h=720');

//test 1
addModel(id,0,accY-=21,0,3,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://drive.google.com/file/d/17hAdfmAu-_UenWBccvk5L8rS82C712A0/view?usp=sharing");});},'https://roelyoon.github.io/Portfolio/3DModels/drive.glb');

//test 1
addModel(id,0,accY-=21,0,3,new THREE.Vector3(0,0.03,0),function(){},function(gltf){gltf.scene.on('click',function(ev){window.open("https://drive.google.com/file/d/17hAdfmAu-_UenWBccvk5L8rS82C712A0/view?usp=sharing");});},'https://roelyoon.github.io/Portfolio/3DModels/drive.glb');
*/
//light
const titleBackPLight = new THREE.PointLight(0xffffff,5000);
const titleTopLight = new THREE.PointLight(0xffffff,50000);
titleBackPLight.position.set(0,-2,-4); 
titleTopLight.position.set(0,10,4); 
const hLight = new THREE.HemisphereLight( 0xffffff, 0x080820, 50000);
const amblight = new THREE.AmbientLight(0xffffff,1);
scene.add(titleBackPLight,titleTopLight,amblight); 

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
        targetCameraPos.z+=curScene<zero?moveZ:moveZ*-1;
        targetOrbitPos.x-=moveX; 
        targetOrbitPos.y = 0;
        targetOrbitPos.z+=curScene<zero?moveZ:moveZ*-1;
        lerpFrames=60;
    }
}
function rightArrClick(){
    if(curScene!=id){
        curScene++;
        targetCameraPos.x+=moveX;
        targetCameraPos.y = 0; 
        targetCameraPos.z+=curScene<=zero?moveZ*-1:moveZ;
        targetOrbitPos.x+=moveX;
        targetOrbitPos.y = 0;
        targetOrbitPos.z+=curScene<=zero?moveZ*-1:moveZ;
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
        let d = (Math.abs(e.deltaY)>6 ? (e.deltaY > 0)?6:-6 : e.deltaY)*(isTouchPad?3/4:2); 
        targetCameraPos.y=camera.position.y;
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