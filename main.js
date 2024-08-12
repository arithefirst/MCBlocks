import * as THREE from "three";
import $ from "jquery";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Create the camera, scene, renderer, and movement controls
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the cube geometry and the loader for it's textures
const textureLoader = new THREE.TextureLoader();
const geometry = new THREE.BoxGeometry(2, 2, 2);

// Set the texure locations array depending on which block is being loaded
let textureLocations;
if ($("#blocks").val() == "grassblock") {
  textureLocations = [
    "/public/grassblock/side.png", // Right
    "/public/grassblock/side.png", // Left
    "/public/grassblock/top.png", // Top
    "/public/dirt.png", // Bottom
    "/public/grassblock/side.png", // Front
    "/public/grassblock/side.png", // Back
  ];
} else if ($("#blocks").val() == "dirt") {
  textureLocations = [
    "/public/dirt.png", // Right
    "/public/dirt.png", // Left
    "/public/dirt.png", // Top
    "/public/dirt.png", // Bottom
    "/public/dirt.png", // Front
    "/public/dirt.png", // Back
  ];
} else if ($("#blocks").val() == "cobblestone") {
  textureLocations = [
    "/public/cobblestone.png", // Right
    "/public/cobblestone.png", // Left
    "/public/cobblestone.png", // Top
    "/public/cobblestone.png", // Bottom
    "/public/cobblestone.png", // Front
    "/public/cobblestone.png", // Back
  ];
} else if ($("#blocks").val() == "obsidian") {
  textureLocations = [
    "/public/obsidian.png", // Right
    "/public/obsidian.png", // Left
    "/public/obsidian.png", // Top
    "/public/obsidian.png", // Bottom
    "/public/obsidian.png", // Front
    "/public/obsidian.png", // Back
  ];
}
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

// Define the 5 different animloop types for the 5 options
function mousecontrol() {
  controls.update;
  renderer.render(scene, camera);
}

function rotateX() {
  cube.rotation.x += 0.005;
  renderer.render(scene, camera);
}

function rotateY() {
  cube.rotation.y += 0.005;
  renderer.render(scene, camera);
}

function rotateXY() {
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;
  renderer.render(scene, camera);
}

function MouserotateXY() {
  controls.update;
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;
  renderer.render(scene, camera);
}

if ($("#controls").val() == "arX") {
  renderer.setAnimationLoop(rotateX);
} else if ($("#controls").val() == "arY") {
  renderer.setAnimationLoop(rotateY);
} else if ($("#controls").val() == "arXY") {
  renderer.setAnimationLoop(rotateXY);
} else if ($("#controls").val() == "mouse") {
  renderer.setAnimationLoop(mousecontrol);
} else if ($("#controls").val() == "arXYmouse") {
  renderer.setAnimationLoop(MouserotateXY);
}
