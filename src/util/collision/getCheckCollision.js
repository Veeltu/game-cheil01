  // Function to check for collisions between two meshes
  export const checkCollision = (meshA, meshB, THREE) => {
    meshA.updateMatrixWorld(); // Update world matrix of meshA
    meshB.updateMatrixWorld(); // Update world matrix of meshB

    const boxA = new THREE.Box3().setFromObject(meshA);
    const boxB = new THREE.Box3().setFromObject(meshB);

    return boxA.intersectsBox(boxB); // Check if bounding boxes intersect
  };