//  Scene 
const scene = new THREE.Scene();

//  Camera 
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(80, 40, 80);
camera.lookAt(0, 25, 0);



// Renderer 
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Monument Dimensions
const baseHalf = 5;   // half-width of base
const topHalf = 3;    // half-width at top of tower
const towerH = 50;    // tower height
const pyramidH = 8;   // pyramid height

// Vertices (origin at center of base) 
// ====== Vertices (origin at center of base) ======
const v0 = new THREE.Vector3(-baseHalf, 0, -baseHalf);
const v1 = new THREE.Vector3( baseHalf, 0, -baseHalf);
const v2 = new THREE.Vector3( baseHalf, 0,  baseHalf);
const v3 = new THREE.Vector3(-baseHalf, 0,  baseHalf);

const v4 = new THREE.Vector3(-topHalf, towerH, -topHalf);
const v5 = new THREE.Vector3( topHalf, towerH, -topHalf);
const v6 = new THREE.Vector3( topHalf, towerH,  topHalf);
const v7 = new THREE.Vector3(-topHalf, towerH,  topHalf);

const v8 = new THREE.Vector3(0, towerH + pyramidH, 0);

// ===== Materials (8 sides, all different) =====
// 3+ ways to specify color: hex, CSS name, rgb(), THREE.Color
const mats = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),                 // hex
  new THREE.MeshBasicMaterial({ color: "blue" }),                    // CSS name
  new THREE.MeshBasicMaterial({ color: "rgb(0,255,0)" }),            // rgb()
  new THREE.MeshBasicMaterial({ color: new THREE.Color("yellow") }), // THREE.Color
  new THREE.MeshBasicMaterial({ color: 0xff00ff }),                  // hex
  new THREE.MeshBasicMaterial({ color: "cyan" }),                    // CSS name
  new THREE.MeshBasicMaterial({ color: "rgb(255,128,0)" }),          // rgb()
  new THREE.MeshBasicMaterial({ color: new THREE.Color("white") })   // THREE.Color
];

// Group to rotate everything together
const monument = new THREE.Group();
scene.add(monument);

// Helper function to make one triangular face mesh
function addTriangle(a, b, c, material) {
  const g = new THREE.BufferGeometry();
  const verts = new Float32Array([
    a.x, a.y, a.z,
    b.x, b.y, b.z,
    c.x, c.y, c.z
  ]);
  g.setAttribute("position", new THREE.BufferAttribute(verts, 3));
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, material);
  monument.add(m);
}

// Helper function to make one quad face as TWO triangles
function addQuad(a, b, c, d, material) {
  // triangle 1: a-b-c
  addTriangle(a, b, c, material);
  // triangle 2: a-c-d
  addTriangle(a, c, d, material);
}

// ===== Tower (4 sides) =====
addQuad(v0, v1, v5, v4, mats[0]); // front
addQuad(v1, v2, v6, v5, mats[1]); // right
addQuad(v2, v3, v7, v6, mats[2]); // back
addQuad(v3, v0, v4, v7, mats[3]); // left

// ===== Pyramid (4 sides) =====
addTriangle(v4, v5, v8, mats[4]);
addTriangle(v5, v6, v8, mats[5]);
addTriangle(v6, v7, v8, mats[6]);
addTriangle(v7, v4, v8, mats[7]);



//  Render loop 
function animate() {
  requestAnimationFrame(animate);
  monument.rotation.y += 0.01;
  renderer.render(scene, camera);
}


//  Resize handling 
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
