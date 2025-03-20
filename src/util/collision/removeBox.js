export const removeBox = (box) => {
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