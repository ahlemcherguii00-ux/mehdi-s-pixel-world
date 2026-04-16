// document.addEventListener("DOMContentLoaded", async function() {
//     const start = document.getElementById("start-button");
//     const welcomePage = document.getElementById("welcome-page");

//     const character = document.getElementById("character");
//     const mapContainer = document.getElementById("map-container");
//     const mapImage = document.getElementById("map-img");
//     const mapWidth = mapImage.width;

//     const clue = document.getElementById("clue");
//     const collectClue = document.getElementById("collect-heart");

//     const almostFinalPopup = document.getElementById("almost-final-popup");
//     const closeAlmost = document.getElementById("close-almost");

//     const finalPopup = document.getElementById("final-popup");
//     const yes = document.getElementById("yes");

//     var confetti = document.getElementById("confetti");

//     var hearts = 0;
//     var doneClues = [];

//     start.addEventListener("click", () => {
//         console.log("start clicked!");
//         welcomePage.classList.add("start-game");
//     });

//     yes.addEventListener("click", () => {
//         confetti.classList.add("confetti-show");
//     });

//     collectClue.addEventListener("click", () => {
//         clue.classList.remove("clue-show");
//     });

//     closeAlmost.addEventListener("click", () => {
//         almostFinalPopup.classList.remove("clue-show");
//     });

//     setInterval(checkChest, 100);
//     setInterval(checkGoal, 100);

//     function checkChest() {
//         const chests = document.getElementsByClassName("chest");

//         var charTop = parseInt(
//             window.getComputedStyle(character).top.replace(/\D/g, ""),
//             10
//         );
//         var charLeft = parseInt(
//             window.getComputedStyle(character).left.replace(/\D/g, ""),
//             10
//         );
//         for (let item of chests) {
//             var top = parseInt(
//                 window.getComputedStyle(item).top.replace(/\D/g, ""),
//                 10
//             );
//             var left = parseInt(
//                 window.getComputedStyle(item).left.replace(/\D/g, ""),
//                 10
//             );

//             if (
//                 areCoordinatesClose({ x: left, y: top }, { x: charLeft, y: charTop })
//             ) {
//                 console.log("close to chest!!");

//                 //open chest
//                 if (item.classList.contains("r")) {
//                     console.log("right chest");
//                     item.src = "img/chest-r-open.png";
//                 } else if (item.classList.contains("l")) {
//                     console.log("right chest");
//                     item.src = "img/chest-l-open.png";
//                 }

//                 //count and tracking
//                 if (!doneClues.includes(item.id)) {
//                     //popup
//                     clue.classList.add("clue-show");

//                     console.log("new heart found!!!");
//                     hearts++;
//                     doneClues.push(item.id);
//                 } else {
//                     console.log("alr found heart");
//                 }
//             }
//         }
//     }

//     function checkGoal() {
//         const goal = document.getElementById("character2");

//         var charTop = parseInt(
//             window.getComputedStyle(character).top.replace(/\D/g, ""),
//             10
//         );
//         var charLeft = parseInt(
//             window.getComputedStyle(character).left.replace(/\D/g, ""),
//             10
//         );

//         var top = parseInt(
//             window.getComputedStyle(goal).top.replace(/\D/g, ""),
//             10
//         );
//         var left = parseInt(
//             window.getComputedStyle(goal).left.replace(/\D/g, ""),
//             10
//         );
//         if (areCoordinatesClose({ x: left, y: top }, { x: charLeft, y: charTop })) {
//             console.log("close to goal!!");
//             if (hearts < 3) {
//                 almostFinalPopup.classList.add("clue-show");
//             } else {
//                 finalPopup.classList.add("clue-show");
//             }
//         }
//     }

//     function areCoordinatesClose(a, b, threshold = 50) {
//         // Check if the absolute difference between x coordinates and y coordinates are both within the threshold
//         const isXClose = Math.abs(a.x - b.x) <= threshold;
//         const isYClose = Math.abs(a.y - b.y) <= threshold;

//         // Return true if both x and y coordinates are within the threshold
//         return isXClose && isYClose;
//     }

//     // Set initial position of the character
//     let characterX = 50; // in %
//     let characterY = 98; // in %

//     // Initial position of map
//     const translateX = -30; // in pixels
//     const translateY = -80; // in pixels

//     var oldX;
//     var oldY;

//     mapContainer.style.transform = `translate(${translateX}%, ${translateY}%)`;

//     function resizeCollisionMap(originalMap, targetWidth, targetHeight) {
//         // Get the original map dimensions
//         const originalWidth = originalMap.length;
//         const originalHeight = originalMap[0].length;

//         // Calculate the scaling factors
//         const scaleX = targetWidth / originalWidth;
//         const scaleY = targetHeight / originalHeight;

//         // Create a new empty collision map with the target size
//         const resizedMap = new Array(targetWidth);

//         for (let x = 0; x < targetWidth; x++) {
//             resizedMap[x] = new Array(targetHeight);
//             for (let y = 0; y < targetHeight; y++) {
//                 // Map the coordinates from the target size to the original size
//                 const originalX = Math.floor(x / scaleX);
//                 const originalY = Math.floor(y / scaleY);

//                 // Copy the value from the original map to the resized map
//                 resizedMap[x][y] = originalMap[originalX][originalY];
//             }
//         }

//         return resizedMap;
//     }

//     // Load the collision map JSON
//     let collisionMap;

//     try {
//         const response = await fetch("json/collision_map.json");
//         collisionMap = await response.json();
//         console.log(
//             "Collision map loaded successfully. Rows:",
//             collisionMap.length,
//             "Columns:",
//             collisionMap[0].length
//         );
//     } catch (error) {
//         console.error("Error loading collision map:", error);
//         return; // Stop execution if there's an error loading the collision map
//     }

//     // Original collision map dimensions
//     const originalWidth = collisionMap[0].length;
//     const originalHeight = collisionMap.length;

//     // Target dimensions (3000 by 3000)
//     const targetWidth = 3000;
//     const targetHeight = 3000;

//     // Resize collision map
//     collisionMap = resizeCollisionMap(collisionMap, targetWidth, targetHeight);

//     // Print map container and resized collision map dimensions
//     console.log(
//         "Map container dimensions:",
//         mapContainer.clientWidth,
//         "x",
//         mapContainer.clientHeight
//     );
//     console.log(
//         "Resized collision map dimensions:",
//         collisionMap[0].length,
//         "x",
//         collisionMap.length
//     );

//     // Character position on the collision map
//     const collisionMapX = Math.floor((characterX / 100) * collisionMap[0].length);
//     const collisionMapY = Math.floor((characterY / 100) * collisionMap.length);
//     console.log(
//         "Character position on the collision map. X:",
//         collisionMapX,
//         "Y:",
//         collisionMapY
//     );

//     function checkCollision(newX, newY) {
//         // Convert character's percentage position to collision map coordinates
//         const collisionMapX = Math.floor(
//             (newX / 100) * (collisionMap[0].length - 1)
//         );
//         const collisionMapY = Math.floor((newY / 100) * (collisionMap.length - 1));

//         // Check if the character is within the collision map boundaries
//         if (
//             collisionMapY < 0 ||
//             collisionMapY >= collisionMap.length ||
//             collisionMapX < 0 ||
//             collisionMapX >= collisionMap[0].length
//         ) {
//             console.log("Collision with collision map boundaries");
//             return true; // Collision with collision map boundaries
//         }

//         // Check for collision with obstacles (0 represents collision)
//         const collisionValue = collisionMap[collisionMapY][collisionMapX];
//         console.log(
//             `Collision check at X: ${collisionMapX}, Y: ${collisionMapY} - Collision Value: ${collisionValue}`
//         );

//         return collisionValue === 0; // Adjusted condition for collision
//     }
//     // Function to update the character's position
//     function updateCharacterPosition() {
//         character.style.left = `${characterX}%`;
//         character.style.top = `${characterY}%`;

//         // Center the map around the character
//         const translateX = -characterX + 22;
//         const translateY = -characterY + 10;

//         //update background image
//         var bgX = 50;
//         var bgY = 0;

//         // console.log(
//         //   "Character step difference: \n" +
//         //     oldX +
//         //     ", " +
//         //     parseInt(oldY) +
//         //     +" \nto: " +
//         //     characterX +
//         //     ", " +
//         //     characterY
//         // );

//         console.log("Old character Position: X:", oldX, "Y:", oldY);

//         console.log("Character Position: X:", characterX, "Y:", characterY);
//         console.log("Map Container Translation: X:", translateX, "Y:", translateY);

//         if (
//             translateY > -80 &&
//             translateY < 0 &&
//             translateX < 0 &&
//             translateX > -55
//         ) {
//             mapContainer.style.transform = `translate(${translateX}%, ${translateY}%)`;
//             oldX = translateX;
//             oldY = translateY;
//         } else if (translateY > -80 && translateY < 0) {
//             mapContainer.style.transform = `translate(${oldX}%, ${translateY}%)`;
//             oldY = translateY;
//         } else if (translateX < 0 && translateX > -55) {
//             mapContainer.style.transform = `translate(${translateX}%, ${oldY}%)`;
//             oldX = translateX;
//         } else {
//             console.log("nope");
//         }
//     }

//     let currentDirection = "up";
//     let isWalking = false;

//     // Function to handle keyboard input
//     function handleKeyPress(event) {
//         const step = 0.5; // Adjust as needed for finer movement

//         let newCharacterX = characterX;
//         let newCharacterY = characterY;

//         // Update direction only if an arrow key is pressed
//         if (event.key.includes("Arrow")) {
//             currentDirection = event.key.replace("Arrow", "").toLowerCase();
//             isWalking = true;
//         }

//         // Update character sprite based on the current direction
//         character.style.backgroundImage = `url('img/char-${currentDirection}.png')`;

//         // Update character position based on the current direction
//         switch (currentDirection) {
//             case "up":
//                 newCharacterY -= step;
//                 break;
//             case "down":
//                 newCharacterY += step;
//                 break;
//             case "left":
//                 newCharacterX -= step;
//                 break;
//             case "right":
//                 newCharacterX += step;
//                 break;
//         }

//         // Check for collision before updating character position
//         if (!checkCollision(newCharacterX, newCharacterY)) {
//             console.log("No collision. Updating character position.");
//             characterX = newCharacterX;
//             characterY = newCharacterY;
//         } else {
//             console.log("Collision detected. Character not moved.");
//         }

//         updateCharacterPosition();
//     }

//     // Add event listener for keyboard input
//     document.addEventListener("keydown", handleKeyPress);

//     // Initialize the character position
//     updateCharacterPosition();
// });

document.addEventListener("DOMContentLoaded", async function () {
  const start = document.getElementById("start-button");
  const welcomePage = document.getElementById("welcome-page");

  const character = document.getElementById("character");
  const mapContainer = document.getElementById("map-container");
  const mapImage = document.getElementById("map-img");
  const mapWidth = mapImage.width;

  const clue = document.getElementById("clue");
  const collectClue = document.getElementById("collect-heart");

  const almostFinalPopup = document.getElementById("almost-final-popup");
  const closeAlmost = document.getElementById("close-almost");

  const finalPopup = document.getElementById("final-popup");
  const yes = document.getElementById("yes");

  var confetti = document.getElementById("confetti");

  var hearts = 0;
  var doneClues = [];
  const heartCounter = document.getElementById("heart-counter");

  //set counter
  heartCounter.innerHTML = "" + hearts + " / 3";

  //audio
  var audio = document.getElementById("myAudio");
  var chestAudio = document.getElementById("chestAudio");

  var hasUserInteracted = false;

  document.addEventListener("click", function () {
    if (!hasUserInteracted) {
      hasUserInteracted = true;
      //   console.log(
      //     "User has interacted with the document. Starting audio playback..."
      //   );

      // Autoplay and loop the audio when the user interacts with the document
      audio.autoplay = true;
      audio.loop = true;
      audio.play();
    }
  });

  start.addEventListener("click", () => {
    // console.log("start clicked!");
    welcomePage.classList.add("start-game");
  });

  yes.addEventListener("click", () => {
    confetti.classList.add("confetti-show");
  });

  collectClue.addEventListener("click", () => {
    clue.classList.remove("clue-show");
  });

  closeAlmost.addEventListener("click", () => {
    almostFinalPopup.classList.remove("clue-show");
  });

  setInterval(checkChest, 100);
  setInterval(checkGoal, 100);
  let chestFoundRecently = false;

  function checkChest() {
    if (chestFoundRecently) {
      return;
    }
    const chests = document.getElementsByClassName("chest");

    var charTop = parseInt(
      window.getComputedStyle(character).top.replace(/\D/g, ""),
      10
    );
    var charLeft = parseInt(
      window.getComputedStyle(character).left.replace(/\D/g, ""),
      10
    );

    for (let item of chests) {
      var top = parseInt(
        window.getComputedStyle(item).top.replace(/\D/g, ""),
        10
      );
      var left = parseInt(
        window.getComputedStyle(item).left.replace(/\D/g, ""),
        10
      );
      // console.log(
      //     "chest position: " +
      //     left +
      //     ", " +
      //     top +
      //     "char position:" +
      //     charTop +
      //     ", " +
      //     charLeft
      // );

      if (
        areCoordinatesClose({ x: left, y: top }, { x: charLeft, y: charTop })
      ) {
        // console.log("close to chest!!");

        //open chest
        if (item.classList.contains("r")) {
          //   console.log("right chest");
          item.src = "img/chest-r-open.png";
        } else if (item.classList.contains("l")) {
          //   console.log("right chest");
          item.src = "img/chest-l-open.png";
        }

        //count and tracking
        if (!doneClues.includes(item.id)) {
          //popup
          clue.classList.add("clue-show");

          //sound
          chestAudio.play();

          //   console.log("new heart found!!!");
          hearts++;

          //set counter
          heartCounter.innerHTML = "" + hearts + " / 3";

          doneClues.push(item.id);
          //   console.log(item.id + "found!");
          // Set the flag to true to prevent further calls to checkChest until next interval
          chestFoundRecently = true;

          setTimeout(() => {
            chestFoundRecently = false;
          }, 1000); // Set a delay (in milliseconds) before allowing the function to be called again
        } else {
          //   console.log("alr found heart");
        }
      }
    }
  }

  function checkGoal() {
    const goal = document.getElementById("character2");

    var charTop = parseInt(
      window.getComputedStyle(character).top.replace(/\D/g, ""),
      10
    );
    var charLeft = parseInt(
      window.getComputedStyle(character).left.replace(/\D/g, ""),
      10
    );

    var top = parseInt(
      window.getComputedStyle(goal).top.replace(/\D/g, ""),
      10
    );
    var left = parseInt(
      window.getComputedStyle(goal).left.replace(/\D/g, ""),
      10
    );
    if (areCoordinatesClose({ x: left, y: top }, { x: charLeft, y: charTop })) {
      //   console.log("close to goal!!");
      if (hearts < 3) {
        almostFinalPopup.classList.add("clue-show");
      } else {
        finalPopup.classList.add("clue-show");
      }
    }
  }

  function areCoordinatesClose(a, b, threshold = 150) {
    // Check if the absolute difference between x coordinates and y coordinates are both within the threshold
    const isXClose = Math.abs(a.x - b.x) <= threshold;
    const isYClose = Math.abs(a.y - b.y) <= threshold;

    // Return true if both x and y coordinates are within the threshold
    return isXClose && isYClose;
  }

  // Set initial position of the character
  let characterX = 50; // in %
  let characterY = 98; // in %

  // Initial position of map
  const translateX = -30; // in %
  const translateY = -(100 - 100 * (window.innerHeight / mapWidth)); // in pixels

  var oldX;
  var oldY;

  mapContainer.style.transform = `translate(${translateX}%, ${translateY}%)`;

  function resizeCollisionMap(originalMap, targetWidth, targetHeight) {
    // Get the original map dimensions
    const originalWidth = originalMap.length;
    const originalHeight = originalMap[0].length;

    // Calculate the scaling factors
    const scaleX = targetWidth / originalWidth;
    const scaleY = targetHeight / originalHeight;

    // Create a new empty collision map with the target size
    const resizedMap = new Array(targetWidth);

    for (let x = 0; x < targetWidth; x++) {
      resizedMap[x] = new Array(targetHeight);
      for (let y = 0; y < targetHeight; y++) {
        // Map the coordinates from the target size to the original size
        const originalX = Math.floor(x / scaleX);
        const originalY = Math.floor(y / scaleY);

        // Copy the value from the original map to the resized map
        resizedMap[x][y] = originalMap[originalX][originalY];
      }
    }

    return resizedMap;
  }

  // Load the collision map JSON
  let collisionMap;

  try {
    const response = await fetch("json/collision_map2.json");
    collisionMap = await response.json();
    // console.log(
    //   "Collision map loaded successfully. Rows:",
    //   collisionMap.length,
    //   "Columns:",
    //   collisionMap[0].length
    // );
  } catch (error) {
    // console.error("Error loading collision map:", error);
    return; // Stop execution if there's an error loading the collision map
  }

  // Original collision map dimensions
  const originalWidth = collisionMap[0].length;
  const originalHeight = collisionMap.length;

  // Target dimensions (3000 by 3000)
  const targetWidth = 3000;
  const targetHeight = 3000;

  // Resize collision map
  collisionMap = resizeCollisionMap(collisionMap, targetWidth, targetHeight);

  // Print map container and resized collision map dimensions
  //   console.log(
  //     "Map container dimensions:",
  //     mapContainer.clientWidth,
  //     "x",
  //     mapContainer.clientHeight
  //   );
  //   console.log(
  //     "Resized collision map dimensions:",
  //     collisionMap[0].length,
  //     "x",
  //     collisionMap.length
  //   );

  // Character position on the collision map
  const collisionMapX = Math.floor((characterX / 100) * collisionMap[0].length);
  const collisionMapY = Math.floor((characterY / 100) * collisionMap.length);
  //   console.log(
  //     "Character position on the collision map. X:",
  //     collisionMapX,
  //     "Y:",
  //     collisionMapY
  //   );

  function checkCollision(newX, newY) {
    // Convert character's percentage position to collision map coordinates
    const collisionMapX = Math.floor(
      (newX / 100) * (collisionMap[0].length - 1)
    );
    const collisionMapY = Math.floor((newY / 100) * (collisionMap.length - 1));

    // Check if the character is within the collision map boundaries
    if (
      collisionMapY < 0 ||
      collisionMapY >= collisionMap.length ||
      collisionMapX < 0 ||
      collisionMapX >= collisionMap[0].length
    ) {
      //   console.log("Collision with collision map boundaries");
      return true; // Collision with collision map boundaries
    }

    // Check for collision with obstacles (0 represents collision)
    const collisionValue = collisionMap[collisionMapY][collisionMapX];
    // console.log(
    //   `Collision check at X: ${collisionMapX}, Y: ${collisionMapY} - Collision Value: ${collisionValue}`
    // );

    return collisionValue === 0; // Adjusted condition for collision
  }
  // Function to update the character's position
  function updateCharacterPosition() {
    character.style.left = `${characterX}%`;
    character.style.top = `${characterY}%`;

    // Center the map around the character
    const translateX = -characterX + (window.innerWidth / 2 / mapWidth) * 100;
    const translateY = -characterY + (window.innerHeight / 2 / mapWidth) * 100;

    //update background image
    var bgX = 50;
    var bgY = 0;

    // console.log(
    //   "Character step difference: \n" +
    //     oldX +
    //     ", " +
    //     parseInt(oldY) +
    //     +" \nto: " +
    //     characterX +
    //     ", " +
    //     characterY
    // );

    // console.log("Old character Position: X:", oldX, "Y:", oldY);

    // console.log("Character Position: X:", characterX, "Y:", characterY);
    // console.log("Map Container Translation: X:", translateX, "Y:", translateY);

    // Check if the translation goes beyond the map boundaries
    const maxX = 100 - 100 * (window.innerWidth / mapWidth);
    const maxY = 100 - 100 * (window.innerHeight / mapWidth);
    // console.log("Map Container Limits: X:", maxX, "Y:", maxY);

    if (
      translateY > -maxY &&
      translateY < 0 &&
      translateX < 0 &&
      translateX > -maxX
    ) {
      //   console.log("both good");
      mapContainer.style.transform = `translate(${translateX}%, ${translateY}%)`;
      oldX = translateX;
      oldY = translateY;
    } else if (translateY > -maxY && translateY < 0) {
      //   console.log("y good");

      mapContainer.style.transform = `translate(${oldX}%, ${translateY}%)`;
      oldY = translateY;
    } else if (translateX < 0 && translateX > -maxX) {
      //   console.log("x good");
      if (oldY == null) {
        oldY = -(100 - 100 * (window.innerHeight / mapWidth));
      }
      mapContainer.style.transform = `translate(${translateX}%, ${oldY}%)`;
      oldX = translateX;
    } else {
      //   console.log("nope");
    }
  }

  let currentDirection = "up";
  let isWalking = false;

  // Function to handle keyboard input
  function handleKeyPress(event) {
    const step = 0.5; // Adjust as needed for finer movement

    let newCharacterX = characterX;
    let newCharacterY = characterY;

    // Update direction only if an arrow key is pressed
    if (event.key.includes("Arrow")) {
      currentDirection = event.key.replace("Arrow", "").toLowerCase();
      isWalking = true;
    }

    // Update character sprite based on the current direction
    character.style.backgroundImage = `url('img/char-${currentDirection}.png')`;

    // Update character position based on the current direction
    switch (currentDirection) {
      case "up":
        newCharacterY -= step;
        break;
      case "down":
        newCharacterY += step;
        break;
      case "left":
        newCharacterX -= step;
        break;
      case "right":
        newCharacterX += step;
        break;
    }

    // Check for collision before updating character position
    if (!checkCollision(newCharacterX, newCharacterY)) {
      //   console.log("No collision. Updating character position.");
      characterX = newCharacterX;
      characterY = newCharacterY;
    } else {
      //   console.log("Collision detected. Character not moved.");
    }

    updateCharacterPosition();
  }

  // Add event listener for keyboard input
  document.addEventListener("keydown", handleKeyPress);

  // Initialize the character position
  updateCharacterPosition();
});

function moveButton() {
  var button = document.getElementById("no-button");

  var newX =
    Math.floor(Math.random() * (2 * (window.innerWidth / 2) + 1)) -
    window.innerWidth / 2;
  var newY = Math.random() * (window.innerHeight / 2);

  button.style.transform = `translate(${newX}px, ${-newY}px)`;
}
