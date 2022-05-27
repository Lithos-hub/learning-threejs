// Imports
import "./style.css";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

scroll.behavior = "smooth";

// Booleans switchers
const useLightHelpers = false;

// Debug
const gui = new dat.GUI();

// Loaders
const textureLoader = new THREE.TextureLoader();
const normalMap1 = textureLoader.load("/img/textures/Map7.png");
const normalMap2 = textureLoader.load("/img/textures/Map6.png");

// Sizes and resize
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Canvas
const canvas = document.createElement("canvas");

document.querySelector(".container").appendChild(canvas);

// Scene + Camera
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  100,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(15);

// Geos
const sphereGeometry = new THREE.SphereBufferGeometry(5, 64, 64);
const planeGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);

// Materials
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "#1d2828",
  metalness: 1,
  roughness: 0.8,
  normalMap: normalMap1,
});

const planeMaterial = new THREE.MeshPhongMaterial({
  color: "black",
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
  vertexColors: true
});

// Mesh
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

// Positioning
planeMesh.position.z = 3;
planeMesh.position.y = -6;
planeMesh.rotation.x = 5.66;

// Adding to scene
scene.add(sphereMesh);
scene.add(planeMesh);

// Lights
const folderBlueLight = gui.addFolder("Blue Light");
const folderRedLight = gui.addFolder("Red Light");
const folderWhiteLight = gui.addFolder("White Light");
const folderBackLight = gui.addFolder("Back Light");

const blueLight = new THREE.PointLight("blue", 0.1); // Blue light
blueLight.position.set(10, -2, -5);
blueLight.intensity = 10;

const redLight = new THREE.PointLight("red", 0.1); // Red light
redLight.position.set(-7, -2, -10);
redLight.intensity = 10;

const whiteLight = new THREE.PointLight("white", 0.1);
whiteLight.position.set(10, 10, -7);
whiteLight.intensity = 2;

const backLight = new THREE.DirectionalLight("#2d112d", 0.1);
backLight.position.set(-9, 10, -3.50);
backLight.intensity = 10;

// const ambRedLight = new THREE.AmbientLight('red');
// const ambBlueLight = new THREE.AmbientLight('blue');
// const ambWhiteLight = new THREE.AmbientLight('white');

scene.add(blueLight);
scene.add(redLight);
scene.add(whiteLight);
scene.add(backLight);

// ** Light helpers

const blueLightHelper = new THREE.PointLightHelper(blueLight, 0.5);
const redLightHelper = new THREE.PointLightHelper(redLight, 0.5);
const whiteLightHelper = new THREE.PointLightHelper(whiteLight, 0.8);
const backLightHelper = new THREE.PointLightHelper(whiteLight, 0.2);

if (useLightHelpers) {
  scene.add(blueLightHelper);
  scene.add(redLightHelper);
  scene.add(whiteLightHelper);
  scene.add(backLightHelper);
}

// Fog

const fog = new THREE.Fog('black', 1, 100);
scene.fog = fog;

// Gui
folderBlueLight.add(blueLight.position, "x").min(-10).max(10).step(0.01);
folderBlueLight.add(blueLight.position, "y").min(-10).max(10).step(0.01);
folderBlueLight.add(blueLight.position, "z").min(-10).max(10).step(0.01);
folderBlueLight.add(blueLight, "intensity").min(0).max(10).step(0.01);

folderRedLight.add(redLight.position, "x").min(-10).max(10).step(0.01);
folderRedLight.add(redLight.position, "y").min(-10).max(10).step(0.01);
folderRedLight.add(redLight.position, "z").min(-10).max(10).step(0.01);
folderRedLight.add(redLight, "intensity").min(0).max(10).step(0.01);

folderWhiteLight.add(whiteLight.position, "x").min(-10).max(10).step(0.01);
folderWhiteLight.add(whiteLight.position, "y").min(-10).max(10).step(0.01);
folderWhiteLight.add(whiteLight.position, "z").min(-10).max(10).step(0.01);
folderWhiteLight.add(whiteLight, "intensity").min(0).max(10).step(0.01);

folderBackLight.add(backLight.position, "x").min(-10).max(10).step(0.01);
folderBackLight.add(backLight.position, "y").min(-10).max(10).step(0.01);
folderBackLight.add(backLight.position, "z").min(-10).max(10).step(0.01);
folderBackLight.add(backLight, "intensity").min(0).max(10).step(0.01);

// Controls
// const controls = new OrbitControls(camera, renderer.domElement);

// Event listeners
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("scroll", onScroll);

let clientX = 0;
let clientY = 0;

let targetX = 0;
let targetY = 0;

const screenMiddleX = sizes.width / 2;
const screenMiddleY = sizes.height / 2;

function onMouseMove(e) {
  clientX = e.clientX - screenMiddleX;
  clientY = e.clientY - screenMiddleY;
}

function onScroll() {
  sphereMesh.position.y = window.scrollY * 0.0001;
  sphereMesh.position.z = window.scrollY * 0.005;

  blueLight.position.y = -2 - window.scrollY * 0.03;
  blueLight.intensity = 10 - window.scrollY / 150;

  redLight.position.y = -2 + window.scrollY * 0.05;
  redLight.intensity = 10 - window.scrollY / 150;

  whiteLight.position.y = 10 - window.scrollY / 200;
  whiteLight.position.x = 10 - window.scrollY / 200;
  whiteLight.position.z = -7 + window.scrollY / 100;
  whiteLight.intensity = 2 + window.scrollY  / 20000;

  planeMesh.position.z = 5 + window.scrollY / 200;
  planeMesh.rotation.x = 5.66 - window.scrollY / 950;
}

// Methods

function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(500, 1000, 100, 100);
  // const {
  //   geometry: {
  //     attributes: {
  //       position: { array }
  //     },
  //   },
  // } = planeMesh;

  // for (let i = 0; i < array.length; i += 3) {
  //   const z = array.at(i + 2);
  //   array[i + 2] = z * Math.random();
  // }

}

// Clock
const clock = new THREE.Clock();

generatePlane();

// Animations
const tick = () => {
  targetX = clientX * 0.01;
  targetY = clientY * 0.01;
  
  const elapsedTime = clock.getElapsedTime();
  
  sphereMesh.rotation.y = -0.2 * elapsedTime;
  sphereMesh.rotation.x = 0.1 * elapsedTime;
  
  sphereMesh.rotation.y += 0.05 * (targetX - sphereMesh.rotation.y);
  sphereMesh.rotation.x += 0.05 * (targetY - sphereMesh.rotation.x);

  // planeMesh.rotation.x += 0.0005;

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
