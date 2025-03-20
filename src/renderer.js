import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const createRenderer = () => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Renderer setup
  // const renderer = new THREE.WebGLRenderer({ antialias: true });
  const renderer = new THREE.WebGLRenderer({
    antialias: window.devicePixelRatio < 2,
    logarithmicDepthBuffer: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true; // Enable shadow maps
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;


  document.body.appendChild(renderer.domElement);

  return renderer;
};
