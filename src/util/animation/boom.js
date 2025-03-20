// boomAnimation.js

export const animateBoom = (mesh) => {
    let scaleFactor = 1;
    const originalScale = mesh.scale.clone();
    const boomScaleFactor = 1.5; // Scale up to 1.5 times original size
    const contractionScaleFactor = 0.5; // Scale down to 0.5 times original size
    let isBooming = false; // Flag to check if the boom effect is in progress

    const shakeAmount = 0.1; // Amount to shake
    const shakeDuration = 100; // Duration of shake in milliseconds
    let shakeStartTime = null; // Start time for shaking

    // Store the original position of the mesh for resetting later
    const originalPosition = mesh.position.clone();

    const scaleUp = (el, factor) => {
        el.scale.set(
            originalScale.x * factor,
            originalScale.y * factor,
            originalScale.z * factor
        );
    };

    const animateScaleUp = () => {
        scaleFactor += 0.05; // Increase scale factor

        scaleUp(mesh, Math.min(scaleFactor, boomScaleFactor));

        // Add shaking effect during scaling up
        if (shakeStartTime === null) shakeStartTime = performance.now();
        const elapsedTime = performance.now() - shakeStartTime;

        if (elapsedTime < shakeDuration) {
            const shakeOffsetX = (Math.random() - 0.5) * shakeAmount;
            const shakeOffsetY = (Math.random() - 0.5) * shakeAmount;
            mesh.position.x += shakeOffsetX;
            mesh.position.y += shakeOffsetY;
        } else {
            // Reset position after shaking duration
            mesh.position.set(originalPosition.x, originalPosition.y, originalPosition.z);
            shakeStartTime = null; // Reset shake start time
        }

        if (scaleFactor < boomScaleFactor) {
            requestAnimationFrame(animateScaleUp);
        } else {
            // Start contraction after reaching max scale
            animateScaleDown();
        }
    };

    const animateScaleDown = () => {
        scaleFactor -= 0.05; // Decrease scale factor

        scaleUp(mesh, Math.max(scaleFactor, originalScale.x * contractionScaleFactor));

        if (scaleFactor > originalScale.x) {
            requestAnimationFrame(animateScaleDown);
        } else {
            // Reset scale after contraction
            mesh.scale.copy(originalScale);

            // Reset position to original after contraction
            mesh.position.set(originalPosition.x, originalPosition.y, originalPosition.z);

            isBooming = false; // Reset the flag
        }
    };

    animateScaleUp(); // Start the scaling up animation
};