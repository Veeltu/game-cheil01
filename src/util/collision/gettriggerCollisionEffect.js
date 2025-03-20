export const triggerCollisionEffect = (mesh, HeroMesh) => {
    // Change color on collision
    // mesh.material.color.set(params.collisionColor); // Change to specified color on collision

    // Scale animation effect
    let scaleFactor = 0.4;
    const originalScale = mesh.scale.clone(); // Store original scale
    
    // Speed settings
    const scaleUpSpeed = 0.1; // Adjust this value for faster/slower scaling up
    const scaleDownSpeed = 0.2; // Adjust this value for faster/slower scaling down
    const maxScaleFactor = 0.9; // Maximum scale factor

    const animateScaleUp = () => {
        scaleFactor += scaleUpSpeed; // Increase scale factor

        const scaleUp = (el) => {
            el.scale.set(
                originalScale.x * Math.min(scaleFactor, maxScaleFactor),
                originalScale.y * Math.min(scaleFactor, maxScaleFactor),
                originalScale.z * Math.min(scaleFactor, maxScaleFactor)
            );
        };

        scaleUp(mesh);
        scaleUp(HeroMesh);

        if (scaleFactor < maxScaleFactor) {
            requestAnimationFrame(animateScaleUp);
        } else {
            // Start scaling down after reaching max size
            animateScaleDown();
        }
    };

    const animateScaleDown = () => {
        scaleFactor -= scaleDownSpeed; // Decrease scale factor

        const scaleDown = (el) => {
            el.scale.set(
                originalScale.x * Math.max(scaleFactor, 0.5), // Ensure it doesn't go below a certain size
                originalScale.y * Math.max(scaleFactor, 0.5),
                originalScale.z * Math.max(scaleFactor, 0.5)
            );
        };

        scaleDown(mesh);
        scaleDown(HeroMesh);

        if (scaleFactor > 1) {
            requestAnimationFrame(animateScaleDown);
        } else {
            HeroMesh.scale.set(0.2, 0.2, 0.2);
            // HeroMesh.scale.set(0.5, 0.5, 0.5);

            // Do not reset to original scale; keep the last scaled size
            // mesh.scale.copy(originalScale); 
            // HeroMesh.scale.copy(originalScale);
        }
    };

    animateScaleUp(); // Start scaling animation
}