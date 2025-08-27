
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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



// MeshStandardMateriaL ko chalane ke liye scene ko light add karna hoga
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00, roughness:0.3,metalness:0.3} );  // wireframe:true for see the inside of the cube
                                                                                                // side:THREE.DoubleSide
const cube = new THREE.Mesh( geometry, material );
scene.add( cube ); 

camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas,antialias:true}); // antialias:true for smooth movement
renderer.setSize( window.innerWidth, window.innerHeight );

// const geometry = new THREE.SphereGeometry( 1, 10,  10,2); 
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00,wireframe:true } ); 
// const sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );


window.addEventListener('resize',onwindowresize, false);

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




// Create a new GUI instance


// Add controls for cube properties
const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
cubeFolder.add(cube.position, 'x', -3, 3);
cubeFolder.add(cube.position, 'y', -3, 3);
cubeFolder.add(cube.position, 'z', -3, 3);
cubeFolder.add(cube.scale, 'x', 0.1, 2);
cubeFolder.add(cube.scale, 'y', 0.1, 2);
cubeFolder.add(cube.scale, 'z', 0.1, 2);

// Add controls for material properties
const materialFolder = gui.addFolder('Material');
materialFolder.addColor(material, 'color');
materialFolder.add(material, 'roughness', 0, 1);
materialFolder.add(material, 'metalness', 0, 1);

// Add controls for camera position
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'z', 1, 10);

// Add controls for orbit controls
const controlsFolder = gui.addFolder('Orbit Controls');
controlsFolder.add(controls, 'autoRotate');
controlsFolder.add(controls, 'autoRotateSpeed', 0, 5);
