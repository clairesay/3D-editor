import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const canvas = document.querySelector('canvas');

const camera = new THREE.PerspectiveCamera(20, canvas.clientWidth/canvas.clientHeight, 1, 500);

const renderer = new THREE.WebGLRenderer( { canvas: artifactCanvas } );
renderer.setSize( canvas.clientWidth, canvas.clientHeight );

scene.background = new THREE.Color( 0xEBECF0 );

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xeeeee });
const cube = new THREE.Mesh(geometry, material);
// cube.receiveShadow = true;
scene.add(cube);

camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
