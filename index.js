console.log("Welcome to the JumpingGame");

const ref = {
  welcomeText: document.querySelector(".welcome-text"),
  startGameBtn: document.querySelector(".start-game-btn"),
  restartGameBtn: document.querySelector(".restart-game-btn"),
  character: document.querySelector("#character"),
  showScore: document.querySelector("#showScore"),
  ground: document.querySelector("#ground"),
  exitGameBtn: document.querySelector(".exit-btn"),
  obstacles: document.querySelector(".obstacles"),
  scoreText: document.querySelector(".score"),
  displayScore: document.querySelector("#score"),
  monkeyFeet: document.querySelector(".face"),
};

let charJump = false;
let gameOver = false;
const gravity = 0.8;
let velocity = 0;
let score = 0;
let gameBgSound = new Audio("./audio/game-background.mp3");
let jumpingSound = new Audio("./audio/jump.mp3");
let lossSound = new Audio("./audio/sad-trombone.mp3");
gameBgSound.volume = 0.1;
jumpingSound.volume = 0.3;
lossSound.volume = 0.3;
let bgSoundIntervalID = null;
let timeOutId = null;
let collisionInterval = null;

ref.exitGameBtn.addEventListener("click", exitGame);
ref.startGameBtn.addEventListener("click", onstartGameBtnClick);
ref.restartGameBtn.addEventListener("click", restartGame);

function onstartGameBtnClick() {
  exitConfirmation = false;
  gameOver = false;
  ref.welcomeText.classList.add("visually-hidden");
  ref.scoreText.classList.remove("visually-hidden");
  ref.startGameBtn.style.display = "none";
  ref.exitGameBtn.classList.remove("visually-hidden");
  document.addEventListener("keydown", keyboardControl);
  generateObstacle();
  bgSoundIntervalID = setInterval(gameBgSoundPlay, 300);
  ref.monkeyFeet.style.animation = "increaseShadow 2s ease infinite alternate";
}

function restartGame() {
  location.reload();
}

function keyboardControl(event) {
  if (event.code === "Space" || event.code === "ArrowUp") {
    jump();
    jumpingSound.play();
  }
}

function jump() {
  if (!charJump && !gameOver) {
<<<<<<< Updated upstream
    let position = 150;
    let jumpInterval = setInterval(function () {
      if (position >= 450) {
        clearInterval(jumpInterval);
        let fallInterval = setInterval(function () {
          if (position <= 150) {
            clearInterval(fallInterval);
            charJump = false;
          } else {
            position -= 10;
            ref.character.style.bottom = position + "px";
          }
        }, 20);
      }
      position += 30;
      ref.character.style.bottom = position + "px";
      charJump = true;
    }, 20);
=======
    charJump = true;
    velocity = -12; // Adjust the initial jump velocity
>>>>>>> Stashed changes
  }
}

function generateObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");

  const zombieImage = document.createElement("img");
  zombieImage.src = getRandomZombieImageUrl();
  zombieImage.classList.add("zombie-image");

  obstacle.appendChild(zombieImage);
  ref.obstacles.appendChild(obstacle);

  let obstaclePosition = 1000;
  let obstacleSpeed = 5;

  obstacle.style.left = obstaclePosition + "px";

  let obstacleInterval = setInterval(() => {
    if (!gameOver) {
      obstaclePosition -= obstacleSpeed;
      obstacle.style.left = obstaclePosition + "px";

      if (obstaclePosition < -50) {
        clearInterval(obstacleInterval);
        ref.obstacles.removeChild(obstacle);
        showScore();
      }

      if (detectCollision(obstacle)) {
        handleCollision();
      }
    }
  }, 15);

  if (!gameOver) {
    timeOutId = setTimeout(generateObstacle, 3000);
  }
}

function detectCollision(obstacle) {
  const characterRect = ref.character.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  return (
    characterRect.right > obstacleRect.left &&
    characterRect.left < obstacleRect.right &&
    characterRect.bottom > obstacleRect.top &&
    characterRect.top < obstacleRect.bottom
  );
}

function handleCollision() {
  gameOver = true;
  clearInterval(bgSoundIntervalID);
  gameBgSound.pause();
  lossSound.play();
  ref.restartGameBtn.style.display = "block";
  clearInterval(collisionInterval);
  ref.startGameBtn.classList.add("visually-hidden");
  ref.scoreText.textContent = `Game over! Your total score: ${score}`;
  ref.exitGameBtn.classList.add("visually-hidden");
  clearTimeout(timeOutId);
  ref.monkeyFeet.style.animation = "none";
}

function showScore() {
  score++;
  ref.displayScore.textContent = score;
}

function gameBgSoundPlay() {
  gameBgSound.play();
}

let exitConfirmation = false;
function exitGame() {
  if ((!gameOver && !exitConfirmation) || isWon) {
    const confirmExit = confirm("Are you sure want to exit the game?");
    if (confirmExit) {
      gameOver = true;
      clearInterval(bgSoundIntervalID);
      gameBgSound.pause();
      ref.exitGameBtn.classList.add("visually-hidden");
      ref.welcomeText.classList.remove("visually-hidden");
      ref.startGameBtn.classList.remove("visually-hidden");
      ref.scoreText.classList.add("visually-hidden");
      resetGame();
      location.reload();
    } else {
      exitConfirmation = false;
    }
  }
}

function resetGame() {
  charJump = false;
  gameOver = false;
  velocity = 0;
  score = 0;
  ref.displayScore.textContent = score;
  ref.restartGameBtn.style.display = "none";
  ref.obstacles.querySelectorAll(".obstacle").forEach((obstacle) => {
    obstacle.remove();
  });
  ref.scoreText.classList.remove("visually-hidden");
}
