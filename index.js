console.log("Welcome to the JumpingGame");

const ref = {
  welcomeText: document.querySelector(".welcome-text"),
  startGameBtn: document.querySelector(".start-game-btn"),
  character: document.querySelector("#character"),
  ground: document.querySelector("#ground"),
  exitGameBtn:document.querySelector(".exit-btn"),
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

ref.exitGameBtn.addEventListener("click", exitGame);
ref.startGameBtn.addEventListener("click", onstartGameBtnClick);

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
            position -= 3;
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

      if (obstaclePosition < -100) {
        clearInterval(obstacleInterval);
        ref.obstacles.removeChild(obstacle);
        showScore();
      }
    }
  }, 20);

  if (!gameOver) {
    setTimeout(generateObstacle, 3000);
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

function detectCollision() {
  const characterRect = ref.character.getBoundingClientRect();
  const zombies = document.querySelectorAll(".obstacle");
  zombies.forEach((zombie) => {
    const zombieRect = zombie.getBoundingClientRect();
    if (
      zombieRect.right < characterRect.right + 50 &&
      zombieRect.right > characterRect.right - 50 &&
      characterRect.top > 260
    ) {
      handleCollision();
    }
  });
}

function handleCollision() {
  gameOver = true;
  clearInterval(bgSoundIntervalID);
  gameBgSound.pause();
  lossSound.play();
  alert(`GAME OVER! Your total score: ${score}`);
  clearInterval(collisionInterval); 
}

let collisionInterval = setInterval(detectCollision, 500);

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

let exitConfirmation = false;
function exitGame(){
  if(!gameOver && !exitConfirmation){
  const confirmExit = confirm("Are you sure want to exit the game?");
  if(confirmExit){
      gameOver =true;
      clearInterval(bgSoundIntervalID);
      gameBgSound.pause();
      ref.exitGameBtn.classList.add("visually-hidden");
      ref.welcomeText.classList.remove("visually-hidden");
      ref.startGameBtn.classList.remove("visually-hidden");
      ref.scoreText.classList.add("visually-hidden");
      resetGame();
      location.reload();
  }else {
    exitConfirmation = false;
  }
  }
}
function resetGame(){
  charJump = false;
  gameOver = true;
  velocity = 0;
  score = 0;
  
}
