import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import * as TWEEN from '@tweenjs/tween.js'

const scene = new THREE.Scene();
const canvas = document.querySelector('canvas');
console.log(canvas.clientWidth);
console.log(canvas.clientHeight);
console.log(canvas);
const camera = new THREE.PerspectiveCamera(20, canvas.clientWidth/canvas.clientHeight, 1, 500);

const renderer = new THREE.WebGLRenderer( { canvas: artifactCanvas, antialias: true } );
renderer.setPixelRatio(window.devicePixelRatio);
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

// const directionalLightThree = new THREE.DirectionalLight( 0x333333, 0.8 );
// directionalLightThree.position.x = 1;
// directionalLightThree.position.y = 1;
// directionalLightThree.position.z = 1;

// const directionalLightFour = new THREE.DirectionalLight( 0x333333, 0.8 );
// directionalLightFour.position.x = -1;
// directionalLightFour.position.y = -1;
// directionalLightFour.position.z = -1;

// const directionalLightFive = new THREE.DirectionalLight( 0xA2B9D4, 0.8 );
// directionalLightFive.position.x = 1;
// directionalLightFive.position.y = 1;
// directionalLightFive.position.z = 1;

// const directionalLightSix = new THREE.DirectionalLight( 0xA2B9D4, 0.8 );
// directionalLightSix.position.x = -1;
// directionalLightSix.position.y = -1;
// directionalLightSix.position.z = -1;


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

// const texture = new THREE.TextureLoader().load('./boxtop.png');
// const aMaterial = new THREE.MeshBasicMaterial({
//   map: texture,
//   transparent: true
// });

var geo = new THREE.PlaneGeometry( 2, 2. );
var mat = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
var floor = new THREE.Mesh( geo, mat );
floor.material.side = THREE.DoubleSide;
floor.rotation.x = -0.5 * Math.PI
floor.translateX( 0 );
floor.translateY( 0.04 );
floor.translateZ( 0.462 );
floor.name = "top";
scene.add( floor );
// console.log(floor);
// console.log(floor.position.x);
// console.log(floor.position.y);
// console.log(floor.position.z);

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
plane1.name = "front";
scene.add( plane1 );

const go2 = new THREE.PlaneGeometry( 2, 0.9);
const ma2 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane2 = new THREE.Mesh( go2, ma2 );
plane2.translateZ( -1.05 );
plane2.name = "back";
scene.add( plane2 );


const go3 = new THREE.PlaneGeometry( 2, 0.9);
const ma3 = new THREE.MeshBasicMaterial( {color: 0xffee44, side: THREE.DoubleSide} );
const plane3 = new THREE.Mesh( go3, ma3 );
plane3.translateX( -1);
plane3.translateZ( -0.035 );
plane3.rotateY(-0.5 * Math.PI);
plane3.name = "left";
scene.add( plane3 );

const go4 = new THREE.PlaneGeometry( 2, 0.9);
const ma4 = new THREE.MeshBasicMaterial( {color: 0xffee44, side: THREE.DoubleSide} );
const plane4 = new THREE.Mesh( go4, ma4 );
plane4.translateX( 1.02);
plane4.translateZ( -0.035 );
plane4.rotateY(-0.5 * Math.PI);
plane4.name = "right";
scene.add( plane4 );


// var field = new THREE.Mesh(geometry, material);



// var light = new THREE.AmbientLight(0xff3333);
// scene.add(light);



camera.position.z = 2;

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
// controls.enablePan = false;
controls.dampingFactor = 0.3;
controls.update();
controls.maxPolarAngle = Math.PI / 2;
// controls.screenSpacePanning = true;
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


// const tex = new THREE.TextureLoader().load('./rect1.svg');
// const borderonly = new THREE.MeshBasicMaterial({
//   map: tex,
//   transparent: true
// });

const blank = new THREE.TextureLoader().load('./rect4.svg');
const blankonly = new THREE.MeshBasicMaterial({
    map: blank,
    transparent: true
});

const topHover = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./topIllustrationBorder.svg'),
    transparent: true
  });
  
const topDefault = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./topIllustrationNoBorder.svg'),
    transparent: true
})

const leftDefault = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./leftNoBorder.svg'),
    transparent: true
})

const leftHover = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./leftBorder.svg'),
    transparent: true
})

const rightDefault = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./rightNoBorder.svg'),
    transparent: true
})

const rightHover = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./rightBorder.svg'),
    transparent: true
})

const frontDefault = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./frontNoBorder.svg'),
    transparent: true
})

const frontHover = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./frontBorder.svg'),
    transparent: true
})

function renda() {


    raycaster.setFromCamera(mouse, camera);

    const [hovered] = raycaster.intersectObjects(scene.children, false);

    if ( hovered ) {

    for (let i = 0; i < scene.children.length; i ++) {
        if (scene.children[i].type != "Mesh") {
            
        } else {
            if (scene.children[i] == hovered.object) {

                switch (scene.children[i].name) {
                    case "top":
                        scene.children[i].material = topHover;
                        break;
                    case "bottom":
                        scene.children[i].material = topHover;
                        break;  
                    case "left":
                        scene.children[i].material = leftHover;
                        break;  
                    case "right":
                        scene.children[i].material = rightHover;
                        break;  
                    case "front":
                        scene.children[i].material = frontHover;
                        break;  
                    case "back":
                        scene.children[i].material = borderonly;
                        break;  
                    default:
                        break;
                }
            } else {

                switch (scene.children[i].name) {
                    case "top":
                        scene.children[i].material = topDefault;
                        break;
                    case "bottom":
                        scene.children[i].material = topDefault;
                        break;  
                    case "left":
                        scene.children[i].material = leftDefault;
                        break;  
                    case "right":
                        scene.children[i].material = rightDefault;
                        break;  
                    case "front":
                        scene.children[i].material = frontDefault;
                        break;  
                    case "back":
                        scene.children[i].material = blankonly;
                        break;  
                    default:
                        break;
                }
            }
        }
    

    }

    } else {
        for (let i = 0; i < scene.children.length; i ++) {
            switch (scene.children[i].name) {
                case "top":
                    scene.children[i].material = topDefault;
                    break;
                case "bottom":
                    scene.children[i].material = topDefault;
                    break;  
                case "left":
                    scene.children[i].material = leftDefault;
                    break;  
                case "right":
                    scene.children[i].material = rightDefault;
                    break;  
                case "front":
                    scene.children[i].material = frontDefault;
                    break;  
                case "back":
                    scene.children[i].material = blankonly;
                    break;  
                default:
                    break;
            }
            // if (scene.children[i].name == "top" || scene.children[i].name == "bottom") {
            //     scene.children[i].material = topDefault;
            // } else {
            //     scene.children[i].material = blankonly;
            // }
        }
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


    document.querySelector("div.page-thumb").classList.add("selected");

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

const swatchTrigger = document.querySelector("div.swatch");
const swatchMenu = document.querySelector("menu.swatch-menu");
swatchTrigger.addEventListener("click", ()=> {
    console.log("log")
    if (swatchTrigger.classList.contains("active")) {
        swatchTrigger.classList.remove("active");
        swatchMenu.classList.remove("open");
    } else {
        swatchTrigger.classList.add("active");
        swatchMenu.classList.add("open");
        console.log('open')
    }
})

const swatches = document.querySelectorAll("button.swatch")
var currentSwatch = "white"; 
for (let i = 0; i < swatches.length; i ++) {
    // var swatch = swatches[i];
    swatches[i].addEventListener("click", (swatch)=> {

        if (swatch.target.classList.contains("selected") == false) {
            for (let j = 0; j < swatches.length; j ++) {
                swatches[j].classList.remove("selected");
            }
            swatch.target.classList.add("selected");
            currentSwatch = swatch.target.id;
            
            updateSwatch();
        }
    })
}

function updateSwatch() {
    // document.querySelector('menu.contextual-toolbar > div.swatch > button').style.backgroundImage = transparent;

    document.querySelector('menu.contextual-toolbar > div.swatch > button').id = currentSwatch;
    switch (currentSwatch) {
        case "black":
            directionalLightOne.color.setHex( 0x333333 );
            directionalLightTwo.color.setHex( 0x333333 );
            break;
        case "teal":
            directionalLightOne.color.setHex( 0x4CEEF6 );
            directionalLightTwo.color.setHex( 0x4CEEF6 );
            break;
        case "pink":
            directionalLightOne.color.setHex( 0xFF98C1 );
            directionalLightTwo.color.setHex( 0xFF98C1 );
            break;
        case "grey":
            directionalLightOne.color.setHex( 0xE8F7FF );
            directionalLightTwo.color.setHex( 0xE8F7FF );
            break;
        case "white":
            directionalLightOne.color.setHex( 0xfefefe );
            directionalLightTwo.color.setHex( 0xfefefe );
            break;
    }
}

document.body.onkeyup = function(e) {
    if (e.key == "a" ||
        e.code == "a" ||      
        e.keyCode == 98      
    ) {

        swatchMenu.classList.remove("open");
        
        let menu = document.querySelector("menu.contextual-toolbar");
        if (menu.classList.contains("open")) {
            menu.classList.remove("open");
            swatchTrigger.classList.remove("active");
        } else {
            menu.classList.add("open");
            swatchTrigger.classList.remove("active");
        }
    }
}