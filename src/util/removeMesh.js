export const removeMesh = (myMesh, scene) => {
    // Step 1: Remove from scene
    scene.remove(myMesh);

    // Step 2: Dispose geometry and material
    if (myMesh.geometry) {
        myMesh.geometry.dispose();
    }
    
    if (myMesh.material) {
        // Dispose of material and its textures
        myMesh.material.dispose();
        
        if (myMesh.material.map) myMesh.material.map.dispose();
        if (myMesh.material.lightMap) myMesh.material.lightMap.dispose();
        if (myMesh.material.bumpMap) myMesh.material.bumpMap.dispose();
        if (myMesh.material.normalMap) myMesh.material.normalMap.dispose();
        if (myMesh.material.specularMap) myMesh.material.specularMap.dispose();
    }

   

    // Clear references to allow garbage collection
    myMesh = null;
}

