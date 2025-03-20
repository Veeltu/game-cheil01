import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { getRandomIntFloor } from "./util/getRandomIntFloor";
import { getRandomInt } from "./util/getRandomInt";
import { removeMesh } from "./util/removeMesh";
import { animateBoom } from "./util/animation/boom";
import { checkCollision } from "./util/collision/getCheckCollision";
import { triggerCollisionEffect } from "./util/collision/gettriggerCollisionEffect";
import { removeBox } from "./util/collision/removeBox";
import { MyPoints } from "./myPoints.js";
import { add, color } from "three/webgpu";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { setupControls } from "./controls.js";
import { animateHeroMesh} from "./util/animation/moveBox.js"
import { addInterval } from "./util/addInterval.js";

export const createScene = () => {
  // Parameters
  const params = {
    fogColor: 0x8ae9ff, // Fog color
    fogColor: 0x000000, // Fog color
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
  // const HeroMaterial = new THREE.MeshStandardMaterial({
  //   color: params.boxColor,
  // });
  // const HeroGeometry = new RoundedBoxGeometry(0.8, 0.8, 0.8, 0.8, 0.08);
  // const HeroMesh = new THREE.Mesh(HeroGeometry, HeroMaterial);

  // HeroMesh.position.set(0, 0.5, 0);
  // HeroMesh.castShadow = true; // Enable shadow casting for the blue box
  // HeroMesh.name = "Hero";
  // scene.add(HeroMesh);

  let HeroMesh;

  const loader = new GLTFLoader();

  loader.load(
    "../src/img/piggy_bank.glb",
    // "../src/img/box.glb",
    function (gltf) {
      HeroMesh = gltf.scene;

      // Set position and scale
      HeroMesh.position.set(0, 0.4, 0);
      HeroMesh.scale.set(0.2, 0.2, 0.2);

             // Set position and scale
             HeroMesh.rotation.y = Math.PI / 2;
             // HeroMesh.rotation.z = -Math.PI / 2;
     
            //  setInterval(() => {
            //    HeroMesh.rotation.z += 0.4
            //  },50)

      

      // Enable shadow casting
      HeroMesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          // Change color for specific meshes
          // switch (child.name) {
          //   case "box":
          //     child.material.color.set(0xff0000);
          //     break;
          //   case "ribbon_1":
          //     // child.material.color.set(0xff0000);
          //     child.material.color.set(0xffffff);
          //     break;
          //   case "ribbon_2":
          //     child.material.color.set(0xffffff);
          //     break;
          //   case "ribbon_3":
          //     break;
          //   case "ribbon_4":
          //     // child.material.color.set(0xffff00);
          //     break;
          //   case "ribbon_5":
          //     // child.material.color.set(0xff00ff);
          //     break;
          //   case "ribbon_greem_ribbon":
          //     // child.material.color.set(0x00ffff);
          //     break;
          //   default:
          //     // console.warn(`No color set for mesh: ${child.name}`);
          // }
        }
      });

      HeroMesh.name = "Hero";
      scene.add(HeroMesh);
      // console.log(HeroMesh)
      // Call setupControls after loading the model

      setupControls(HeroMesh);
      // animateHeroMesh(HeroMesh);
    },
    undefined,
    function (error) {
      console.error("Error loading GLTF model:", error);
    }
  );

  // Create a ground plane
  const groundGeometry = new THREE.PlaneGeometry(4, 100);
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


  const redBox = {
    name: "redBox",
    myColor: 0xff0000,
    mySpeed: 0.8,
    amoutPoints: 100,
    addPoints: false,
  };
  const goldCoin = {
    name: "goldCoin",
    myColor: 0xffcf40,
    // myColor: 0xefbf04,
    mySpeed: 0.1,
    amoutPoints: 200,
    addPoints: true,
    number: 1,
    src:"../src/img/coin.glb",
  };
  const blueBox = {
    name: "blueBox",
    myColor: 0x0000ff,
    mySpeed: 0.4,
    amoutPoints: 500,
    addPoints: true,
  };

  const createBox = async (x, box, path, type) => {
    const { myColor, mySpeed, amoutPoints, addPoints } = box;

    let object;

    try {
        const gltf = await loader.loadAsync(path);
        object = gltf.scene;
          // Set position and scale
          object.position.set(x, 0.5, -30); // Initial position
          object.scale.set(0.3, 0.3, 0.3); // Scale can be adjusted as needed
          object.rotation.x = -Math.PI / 2;

          setInterval(() => {
            object.rotation.z += 0.4
          },50)

        // Enable shadow casting
        object.traverse((child) => {
            if (child.isobject) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.color.set(myColor);
                child.material.emissive = new THREE.Color(myColor); // White emissive color
                // child.material.emissive = new THREE.Color(0xFFFFFF); // White emissive color
                child.material.emissiveIntensity = 0.01; // Adjust intensity as needed
            }
        });

        object.name = "Coin";
        scene.add(object);

    } catch (error) {
        console.error("Error loading GLTF model:", error);
        alert("Failed to load the box model.");
        return; // Exit if loading fails
    }

    
    let z = -30; // Start position Z of the box
    const movebox = (object, HeroMesh, THREE, box) => {
        if (z < 10) {
            z += mySpeed;
            object.position.set(x, 0.5, z);
  
            // Check for collision with the hero
            if (checkCollision(object, HeroMesh, THREE)) {
                if (addPoints) {
                    pointsManager.addPoints(amoutPoints);
                } else {
                    pointsManager.subtractPoints(amoutPoints);
                }
  
                removeBox(object); // Remove the box on collision
                triggerCollisionEffect(object, HeroMesh, params); // Call the effect function
                return; // Stop moving on collision
            }
  
            requestAnimationFrame(movebox);
        } else {
            removeMesh(object, scene); // Remove mesh if it reaches the end
        }
    };
    
    movebox();
  };


// Helper function to remove the box from the scene
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

const coin = "../src/img/coin.glb"
const stone01 = "../src/img/my-stone-01.glb"


  const createBoxes = (box, amout, item) => {
    let numberOfBoxes = amout; // Number of boxes to create

    for (let i = 0; i < numberOfBoxes; i++) {
      let x = getRandomIntFloor(-1, 1); // Random x position
      // let x = getRandomIntFloor(-2, 2); // Random x position
      createBox(x, box, item); // Function to create a box at position x
    }
  };

  setInterval(() => {
    createBoxes(redBox,1,coin);
  }, 1000);
  setInterval(() => {
    createBoxes(blueBox,1,coin);
  }, 2000);
  setInterval(() => {
    createBoxes(goldCoin,getRandomIntFloor(0,2),coin);
  }, 400);

  // setInterval(() => {
  //   createBoxes(goldCoin,getRandomIntFloor(0,2),stone01);
  // }, 400);


  return scene;
};
