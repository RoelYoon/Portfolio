import * as THREE from "/three";
import {OrbitControls} from "/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
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
    let m = 10; 
    switch(keyEvent.key.toLowerCase()){
        case "w":
            camera.position.add( direction.multiplyScalar(m) );
            break;
        case "s":
            camera.position.sub( direction.multiplyScalar(-m) );
            break;
    }
});

const loop = ()=>{
    controls.update(); 
    renderer.render(scene,camera); 
    window.requestAnimationFrame(loop); 
}

loop();