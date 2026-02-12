const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(-6, 6, 6, -6, 1, 1000);
camera.position.z = 100;


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// material for points
const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 2.0
});

const points = [];

const range = 6;        // match the zoom
const step = 0.03;      // denser sampling
const threshold = 0.08; // more points



for (let x = -range; x <= range; x += step) {
  for (let y = -range; y <= range; y += step) {

    const F = Math.pow(x*x + y*y, 2) - 4*(x*x - y*y);

    if (Math.abs(F) < threshold) {
      points.push(new THREE.Vector3(x, y, 0));
    }
  }
}

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const pts = new THREE.Points(geometry, material);
scene.add(pts);

renderer.render(scene, camera);
