import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';




const canvas = document.getElementById('webgl');

const scene = new THREE.Scene();

const size = {
  width: innerWidth,
  height: innerHeight
}

// Mesh
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5, 1,1,1),
  new THREE.MeshNormalMaterial()
)

scene.add(mesh);


const gridHelper = new THREE.GridHelper(50,50);
scene.add(gridHelper);

// Camera
const camera = new THREE.PerspectiveCamera(55, size.width / size.height, 0.1, 100)
camera.position.set(1, 1.5, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true




// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

addEventListener('resize', () => {
  size.width = innerWidth;
  size.height = innerHeight;

  camera.aspect = size.width/ size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})


// Animation Area
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();


  // controls.update();
  renderer.render(scene,camera);
  requestAnimationFrame(tick);
}

tick()