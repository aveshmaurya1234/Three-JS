
// npm i lil-gui   // se panal bana sakte hai

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import libary
import * as dat from 'lil-gui';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// search = ctr+k => Add a high-intensity directional light
// light ko high karne ke liye
const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2);
highIntensityLight.position.set(10, 10, 10);
scene.add(highIntensityLight);


// search = ctr+k Add studio lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 1);
keyLight.position.set(5, 5, 5);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
fillLight.position.set(-5, 5, 5);
scene.add(fillLight);

const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
backLight.position.set(0, 5, -5);
scene.add(backLight);
// kha se light aaya hai 
// search = ctr+k =>Add light helpers for all the lights

// Helper for high-intensity directional light
const highIntensityLightHelper = new THREE.DirectionalLightHelper(highIntensityLight, 1);
scene.add(highIntensityLightHelper);

// Helper for ambient light (Note: AmbientLight doesn't have a helper as it's omnidirectional)

// Helper for key light
const keyLightHelper = new THREE.DirectionalLightHelper(keyLight, 1);
scene.add(keyLightHelper);

// Helper for fill light
const fillLightHelper = new THREE.DirectionalLightHelper(fillLight, 5);
scene.add(fillLightHelper);

// Helper for back light
const backLightHelper = new THREE.DirectionalLightHelper(backLight, 5);
scene.add(backLightHelper);

let loder = new THREE.TextureLoader();
let color = loder.load("./pic/color.jpg")


// MeshStandardMateriaL ko chalane ke liye scene ko light add karna hoga
const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const material = new THREE.MeshStandardMaterial( { map:color} );  // wireframe:true for see the inside of the cube
                                                                  // side:THREE.DoubleSide
const cube = new THREE.Mesh( geometry, material );
scene.add( cube ); 

// const geometry = new THREE.SphereGeometry( 1, 10,  10,2); 
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00,wireframe:true } ); 
// const sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );

camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas,antialias:true}); // antialias:true for smooth movement
renderer.setSize( window.innerWidth, window.innerHeight );
window.addEventListener('resize',onwindowresize, false);


const gui = new dat.GUI();

// Material folder
const materialFolder = gui.addFolder('Material');
materialFolder.addColor(material, 'color').name('Color');
materialFolder.add(material, 'roughness', 0, 1).name('Roughness');
materialFolder.add(material, 'metalness', 0, 1).name('Metalness');
materialFolder.open();

// Mesh folder
const meshFolder = gui.addFolder('Mesh');
meshFolder.add(cube.position, 'x', -5, 5).name('Position X');
meshFolder.add(cube.position, 'y', -5, 5).name('Position Y');
meshFolder.add(cube.position, 'z', -5, 5).name('Position Z');
meshFolder.add(cube.scale, 'x', 0.1, 2).name('Scale X');
meshFolder.add(cube.scale, 'y', 0.1, 2).name('Scale Y');
meshFolder.add(cube.scale, 'z', 0.1, 2).name('Scale Z');
meshFolder.open();



function onwindowresize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
}

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;  // smooth movement
controls.autoRotate = true;  
controls.autoRotateSpeed = 0.25;  // speed of the rotation

function animate() {
  window.requestAnimationFrame(animate);
	renderer.render( scene, camera );
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    //   controls.update();
}
animate();


