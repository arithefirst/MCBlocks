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
let textureLocations;
if ($("#blocks").val() == "grassblock") {
  $("#favicon").attr("href", "/public/grassblock/side.png");
  textureLocations = [
    "/public/grassblock/side.png", // Right
    "/public/grassblock/side.png", // Left
    "/public/grassblock/top.png", // Top
    "/public/dirt.png", // Bottom
    "/public/grassblock/side.png", // Front
    "/public/grassblock/side.png", // Back
  ];
} else if ($("#blocks").val() == "dirt") {
  $("#favicon").attr("href", "/public/dirt.png");
  textureLocations = [
    "/public/dirt.png", // Right
    "/public/dirt.png", // Left
    "/public/dirt.png", // Top
    "/public/dirt.png", // Bottom
    "/public/dirt.png", // Front
    "/public/dirt.png", // Back
  ];
} else if ($("#blocks").val() == "cobblestone") {
  $("#favicon").attr("href", "public/cobblestone.png");
  textureLocations = [
    "/public/cobblestone.png", // Right
    "/public/cobblestone.png", // Left
    "/public/cobblestone.png", // Top
    "/public/cobblestone.png", // Bottom
    "/public/cobblestone.png", // Front
    "/public/cobblestone.png", // Back
  ];
} else if ($("#blocks").val() == "obsidian") {
  $("#favicon").attr("href", "/public/obsidian.png");
  textureLocations = [
    "/public/obsidian.png", // Right
    "/public/obsidian.png", // Left
    "/public/obsidian.png", // Top
    "/public/obsidian.png", // Bottom
    "/public/obsidian.png", // Front
    "/public/obsidian.png", // Back
  ];
} else if ($("#blocks").val() == "tnt") {
  $("#favicon").attr("href", "/public/tnt/side.png");
  textureLocations = [
    "/public/tnt/side.png", // Right
    "/public/tnt/side.png", // Left
    "/public/tnt/top.png", // Top
    "/public/tnt/bottom.png", // Bottom
    "/public/tnt/side.png", // Front
    "/public/tnt/side.png", // Back
  ];
} else if ($("#blocks").val() == "bedrock") {
  $("#favicon").attr("href", "/public/bedrock.png");
  textureLocations = [
    "/public/bedrock.png", // Right
    "/public/bedrock.png", // Left
    "/public/bedrock.png", // Top
    "/public/bedrock.png", // Bottom
    "/public/bedrock.png", // Front
    "/public/bedrock.png", // Back
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
