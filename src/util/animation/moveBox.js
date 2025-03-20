export function animateHeroMesh(mesh) {
    let totalRotation = 0; // Variable to track total rotation
    const rotationSpeed = 0.2; // Speed of rotation in radians
    const targetRotation = Math.PI / 3; // Target rotation in radians (45 degrees)

    function animate() {
        requestAnimationFrame(animate);

        // Update objects
        if (totalRotation < targetRotation) { // Check if less than 45 degrees
            mesh.rotation.y += rotationSpeed; // Rotate the mesh
            totalRotation += rotationSpeed; // Update total rotation

            // Optional: Clamp the totalRotation to not exceed targetRotation
            if (totalRotation > targetRotation) {
                totalRotation = targetRotation; // Ensure it doesn't exceed 45 degrees
                mesh.rotation.y = totalRotation; // Set the final rotation value
            }
        }

        // Optionally, render the scene if needed
    }

    // animate(); // Start the animation loop
}

/**
 * Animate
 */
// let time = Date.now()

// const tick = () =>
// {
// 		// Time
//     const currentTime = Date.now()
//     const deltaTime = currentTime - time
//     time = currentTime

//     // Update objects
//     mesh.rotation.y += 0.01 * deltaTime

//     // ...
// }

// tick()

// function animate() {
//     requestAnimationFrame(animate);

//     if (HeroMesh) {
//         HeroMesh.position.x += moveDirection * moveDistance;
//         HeroMesh.position.y += Math.sin(Date.now() * 0.001 * swayFrequency) * swayAmplitude;

//         if (HeroMesh.position.x > 0.5 || HeroMesh.position.x < -0.5) {
//             moveDirection *= -1; // Change direction
//         }
//     }

//     // renderer.render(scene, camera); // Render the scene
// }