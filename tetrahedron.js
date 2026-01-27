const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 40;
camera.position.x = 15;
camera.position.y = 20;
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const material = new THREE.LineBasicMaterial({ color: 0xffffff });

const A = new THREE.Vector3(10, 10, 10);
const B = new THREE.Vector3(-10, -10, 10);
const C = new THREE.Vector3(-10, 10, -10);
const D = new THREE.Vector3(10, -10, -10);

const points = [];

// A connections
points.push(A, B);
points.push(A, C);
points.push(A, D);

// B connections
points.push(B, C);
points.push(B, D);

// C connection
points.push(C, D);

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.LineSegments(geometry, material);

scene.add(line);
renderer.render(scene, camera);
