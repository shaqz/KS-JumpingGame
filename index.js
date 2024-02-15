console.log("Welcome to the JumpingGame");

const ref = {
  welcomeText: document.querySelector(".welcome-text"),
  startGameBtn: document.querySelector(".start-game-btn"),
  character:document.querySelector("#character"),
  ground:document.querySelector("#ground"),
};

ref.startGameBtn.addEventListener("click", onstartGameBtnClick);

function onstartGameBtnClick() {
  ref.welcomeText.classList.add("visually-hidden");
  ref.startGameBtn.style.display ='none';
  document.addEventListener('keydown', keyboardControl);
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


//function to generate obstacles 
 function generateObstacle(){

 }
//function to detect collision
function detectCollision(){

}