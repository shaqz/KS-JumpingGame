console.log("Welcome to the JumpingGame");

const ref = {
  welcomeText: document.querySelector(".welcome-text"),
  startGameBtn: document.querySelector(".start-game-btn"),
  character: document.querySelector("#character"),
  ground: document.querySelector("#ground"),
  obstacles: document.querySelector(".obstacles"),
  scoreText: document.querySelector(".score"),
  displayScore: document.querySelector("#score"),
};

let charJump = false;
let gameOver = false;
const gravity = 0.9;
let velocity = 0;
let score = 0;
let gameBgSound = new Audio("./audio/game-background.mp3");
let jumpingSound = new Audio("./audio/jump.mp3");
let lossSound = new Audio("./audio/sad-trombone.mp3");
let winSound = new Audio("./audio/success.mp3");
gameBgSound.volume = 0.1;
jumpingSound.volume = 0.3;
lossSound.volume = 0.3;
winSound.volume = 0.3;
let bgSoundIntervalID = null;

ref.startGameBtn.addEventListener("click", onstartGameBtnClick);

function onstartGameBtnClick() {
  ref.welcomeText.classList.add("visually-hidden");
  ref.scoreText.classList.remove("visually-hidden");
  ref.startGameBtn.style.display = "none";
  document.addEventListener("keydown", keyboardControl);
  generateObstacle();
  bgSoundIntervalID = setInterval(gameBgSoundPlay, 300);
}
function keyboardControl(event) {
  if (event.code === "Space" || event.code === "ArrowUp") {
    jump();
    jumpingSound.play();
  }
}

function jump() {
  if (!charJump && !gameOver) {
    let position = 400;
    let jumpInterval = setInterval(function () {
      if (position >= 350) {
        clearInterval(jumpInterval);
        let fallInterval = setInterval(function () {
          if (position <= 150) {
            clearInterval(fallInterval);
            charJump = false;
          } else {
            position -= 5;
            ref.character.style.bottom = position + "px";
          }
        }, 20);
      }
      position += 30;
      ref.character.style.bottom = position + "px";
      charJump = true;
    }, 20);
  }
}

// Function to generate obstacles
function generateObstacle() {
  // Creation of the Obstacles:

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");

  // Create an <img> element for the zombie image
  const zombieImage = document.createElement("img");
  zombieImage.src = getRandomZombieImageUrl(); // This function will return a random zombie URL
  zombieImage.classList.add("zombie-image");

  // Append the zombie image to the obstacle
  obstacle.appendChild(zombieImage);

  // Append the obstacle to the obstacles container
  ref.obstacles.appendChild(obstacle);

  let obstaclePosition = 1000; // Initial position of the obstacle
  let obstacleSpeed = 5; // Speed at which obstacle moves towards the character

  obstacle.style.left = obstaclePosition + "px";

  let obstacleInterval = setInterval(() => {
    if (!gameOver) {
      obstaclePosition -= obstacleSpeed;
      obstacle.style.left = obstaclePosition + "px";

      // Remove obstacle when it goes out of the screen
      if (obstaclePosition < -100) {
        clearInterval(obstacleInterval);
        ref.obstacles.removeChild(obstacle);
        showScore();
      }
    }
  }, 20);

  if (!gameOver) {
    setTimeout(generateObstacle, 3000); // Generate obstaclesat regular intervals
  }
}

function getRandomZombieImageUrl() {
  const zombieImages = [
    "zombie1.png",
    "zombie2.png",
    "zombie3.png",
    "zombie4.png",
  ];
  const randomIndex = Math.floor(Math.random() * zombieImages.length);
  return `images/obstacles/zombies/${zombieImages[randomIndex]}`;
}

// Function to detect collision
function detectCollision(currentObstacle) {
  const characterRect = ref.character.getBoundingClientRect(); // Get bounding box of the character
  // console.log(characterRect);

  // Loop through all obstacles (zombies)
  const zombies = document.querySelectorAll(".obstacle");
  zombies.forEach((zombie) => {
    const zombieRect = zombie.getBoundingClientRect(); // Get bounding box of the zombie
    // console.log(zombieRect.right);
    // Check for collision
    if (
      zombieRect.right < characterRect.right + 50 &&
      zombieRect.right > characterRect.right - 50 &&
      characterRect.top > 260
    ) {
      // console.log(characterRect.top);
      handleCollision();
    }
  });
}

// Function to handle collision
function handleCollision() {
  // console.log("Collision Handled!");
  gameOver = true;
  clearInterval(bgSoundIntervalID);
  gameBgSound.pause();
  lossSound.play();
  alert(`GAME OVER! Your total score: ${score}`);
  clearInterval(collisionInterval); // Stop the interval for collision detection
}

let collisionInterval = setInterval(detectCollision, 500); // Start the collision detection interval

function showScore() {
  score++;
  ref.displayScore.textContent = score;
  gameWon();
}

function gameWon() {
  if (score === 10) {
    gameOver = true;
    clearInterval(bgSoundIntervalID);
    gameBgSound.pause();
    winSound.play();
    ref.scoreText.textContent = `You won the game! Your total score: ${score}`;
  }
}

function gameBgSoundPlay() {
  gameBgSound.play();
}
