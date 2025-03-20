import { createScene } from './src/scene.js';
import { createCamera } from './src/camera.js';
import { createRenderer } from './src/renderer.js';
// import { setupControls } from './src/controls.js';
import { setupLighting } from './src/lighting.js';

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

setupLighting(scene);
// setupControls(scene, camera); // Pass the scene to controls

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera); // Render the scene from the perspective of the camera
};

animate();



