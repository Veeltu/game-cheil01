// Import the Three.js library
import * as THREE from 'three';

// Flag to prevent concurrent jump animations
let isJumping = false;

/**
 * Animates a mesh jumping.
 * 
 * @param {THREE.Mesh} mesh The mesh to animate.
 * @param {number} [jumpHeight=2] The height of the jump.
 * @param {number} [jumpDuration=1000] The duration of the jump in milliseconds.
 * @param {number} [moveZ=0] The distance to move along the Z axis during the jump.
 * @param {number} [moveX=0] The distance to move along the X axis during the jump.
 */
export function jumpAnimation(mesh, jumpHeight = 2, jumpDuration = 1000, moveZ = 0, moveX = 0) {
    // Check if a jump animation is already in progress
    if (isJumping) return;

    // Set the flag to prevent concurrent jumps
    isJumping = true;

    // Store the original position of the mesh
    const originalY = mesh.position.y;
    const originalZ = mesh.position.z;
    const originalX = mesh.position.x;

    // Record the start time of the animation
    const startTime = performance.now();

    /**
     * Animates a single frame of the jump.
     */
    function animateJump() {
        // Get the current time
        const currentTime = performance.now();

        // Calculate the elapsed time since the start of the animation
        const elapsedTime = currentTime - startTime;

        // Calculate the progress of the animation (between 0 and 1)
        const progress = Math.min(elapsedTime / jumpDuration, 1);

        // Define an easing function for a smooth animation
        const easeOutQuad = (t) => t * (1 - t);

        // Update the mesh's position based on the animation progress
        mesh.position.y = originalY + (easeOutQuad(progress) * jumpHeight);
        mesh.position.z = originalZ + (moveZ * progress);
        mesh.position.x = originalX + (moveX * progress);

        // Rotate the mesh during the jump (optional)
    // direction of rotate
        mesh.rotation.x = progress * -2 * Math.PI;


        // If the animation is not complete, request the next frame
        if (progress < 1) {
            requestAnimationFrame(animateJump);
        } else {
            // Reset the mesh's position after the jump
            mesh.position.y = originalY;

            // Allow another jump animation to start
            isJumping = false;
        }
    }

    // Start the animation
    animateJump();
}
