console.log("Welcome to the JumpingGame");

const ref = {
  welcomeText: document.querySelector(".welcome-text"),
  startGameBtn: document.querySelector(".start-game-btn"),
  character:document.querySelector("#character"),
  ground:document.querySelector("#ground"),
  obstacles : document.querySelector(".obstacles")
};

ref.startGameBtn.addEventListener("click", onstartGameBtnClick);

function onstartGameBtnClick() {
  ref.welcomeText.classList.add("visually-hidden");
  ref.startGameBtn.style.display ='none';
  document.addEventListener('keydown', keyboardControl);
  generateObstacle();
}
function keyboardControl(event){
  if(event.code === 'Space' || event.code === "ArrowUp"){
      jump();
    }
}

let charJump =false;
let gameOver=false;
const gravity =0.9;
let velocity =0;

function jump(){
     if (!charJump && !gameOver) {
      let position = 150;
        let jumpInterval = setInterval(function () {
         if (position >= 350) {
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
    }
}


// Function to generate obstacles 
function generateObstacle() {

  // Creation of the Obstacles:

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  ref.obstacles.appendChild(obstacle);

  let obstaclePosition = 1000; // Initial position of the obstacle
  let obstacleSpeed = 5; // Speed at which obstacle moves towards the character

  obstacle.style.left = obstaclePosition + "px";

  let obstacleInterval = setInterval(() => {
    if (!gameOver) {
      obstaclePosition -= obstacleSpeed;
      obstacle.style.left = obstaclePosition + "px";

      // Remove obstacle when it goes out of the screen
      if (obstaclePosition < -60) {
        clearInterval(obstacleInterval);
        ref.obstacles.removeChild(obstacle);
      }
    }
  }, 20);

  if (!gameOver) {
    setTimeout(generateObstacle, 2500); // Generate obstaclesat regular intervals
  }
}

// Function to detect collision
function detectCollision(currentObstacle) {

}