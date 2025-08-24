
// npm i 
// npm run dev
// ctrl => crome = telwin css - get start - fremwork npm install and npx
// npm run build:css
// npm i three

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';   // hand to move the cube

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00,wireframe:true } );  // wireframe:true for see the inside of the cube
const cube = new THREE.Mesh( geometry, material );
scene.add( cube ); 

camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas,antialias:true}); // antialias:true for smooth movement
renderer.setSize( window.innerWidth, window.innerHeight );

window.addEventListener('resize',()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;  // smooth movement
controls.autoRotate = true;  
controls.autoRotateSpeed = 12;  // speed of the rotation

function animate() {
  window.requestAnimationFrame(animate);
	renderer.render( scene, camera );
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  controls.update();
}
animate();