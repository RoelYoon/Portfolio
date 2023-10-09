import * as THREE from "/three";
import {OrbitControls} from "/three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls } from '/three/examples/jsm/controls/FirstPersonControls.js';
const scene = new THREE.Scene(); 

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
//sphere object
const geometry = new THREE.TorusGeometry( 5, 3, 16, 50 ); 
const material = new THREE.MeshStandardMaterial({
    color: "#fac802",
    roughness: 0.5
});
const mesh = new THREE.Mesh(geometry,material); 
scene.add(mesh); 

//light
const light = new THREE.PointLight(0xffffff,500);
light.position.set(0,10,10); 
const amblight = new THREE.AmbientLight(0xffffff);
scene.add(light,amblight); 


//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height);
camera.position.z = 30; 
scene.add(camera); 

const canvas  = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas }); 
renderer.setSize(sizes.width,sizes.height); 
renderer.render(scene,camera); 

const controls = new OrbitControls(camera,canvas);
controls.enableDamping=true;
controls.enablePan = false;
controls.enableZoom = false; 
controls.target = new THREE.Vector3(0,0,30);

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
let curPos = 0; 
const targetCameraPos = new THREE.Vector3( 0, 0, 30 );
const targetOrbitPos = new THREE.Vector3( 0, 0, 30 );
const moveX=30; const moveZ=60;
let lerpFrames = 0;
function leftArrClick(){
    if(curPos!=0){
        curPos--;
        targetCameraPos.x-=moveX; 
        targetCameraPos.z-=moveZ; 
        targetOrbitPos.x-=moveX; 
        targetOrbitPos.z-=moveZ;
        lerpFrames=60;
    }
}
function rightArrClick(){
    if(curPos!=1){
        curPos++;
        targetCameraPos.x+=moveX;
        targetCameraPos.z+=moveZ;
        targetOrbitPos.x+=moveX;
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
});

const loop = ()=>{
    if(lerpFrames>0){
    camera.position.lerp(targetCameraPos,0.1);
    controls.target.lerp(targetOrbitPos,0.1);
    lerpFrames--;
    console.log(lerpFrames);
    }
    controls.update(); 
    renderer.render(scene,camera); 
    window.requestAnimationFrame(loop); 
}

loop();