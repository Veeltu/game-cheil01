// resize.js
let sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  
  let camera, renderer; // Zadeklaruj zmienne camera i renderer
  
  function handleResize() {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
  
    if (camera) {
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
    }
  
    if (renderer) {
      renderer.setSize(sizes.width, sizes.height);
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(pixelRatio);
    }
  }
  
  function setupResize(cameraObj, rendererObj) {
    camera = cameraObj;
    renderer = rendererObj;
    window.addEventListener('resize', handleResize);
  }
  
  export { sizes, setupResize };
  