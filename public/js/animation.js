/**
 * Simple Particles Animation with Three.js
 */

console.log('Animation script loaded');

// Scene setup
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;

// Initialize everything
function init() {
  console.log('Initializing animation');
  
  // Get the container
  const container = document.getElementById('animation-container');
  if (!container) {
    console.error('Container not found');
    return;
  }

  // Create scene
  scene = new THREE.Scene();
  
  // Create camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 100;
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true 
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Add to DOM
  container.appendChild(renderer.domElement);
  
  // Create particles
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  
  // Add 1500 particles
  for (let i = 0; i < 1500; i++) {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    const z = Math.random() * 200 - 100;
    vertices.push(x, y, z);
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  
  // Create material
  const material = new THREE.PointsMaterial({
    size: 2,
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.7
  });
  
  // Create point cloud
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
  
  // Event listeners
  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onMouseMove);
  
  // Start animation
  animate();
  console.log('Animation started');
}

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Handle mouse movement
function onMouseMove(event) {
  mouseX = (event.clientX - window.innerWidth / 2) / 100;
  mouseY = (event.clientY - window.innerHeight / 2) / 100;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Rotate slightly
  particles.rotation.x += 0.001;
  particles.rotation.y += 0.002;
  
  // Interactive rotation based on mouse
  particles.rotation.x += (mouseY * 0.01 - particles.rotation.x) * 0.1;
  particles.rotation.y += (mouseX * 0.01 - particles.rotation.y) * 0.1;
  
  // Render
  renderer.render(scene, camera);
}

// Start on load
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, starting animation');
  // Short delay to ensure everything is ready
  setTimeout(init, 100);
}); 