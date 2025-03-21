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
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { setupControls } from "./controls.js";
import { animateHeroMesh} from "./util/animation/moveBox.js"
import { addInterval } from "./util/addInterval.js";

export const createScene = () => {
  // Parameters
  const params = {
    fogColor: 0x8ae9ff, // Fog color
    // fogColor: 0x000000, // Fog color
    groundColor: 0x56f854, // Ground color
    gridColor: 0x56f854, // Grid color (red)d
    boxColor: 0x0000ff, // Box color (blue)
    collisionColor: 0xffff00,
  };

  // Points
  const pointsManager = MyPoints();

  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(params.fogColor);
  scene.fog = new THREE.Fog(params.fogColor, 6, 40)

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
    "../img/piggy_bank.glb",
    // "../img/box.glb",
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


  const flower1 = {
    src: "../img/flower1.glb", // Ensure path is correct and accessible
    scale: [0.5, 0.3, 0.5],
    number: 20,
  };

  const stoneConfig = {
    src: "../img/my-stone-01.glb", // Ensure path is correct and accessible
    scale: [0.3, 0.3, 0.3],
    number: 30,
  };
  const tree1 = {
    src: "../img/tree1.glb", // Ensure path is correct and accessible
    scale: [0.3, 0.3, 0.3],
    number: 30,
  };
  const tree2 = {
    src: "../img/tree2.glb", // Ensure path is correct and accessible
    scale: [0.3, 0.3, 0.3],
    number: 30,
  };
  const grass1 = {
    src: "../img/grass1.glb", // Ensure path is correct and accessible
    scale: [0.3, 0.3, 0.3],
    number: 100,
  };
  const grass2 = {
    src: "../img/grass2.glb", // Ensure path is correct and accessible
    scale: [0.3, 0.3, 0.3],
    number: 100,
  };
  const grass3 = {
    src: "../img/grass3.glb", // Ensure path is correct and accessible
    scale: [0.3, 0.3, 0.3],
    number: 100,
  };
  const addObject = (config) => {
    for (let i = 0; i < config.number; i++) {
      loader.load(
        config.src,
        (gltf) => {
          const object = gltf.scene;
  
          let x, z;
  
          // Special handling for trees
          if (config.src.includes("tree")) {
            // Generate positions further away from the center
            x = getRandomIntFloor(-20, -5) || getRandomIntFloor(10, 20);
            // x = getRandomIntFloor(-10, 10) ;
            z = getRandomIntFloor(-10, 10);
          } else {
            x = getRandomIntFloor(-20, 20);
            z = getRandomIntFloor(-20, 20);
          }
  
          const y = 0;
  
          // Adjust position if within a certain range
          if (x > -5 && x < 5) {
            x += 10;
          }
  
          object.position.set(x, y, z);
          object.scale.set(...config.scale);
  
          object.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add(object);
        },
        undefined,
        (error) => console.error("Error loading model:", error)
      );
    }
  };
  

  addObject(flower1);
  addObject(stoneConfig);
  addObject(tree1);
  addObject(tree2);
  addObject(grass1);
  addObject(grass2);
  addObject(grass3);
  

  // Create a ground plane
  // const groundGeometry = new THREE.PlaneGeometry(3, 10);
  // const groundGeometry = new THREE.PlaneGeometry(20, 100);
  const groundGeometry = new THREE.PlaneGeometry(50, 50);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: params.collisionColor,
  });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);


  

  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = 0;
  groundMesh.receiveShadow = true;
  groundMesh.name = "Ground";
  scene.add(groundMesh);

  // Grid Helper with custom color
  // const gridHelper = new THREE.GridHelper(
  //   3,
  //   3,
  //   params.boxColor,
  //   params.boxColor
  // );
  // gridHelper.name = "gridHelper";
  // scene.add(gridHelper);

  const resolution = new THREE.Vector2(10, 10)
  const gridHelper = new THREE.GridHelper(
    resolution.x,
    resolution.y,
    0xffffff,
    0xffffff
  )
  // gridHelper.position.set(resolution.x / 2 - 0.5, -0.49, resolution.y / 2 - 0.5)


  scene.add(gridHelper)

  //============================================================
  //============================================================
  //=== additionals ============================================
  //============================================================
  //============================================================

  const redBox = {
    name: "redBox",
    myColor: 0xff0000,
    mySpeed: 0.8,
    amountPoints: 100,
    addPoints: false,
  };
  
  const goldCoin = {
    name: "goldCoin",
    type: "coin",
    myColor: 0xff8080,
    mySpeed: 0.1,
    amountPoints: 200,
    addPoints: true,
    number: 1,
    src: "../img/coin.glb",
  };
  const goldCoindown = {
    name: "goldCoin",
    type: "coin-down",
    myColor: 0xffcf40,
    mySpeed: 0.1,
    amountPoints: 200,
    addPoints: true,
    number: 1,
    src: "../img/coin.glb",
  };
  const myStone01 = {
    name: "myStone01",
    type: "stone",
    myColor: 0xffcf40,
    mySpeed: 0.1,
    amountPoints: 200,
    addPoints: true,
    number: 1,
    src: "../img/my-stone-01.glb",
  };
  
  const blueBox = {
    name: "blueBox",
    myColor: 0x0000ff,
    mySpeed: 0.4,
    amountPoints: 500,
    addPoints: true,
  };
  
  // Function to create a box or coin in the scene
  const createBox = async (initialPositionX, newObject) => {
    const { name,type, myColor, mySpeed, amountPoints, addPoints, number, src } = newObject;
    
    if (!newObject)return;

    let object;
  
    try {
      // const gltf = await loader.loadAsync(src || "../img/coin.glb");
      // const gltf = await loader.loadAsync("../img/box.glb");
      const gltf = await loader.loadAsync(src);
      object = gltf.scene;

      let initialPositionY;
      
      
      if (type === "coin"){
        initialPositionY = 2
        object.scale.set(0.3, 0.3, 0.3);
        object.rotation.x = -Math.PI / 2;
        setInterval(() => {
          object.rotation.z += 0.4;
        }, 50);
        
      }
      if (type === "coin-down"){
        initialPositionY = 0.4
        object.scale.set(0.3, 0.3, 0.3);
        object.rotation.x = -Math.PI / 2;
        setInterval(() => {
          object.rotation.z += 0.4;
        }, 50);
        
      }
      if (type === "stone"){
        object.scale.set(0.5, 0.5, 0.5);
          initialPositionY = 0
          
        }
  

      // Set position and scale
      
      // Rotate the object continuously
      
      // Enable shadow casting and set material properties
      // console.log(object.children)
      // const childs = object.children
      
      object.traverse((child) => {
          child.castShadow = true;
          child.receiveShadow = true;

               // Change color for specific meshes
          // switch (child.name) {
          //   case "Cylinder001":
          //   child.material.color.set(myColor);
          //    child.material.emissive = new THREE.Color(myColor);
          // child.material.emissiveIntensity = 0.1;
          //     break;
          //   case "Cylinder001_1":
          //   child.material.color.set(myColor);
          //    child.material.emissive = new THREE.Color(myColor);
          // child.material.emissiveIntensity = 0.1;
          //     break;
          // }
      });
  
      object.name = name;
      scene.add(object);

        moveObject(object, initialPositionX,initialPositionY, mySpeed, amountPoints, addPoints);
  
    } catch (error) {
      console.error("Error loading GLTF model:", error);
      // alert("Failed to load the box model.");
      return; 
    }
  };
  
  // Function to move the created object
  const moveObject = (object, initialPositionX,initialPositionY, mySpeed, amountPoints, addPoints) => {
    let z = -30; // Start position Z of the box
  
    const movingObject = () => {
      if (z < 10) {
        z += mySpeed;
        object.position.set(initialPositionX, initialPositionY, z);
  
          // Check for collision with the hero
          if (checkCollision(object, HeroMesh, THREE)) {
              if (addPoints) {
                  pointsManager.addPoints(amountPoints);
                } else {
                    pointsManager.subtractPoints(amountPoints);
                  }
                
                  removeBox(object); // Remove the box on collision
                  triggerCollisionEffect(object, HeroMesh); // Call the effect function
                  return; // Stop moving on collision
                }
  
        requestAnimationFrame(movingObject);
      } else {
        removeMesh(object, scene); // Remove mesh if it reaches the end
      }
    };
  
    movingObject();
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
  
  // Function to create multiple objects based on the configuration
  const createNewObject = (newObject) => {
    
    for (let i = 0; i < newObject.number; i++) {
      let initialPositionX = getRandomIntFloor(-1, 1); // Random x position
      createBox(initialPositionX, newObject); // Function to create a box at position x
    }
  };
  
  // Periodically create new objects in the scene
  setInterval(() => {
     createNewObject(goldCoin);
  }, 1500);
  setInterval(() => {
     createNewObject(goldCoindown);
  }, 500);
  // setInterval(() => {
  //    createNewObject(myStone01);
  // }, 500);
  
  // Return the scene for further manipulation or rendering


  return scene;
}

