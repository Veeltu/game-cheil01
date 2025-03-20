// import { animateHeroMesh } from "./util/animation/moveBox.js";
// import { jumpAnimation } from "./util/animation/jump.js";

// export const setupControls = (model) => {
//   let positionX;
//   const moveDistance = 1; // Distance to move

//   if (!model.name === "Hero") return;

//   window.addEventListener("keydown", (event) => {
//     if (!model) return;

//     switch (event.key) {
//       case "s":
//         model.position.z += moveDistance; 
//         break;
//       case "w":
//         model.position.z -= moveDistance; 
//         break;
//       case "d":
//         positionX = model.position.x;
//         if (positionX < 1) {
//           model.position.x += moveDistance;
//         } 
//         break;

//       case "a":
//         positionX = model.position.x;
//         if (positionX > -1) {
//           model.position.x -= moveDistance; 
//         } 
//         break;

//       case "q":
//         // (mesh, jumpHeight = 1, jumpDuration = 1000, moveZ = -2)
//         jumpAnimation(model, 8, 200, -2); // Wywołanie animacji skoku
//         break;
//       // case 'e':
//       //     model.position.y -= moveDistance;
//       //     break;
//       case "e":
//         // (mesh, jumpHeight = 1, jumpDuration = 1000, moveZ = -2)
//         jumpAnimation(model, 8, 200, 2); // Wywołanie animacji skoku
//         break;
//       // case 'e':
//       //     model.position.y -= moveDistance;
//       //     break;
//     }
//   });
// }

import { animateHeroMesh } from "./util/animation/moveBox.js";
import { jumpAnimation } from "./util/animation/jump.js";

export const setupControls = (model) => {
  let positionX;
  const moveDistance = 1; // Distance to move

  if (!model.name === "Hero") return;

  window.addEventListener("keydown", (event) => {
    if (!model) return;
    // (mesh, jumpHeight = 2, jumpDuration = 1000, moveZ = 0, moveX = 0) 

    switch (event.key) {
      case "s":
        // model.position.z += moveDistance; 
        jumpAnimation(model, 3, 200, 2);
        break;
      case "w":
        // model.position.z -= moveDistance; 
 //       jumpAnimation(model, 6, 200, -2);
        jumpAnimation(model, 6, 200, -1);

        break;
      case "d":
        positionX = model.position.x;
        jumpAnimation(model, 2, 150, 0, 1); // Dodaj parametr moveX
        if (positionX < 1) {
          // jumpAnimation(model, 3, 200, 0, 1); // Dodaj parametr moveX
          // model.position.x += moveDistance;
        } 
        break;

      case "a":
        positionX = model.position.x;
        jumpAnimation(model, 2, 150, 0, -1); // Dodaj parametr moveX
        if (positionX > -1) {
          // jumpAnimation(model, 3, 200, 0, -1); // Dodaj parametr moveX
          // model.position.x -= moveDistance; 
        } 
        break;

      case "q": // Skok do przodueq
        jumpAnimation(model, 6, 200, -2);
        break;
      case "e": // Skok do tyłu
        jumpAnimation(model, 3, 200, 2);
        break;
      case "r": // Skok w prawo
        jumpAnimation(model, 3, 200, 0, 2); // Dodaj parametr moveX
        break;
      case "f": // Skok w lewo
        jumpAnimation(model, 3, 200, 0, -2); // Dodaj parametr moveX
        break;
    }
  });
}

