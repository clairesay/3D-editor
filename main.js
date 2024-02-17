import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
const pointer = new THREE.Vector2();
let INTERSECTED;
const scene = new THREE.Scene();
const canvas = document.querySelector('canvas');

const camera = new THREE.PerspectiveCamera(20, canvas.clientWidth/canvas.clientHeight, 1, 500);

const renderer = new THREE.WebGLRenderer( { canvas: artifactCanvas } );
renderer.setSize( canvas.clientWidth, canvas.clientHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

scene.background = new THREE.Color( 0xEBECF0 );

const raycaster = new THREE.Raycaster();
document.addEventListener( 'mousemove', onPointerMove );

function onPointerMove( event ) {

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // alert(pointer.x);

}


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
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xeeeee });
// const cube = new THREE.Mesh(geometry, material);
// cube.receiveShadow = true;
// scene.add(cube);





// // instantiate a loader
// const loader = new OBJLoader();

// // load a resource
// loader.load(
// 	// resource URL
// 	'./another.obj',
// 	// called when resource is loaded
// 	function ( object ) {

// 		scene.add( object );

// 	},
// 	// called when loading is in progresses
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	// called when loading has errors
// 	function ( error ) {

// 		console.log( 'An error happened' );

// 	}
// );

const mtlLoader = new MTLLoader()
// mtlLoader.setResourcePath('assets/')
// mtlLoader.setPath('assets/')
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

var geo = new THREE.PlaneGeometry( 2, 2. );
var mat = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
var floor = new THREE.Mesh( geo, mat );
floor.material.side = THREE.DoubleSide;
floor.rotation.x = -0.5 * Math.PI
floor.translateX( 0 );
floor.translateY( 0.04 );
floor.translateZ( 0.462 );
scene.add( floor );

var geo1 = new THREE.PlaneGeometry( 2, 2. );
var mat1 = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
var floor1 = new THREE.Mesh( geo1, mat1 );
floor1.material.side = THREE.DoubleSide;
floor1.rotation.x = -0.5 * Math.PI
floor1.translateX( 0 );
floor1.translateY( 0.04 );
floor1.translateZ( -0.465 );
scene.add( floor1 );

const go = new THREE.PlaneGeometry( 2, 0.9);
const ma = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
const plane1 = new THREE.Mesh( go, ma );
plane1.translateZ( 0.965 );

scene.add( plane1 );

const go2 = new THREE.PlaneGeometry( 2, 0.9);
const ma2 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane2 = new THREE.Mesh( go2, ma2 );
plane2.translateZ( -1.05 );

scene.add( plane2 );


const go3 = new THREE.PlaneGeometry( 2, 0.9);
const ma3 = new THREE.MeshBasicMaterial( {color: 0xffee44, side: THREE.DoubleSide} );
const plane3 = new THREE.Mesh( go3, ma3 );
plane3.translateX( -1);
plane3.translateZ( -0.035 );
plane3.rotateY(-0.5 * Math.PI);

scene.add( plane3 );

const go4 = new THREE.PlaneGeometry( 2, 0.9);
const ma4 = new THREE.MeshBasicMaterial( {color: 0xffee44, side: THREE.DoubleSide} );
const plane4 = new THREE.Mesh( go3, ma3 );
plane4.translateX( 1.02);
plane4.translateZ( -0.035 );
plane4.rotateY(-0.5 * Math.PI);

scene.add( plane4 );



// var light = new THREE.AmbientLight(0xff3333);
// scene.add(light);



camera.position.z = 2;

const controls = new OrbitControls( camera, renderer.domElement );



// //////////
// function loadModel() {

//     object.traverse( function ( child ) {

//         if ( child.isMesh ) child.material.map = texture;

//     } );

//     object.position.y = - 0.95;
//     object.scale.setScalar( 0.01 );
//     scene.add( object );

//     render();

// }
// //////////

function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);




    raycaster.setFromCamera( pointer, camera );

    const intersects = raycaster.intersectObjects( scene.children[2], false );
    // console.log(scene.children[2]);
    if ( intersects.length > 0 ) {
        alert('how')

        if ( INTERSECTED != intersects[ 0 ].object ) {
            console.log('t')
            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xff0000 );

        }

    } else {

        if ( INTERSECTED ) {
            console.log('it')

            INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        }

        INTERSECTED = null;

    }





}
animate();

document.querySelector("div.page-thumb").addEventListener("click", ()=> {
    // console.log('happened');
    scene.remove(directionalLightOne);
    scene.remove(directionalLightTwo);
    scene.add(directionalLightThree);
    scene.add(directionalLightFour);
    // scene.add(directionalLightFive);
    // scene.add(directionalLightSix);
})

