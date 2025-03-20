


import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { getRandomIntFloor } from "./util/getRandomIntFloor";
import { getRandomInt } from "./util/getRandomInt";
import { removeMesh } from "./util/removeMesh";
import { animateBoom } from "./util/animation/boom";
import { checkCollision } from "./util/collision/getCheckCollision";
import { triggerCollisionEffect } from "./util/collision/gettriggerCollisionEffect";
import { removeBox } from "./util/collision/removeBox";
import { MyPoints } from './myPoints.js';
import { color } from "three/webgpu";



export const createScene = () => {
  // Parameters
  const params = {
    fogColor: 0x8ae9ff, // Fog color
    groundColor: 0x56f854, // Ground color
    gridColor: 0x56f854, // Grid color (red)d
    boxColor: 0x0000ff, // Box color (blue)
    collisionColor: 0xffff00,
  };

  // Points
  const pointsManager = MyPoints();
  
  // Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(params.fogColor, 10, 60);
  scene.background = new THREE.Color(params.fogColor);

  // Hero BoX
  const HeroMaterial = new THREE.MeshStandardMaterial({
    color: params.boxColor,
  });
  const HeroGeometry = new RoundedBoxGeometry(0.8, 0.8, 0.8, 0.8, 0.08);
  const HeroMesh = new THREE.Mesh(HeroGeometry, HeroMaterial);

  HeroMesh.position.set(0, 0.5, 0);
  HeroMesh.castShadow = true; // Enable shadow casting for the blue box
  HeroMesh.name = "Hero";
  scene.add(HeroMesh);

  // Create a ground plane
  const groundGeometry = new THREE.PlaneGeometry(10, 100);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: params.groundColor,
  });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);

  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = 0;
  groundMesh.receiveShadow = true;
  groundMesh.name = "Ground";
  scene.add(groundMesh);

  // Grid Helper with custom color
  const gridHelper = new THREE.GridHelper(
    5,
    5,
    params.gridColor,
    params.gridColor
  );
  gridHelper.name = "gridHelper";
  // scene.add(gridHelper);

//============================================================
//============================================================
//=== additionals ============================================
//============================================================
//============================================================

   const redBox =    {name:"redBox"  ,myColor: 0xff0000, mySpeed: 0.8, amoutPoints: 100, addPoints: false,}
   const greenBox =  {name:"greenBox" ,myColor: 0x00ff00, mySpeed: 0.1, amoutPoints: 200, addPoints: true,}
   const blueBox =   {name:"blueBox" ,myColor: 0x0000ff, mySpeed: 0.4, amoutPoints: 500, addPoints: true,}
  
  const createBox = (x, box) => {
    const {myColor, mySpeed, amoutPoints, addPoints} = box;

    const boxMaterial = new THREE.MeshStandardMaterial({
      color: myColor, 
    });
 
    const boxGeometry = new RoundedBoxGeometry(0.8, 0.8, 0.8, 1, 0.01);;
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.castShadow = true;

    let z = -30;

    const movebox = () => {
      if (z < 10) {
        z += mySpeed;
        boxMesh.position.set(x, 0.5, z);

        // Check for collision with the blue box
        if (checkCollision(boxMesh, HeroMesh, THREE)) {
          // pointsManager.addPoints(10);
          if (addPoints === true){
            pointsManager.addPoints(amoutPoints);
          }
          if (addPoints === false ) {
            pointsManager.subtractPoints(amoutPoints)
          }
          const removeBox = (box) => {
            const foundObject = scene.children.find(
              (obj) =>
                obj.position.x === box.position.x &&
                obj.position.y === box.position.y &&
                obj.position.z === box.position.z
            );
        
            if (foundObject) {
              removeMesh(foundObject, scene);
            } else {
              console.log("No object found at this position.");
            }
          };
          removeBox(boxMesh)

          triggerCollisionEffect(boxMesh, HeroMesh, params); // Call the effect function
          return; // Stop moving on collision
        }

        requestAnimationFrame(movebox);
      } else {
        // remove mesh if is on the end 
        removeMesh(boxMesh, scene);
      }
    };

    movebox();
    boxMesh.name = "box";
    scene.add(boxMesh);
  };
  
  const createBoxes = (box) => {
      let numberOfBoxes = 1; // Number of boxes to create

      for (let i = 0; i < numberOfBoxes; i++) {
          let x = getRandomIntFloor(-2, 2); // Random x position
          createBox(x, box); // Function to create a box at position x
      }
  
    };

    setInterval(() => {
      createBoxes(redBox)
    }, 1000)
    setInterval(() => {
      createBoxes(blueBox)
    }, 2000)
    setInterval(() => {
      createBoxes(greenBox)
    }, 200)
    
  return scene;
};
