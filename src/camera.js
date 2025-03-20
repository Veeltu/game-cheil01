import * as THREE from 'three';

export const createCamera = () => {
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
    // camera.position.set(0, 10, 10); // Set camera position
    // camera.position.set(5, 8, 10); // Set camera position
    // camera.position.set(5, 15, 15); // Set sscamera posiwwation
    // camera.position.set(9, 15, 10); // Set sscamera posiwwation
    camera.position.set(6, 8, 13); // Set sscamera posiwwation
    camera.lookAt(0, 0, 0); // Make sure the camera looks at the origin (where the box is)


    // const resolution = new Vector2(20, 20)

    // const initialPosition = new THREE.Vector3(
    //     resolution.x / 2 + 5,
    //     4,
    //     resolution.y / 2 + 4
    // )
    // camera.position.copy(initialPosition)


    return camera;
};


// camera.position.set(0, 6, 10); // Set camera position  x, y , distance
