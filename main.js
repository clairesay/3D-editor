import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import * as TWEEN from '@tweenjs/tween.js'

const scene = new THREE.Scene();
const canvas = document.querySelector('canvas');

const camera = new THREE.PerspectiveCamera(20, canvas.clientWidth/canvas.clientHeight, 1, 500);

const renderer = new THREE.WebGLRenderer( { canvas: artifactCanvas } );
renderer.setSize( canvas.clientWidth, canvas.clientHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

scene.background = new THREE.Color( 0xEBECF0 );


const directionalLightOne = new THREE.DirectionalLight( 0xfefefe, 0.8 );
directionalLightOne.position.x = 1;
directionalLightOne.position.y = 1;
directionalLightOne.position.z = 1;
scene.add( directionalLightOne );

const directionalLightTwo = new THREE.DirectionalLight( 0xfefefe, 0.8 );
directionalLightTwo.position.x = -1;
directionalLightTwo.position.y = -1;
directionalLightTwo.position.z = -1;
scene.add( directionalLightTwo );

const directionalLightThree = new THREE.DirectionalLight( 0x333333, 0.8 );
directionalLightThree.position.x = 1;
directionalLightThree.position.y = 1;
directionalLightThree.position.z = 1;

const directionalLightFour = new THREE.DirectionalLight( 0x333333, 0.8 );
directionalLightFour.position.x = -1;
directionalLightFour.position.y = -1;
directionalLightFour.position.z = -1;

const directionalLightFive = new THREE.DirectionalLight( 0xA2B9D4, 0.8 );
directionalLightFive.position.x = 1;
directionalLightFive.position.y = 1;
directionalLightFive.position.z = 1;

const directionalLightSix = new THREE.DirectionalLight( 0xA2B9D4, 0.8 );
directionalLightSix.position.x = -1;
directionalLightSix.position.y = -1;
directionalLightSix.position.z = -1;


const mtlLoader = new MTLLoader()
mtlLoader.load('./white.mtl', materials => {
    materials.preload()

    const objLoader = new OBJLoader()
    objLoader.setMaterials(materials)

    objLoader.load('./white.obj', object => {
        scene.add(object)
        object.receiveShadow = true;
        object.castShadow = true;
        object.position.y = 0.55;
    })
})

// var grid = new THREE.GridHelper(100, 10);
// scene.add(grid);

const texture = new THREE.TextureLoader().load('./boxtop.png');
const aMaterial = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true
});

var geo = new THREE.PlaneGeometry( 2, 2. );
var mat = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
var floor = new THREE.Mesh( geo, aMaterial );
floor.material.side = THREE.DoubleSide;
floor.rotation.x = -0.5 * Math.PI
floor.translateX( 0 );
floor.translateY( 0.04 );
floor.translateZ( 0.462 );
floor.name = "top";
scene.add( floor );
// console.log(floor);
console.log(floor.position.x);
console.log(floor.position.y);
console.log(floor.position.z);

var geo1 = new THREE.PlaneGeometry( 2, 2. );
var mat1 = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
var floor1 = new THREE.Mesh( geo1, mat1 );
floor1.material.side = THREE.DoubleSide;
floor1.rotation.x = -0.5 * Math.PI
floor1.translateX( 0 );
floor1.translateY( 0.04 );
floor1.translateZ( -0.465 );
floor1.name = "bottom";
scene.add( floor1 );

const go = new THREE.PlaneGeometry( 2, 0.9);
const ma = new THREE.MeshBasicMaterial( {color: 0xff000, side: THREE.DoubleSide} );
const plane1 = new THREE.Mesh( go, ma );
plane1.translateZ( 0.965 );
plane1.name = "two";
scene.add( plane1 );

const go2 = new THREE.PlaneGeometry( 2, 0.9);
const ma2 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane2 = new THREE.Mesh( go2, ma2 );
plane2.translateZ( -1.05 );
plane2.name = "three";
scene.add( plane2 );


const go3 = new THREE.PlaneGeometry( 2, 0.9);
const ma3 = new THREE.MeshBasicMaterial( {color: 0xffee44, side: THREE.DoubleSide} );
const plane3 = new THREE.Mesh( go3, ma3 );
plane3.translateX( -1);
plane3.translateZ( -0.035 );
plane3.rotateY(-0.5 * Math.PI);
plane3.name = "four";
scene.add( plane3 );

const go4 = new THREE.PlaneGeometry( 2, 0.9);
const ma4 = new THREE.MeshBasicMaterial( {color: 0xffee44, side: THREE.DoubleSide} );
const plane4 = new THREE.Mesh( go4, ma4 );
plane4.translateX( 1.02);
plane4.translateZ( -0.035 );
plane4.rotateY(-0.5 * Math.PI);
plane4.name = "five";
scene.add( plane4 );


// var field = new THREE.Mesh(geometry, material);



// var light = new THREE.AmbientLight(0xff3333);
// scene.add(light);



camera.position.z = 2;

const controls = new OrbitControls( camera, renderer.domElement );
// controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.maxPolarAngle = Math.PI / 2;
controls.screenSpacePanning = true;
controls.minDistance = 1;
controls.maxDistance = 20;

  // Track mouse movement to pick objects
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener('mousemove', ({ clientX, clientY }) => {
    const { innerWidth, innerHeight } = window;

    mouse.x = (clientX / innerWidth) * 2 - 1;
    mouse.y = -(clientY / innerHeight) * 2 + 1;
  });


// material special
const tex = new THREE.TextureLoader().load('./sideborder.png');
const borderonly = new THREE.MeshBasicMaterial({
  map: tex,
  transparent: true
});

const textop = new THREE.TextureLoader().load('./topborder.png');
const topborderonly = new THREE.MeshBasicMaterial({
  map: textop,
  transparent: true
});

const blankonly = new THREE.MeshBasicMaterial({ color: 0xffffff });


function renda() {


    raycaster.setFromCamera(mouse, camera);

    const [hovered] = raycaster.intersectObjects(scene.children, false);

    if ( hovered ) {

    for (let i = 0; i < scene.children.length; i ++) {
        if (scene.children[i].type != "Mesh") {
            
        } else {
            if (scene.children[i] == hovered.object) {

                if (hovered.object.name == "top" || hovered.object.name == "bottom") {
                    scene.children[i].material = topborderonly;
                } else {
                    scene.children[i].material = borderonly;
                }
            } else {
                scene.children[i].material = blankonly;
            }
        }
    

    }

    } else {
        // for (let i = 0; i < scene.children.length; i ++) {
        //     scene.children[i].material = blankonly;
        // }
    }

}

function animate() {

    requestAnimationFrame(animate);
    renda();
    renderer.render(scene, camera);
    TWEEN.update();
    // console.log('xposition is' + camera.position.x);
    // console.log('yposition is ' + camera.position.y);
    // console.log('zposition is ' + camera.position.z);

    // console.log('xrotation is' + camera.rotation.x);
    // console.log('yrotation is ' + camera.rotation.y);
    // console.log('zrotation is ' + camera.rotation.z);
}
animate();


document.querySelector("div.page-thumb").addEventListener("click", ()=> {
    // scene.remove(directionalLightOne);
    // scene.remove(directionalLightTwo);
    // scene.add(directionalLightThree);
    // scene.add(directionalLightFour);

    new TWEEN.Tween(camera.rotation)
      .to({ x:-1.5, y:0 , z:0 }, 1500)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

      new TWEEN.Tween(camera.position)
      .to({ x:0, y:8 , z:0.6 }, 1500)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  

    controls.update();
})

