  // Function to trigger collision effect
  export const triggerCollisionEffect = (mesh, boxMesh) => {
    let boxPositionsAfterCollision = [];
    boxPositionsAfterCollision.push(mesh.position);

    // Change color on collision
    mesh.material.color.set(params.collisionColor); // Change to yellow on collision

    // Scale animation effect
    let scaleFactor = 1;
    const originalScale = mesh.scale.clone();

    const animateScale = () => {
      scaleFactor += 0.05; // Increase scale factor

      const scaleUp = (el) => {
        el.scale.set(
          originalScale.x * scaleFactor,
          originalScale.y * scaleFactor,
          originalScale.z * scaleFactor
        );
      };

      scaleUp(mesh);
      scaleUp(boxMesh);

      if (scaleFactor < 1.2) {
        // Scale up to 1.5 times original size
        requestAnimationFrame(animateScale);
      } else {
        // Reset scale after animation
        mesh.scale.copy(originalScale);
        boxMesh.scale.copy(originalScale);
      }
    };

    animateScale(); // Start scaling animation
  };

  // // store colisions position MAIN ARRAY
  // let boxPositionsAfterCollision = [];
  // const storeColisions = (mesh) => {
  //   boxPositionsAfterCollision.push(mesh.position);
  //   // console.log(boxPositionsAfterCollision)dd
  // };

  // Function to check for adjacent vectors
  const checkAdjacentVectors = (mesh) => {
    // remove duplicates
    let uniqueArray = boxPositionsAfterCollision.filter(
      (obj, index, self) =>
        index ===
        self.findIndex((t) => t.x === obj.x && t.y === obj.y && t.z === obj.z)
    );

    const removeBox = (box) => {
      console.log(box)
      const foundObject = scene.children.find(
        (obj) =>
          obj.position.x === box.x &&
          obj.position.y === box.y &&
          obj.position.z === box.z
      );

      if (foundObject) {
        console.log("Found object:", foundObject);

        removeMesh(foundObject, scene);
        console.log("Remove object:", foundObject);
      } else {
        console.log("No object found at this position.");
      }
    };

    const updateBoxAfterCollisionArray = (current, previous1, previous2) => {
      const objectsToRemove = [current, previous1, previous2];
      // update box array after colission
      boxPositionsAfterCollision = uniqueArray.filter(
        (obj) =>
          !objectsToRemove.some(
            (removeObj) =>
              obj.x === removeObj.x &&
              obj.y === removeObj.y &&
              obj.z === removeObj.z
          )
      );
    };

    for (let i = 2; i < uniqueArray.length; i++) {
      const current = uniqueArray[i];
      const previous1 = uniqueArray[i - 1];
      const previous2 = uniqueArray[i - 2];
      console.log(`Checking: ${previous2.x}, ${previous1.x}, ${current.x}`);

      if (
        current.x === previous1.x + 1 &&
        previous1.x === previous2.x + 1 &&
        current.y === previous1.y &&
        current.y === previous2.y &&
        current.z === previous1.z &&
        current.z === previous2.z
      ) {
        console.log("hit: Three vectors UP");

        updateBoxAfterCollisionArray(current, previous1, previous2);

        removeBox(current);
        removeBox(previous1);
        removeBox(previous2);

        console.log(scene.children)

        return;
      }
      if (
        current.x === previous1.x - 1 &&
        previous1.x === previous2.x - 1 &&
        current.y === previous1.y &&
        current.y === previous2.y &&
        current.z === previous1.z &&
        current.z === previous2.z
      ) {
        console.log("hit: Three vectors DOWN");

        updateBoxAfterCollisionArray(current, previous1, previous2);

        removeBox(current);
        removeBox(previous1);
        removeBox(previous2);

        console.log(scene.children)

        return;
      }
    }
  };

  //--------------------===================++++++++++++++++++++

