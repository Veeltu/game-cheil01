import * as THREE from "three";

export function jumpAnimation(mesh, jumpHeight = 1, jumpDuration = 1000, distance = 2,direction = new THREE.Vector3(1, 0, 0)) {
    const originalY = mesh.position.y; // Store the original Y position
    const originalPosition = mesh.position.clone(); // Store the original position
    const startTime = performance.now(); // Get the current time

    // Normalize the direction vector to ensure consistent movement speed
    direction.normalize();

    function animateJumpAndMove() {
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime; // Calculate elapsed time

        // Calculate the progress of the jump (0 to 1)
        const progress = Math.min(elapsedTime / jumpDuration, 1);

        // Use an easing function for a smoother jump
        const easeInOutQuad = (t) => {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        };

        // Calculate new Y position using the easing function
        const newY = originalY + (easeInOutQuad(progress) * jumpHeight);

        // Calculate new position based on direction and progress
        const newX = originalPosition.x + (direction.x * distance * progress);
        const newZ = originalPosition.z + (direction.z * distance * progress);

        // Update mesh position
        mesh.position.y = newY;
        mesh.position.x = newX;
        mesh.position.z = newZ;

        // If the animation is not complete, request the next frame
        if (progress < 1) {
            requestAnimationFrame(animateJumpAndMove);
        } else {
            // Reset Y position after jumping down
            mesh.position.y = originalY; // Reset to original Y position after jump
            // Optionally keep final X and Z positions or reset them as needed
            // mesh.position.x = originalPosition.x; // Uncomment to reset X position after jump
            // mesh.position.z = originalPosition.z; // Uncomment to reset Z position after jump
        }
    }

    animateJumpAndMove(); // Start the jump and move animation
}

// Usage example:
// Assuming you have a mesh object already created and added to your scene
// const directionVector = new THREE.Vector3(-1, 0, 1); // Move in negative X and positive Z direction
// jumpAndMoveInDirection(yourMesh, 2, 1000, directionVector, 2); // Jump height of 2 units over 1 second and move in specified direction