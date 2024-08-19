import * as THREE from "three";
import $ from "jquery";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Create the camera, scene, renderer, and movement controls
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the cube geometry and the loader for it's textures
const textureLoader = new THREE.TextureLoader();
const geometry = new THREE.BoxGeometry(2, 2, 2);

// Set the texure locations array depending on which block is being loaded
let texType;
var textureLocations = [];
const repeating = ["dirt", "cobblestone", "obsidian", "bedrock", "oakplanks"];
const repeatingSides = ["tnt", "grassblock"];
const repeatngLBR = ["craftingtable"];

if (repeating.includes($("#blocks").val())) {
  texType = 1;
} else if (repeatingSides.includes($("#blocks").val())) {
  texType = 2;
} else if (repeatngLBR.includes($("#blocks").val())) {
  texType = 3;
}

function generateTextures(texType, blockname) {
  if (texType == 1) {
    for (let i = 0; i != 6; i++) {
      textureLocations[i] = `public/${blockname}.png`;
    }
  } else if (texType == 2) {
    textureLocations[0] = `public/${blockname}/side.png`;
    textureLocations[1] = `public/${blockname}/side.png`;
    textureLocations[2] = `public/${blockname}/top.png`;
    textureLocations[3] = `public/${blockname}/bottom.png`;
    textureLocations[4] = `public/${blockname}/side.png`;
    textureLocations[5] = `public/${blockname}/side.png`;
  } else if (texType == 3) {
    textureLocations[0] = `public/${blockname}/side.png`;
    textureLocations[1] = `public/${blockname}/side.png`;
    textureLocations[2] = `public/${blockname}/top.png`;
    textureLocations[3] = `public/${blockname}/bottom.png`;
    textureLocations[4] = `public/${blockname}/front.png`;
    textureLocations[5] = `public/${blockname}/side.png`;
  }
}

generateTextures(texType, $("#blocks").val());

// Create the material out of the image paths in the array
const cubeMats = [
  new THREE.MeshBasicMaterial({ map: textureLoader.load(textureLocations[0]) }), // Right
  new THREE.MeshBasicMaterial({ map: textureLoader.load(textureLocations[1]) }), // Left
  new THREE.MeshBasicMaterial({ map: textureLoader.load(textureLocations[2]) }), // Top
  new THREE.MeshBasicMaterial({ map: textureLoader.load(textureLocations[3]) }), // Bottom
  new THREE.MeshBasicMaterial({ map: textureLoader.load(textureLocations[4]) }), // Front
  new THREE.MeshBasicMaterial({ map: textureLoader.load(textureLocations[5]) }), // Back
];

const cube = new THREE.Mesh(geometry, cubeMats);

// Add the cube to the scene
scene.add(cube);

// Back the camera up a bit
camera.position.z = 5;

// Itterate through the different viewmodes
// Mouse Control
if ($("#controls").val() == "mouse") {
  const controls = new OrbitControls(camera, renderer.domElement);
  function animloop() {
    controls.update;
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animloop);
}
// Rotate X
if ($("#controls").val() == "arX") {
  function animloop() {
    cube.rotation.x += 0.005;
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animloop);
}
// Rotate Y
if ($("#controls").val() == "arY") {
  function animloop() {
    cube.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animloop);
}
// Rotate X+Y
if ($("#controls").val() == "arXY") {
  function animloop() {
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animloop);
}
// Rotate X+Y and Mouse Control
if ($("#controls").val() == "arXYmouse") {
  const controls = new OrbitControls(camera, renderer.domElement);
  function animloop() {
    controls.update;
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animloop);
}
