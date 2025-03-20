import * as THREE from "three";

export const setupLighting = (scene) => {
  // Create a directional light
  // const directionalLight = new THREE.DirectionalLight(0xaac3f9, 1);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 20, -10); // Set the positions of the light
  directionalLight.castShadow = true; // Enable shadow casting for the light

  // Optional: Configure shadow properties
  // directionalLight.shadow.mapSize.width = 512; // Default is 512
  // directionalLight.shadow.mapSize.height = 512; // Default is 512
  // directionalLight.shadow.camera.near = 0.5; // Default is 0.5
  // directionalLight.shadow.camera.far = 50; // Default is 500
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.radius = 1;
  directionalLight.shadow.blurSamples = 10;
  directionalLight.shadow.camera.top = 30;
  directionalLight.shadow.camera.bottom = -10;
  directionalLight.shadow.camera.left = -30;
  directionalLight.shadow.camera.right = 30;

  // Optional: Adjust shadow bias to reduce artifacts
  directionalLight.shadow.bias = -0.0001; // Adjust as necessary

  scene.add(directionalLight);

  // Optionally add ambient light for overall illumination
  // const ambientLight = new THREE.AmbientLight(0xaac3f9, 0.2); // Soft white light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Soft white light

  scene.add(ambientLight);
};
