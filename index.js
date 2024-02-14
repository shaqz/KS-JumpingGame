console.log("Welcome to JumpingGame");

const ref = {
  welcomeText: document.querySelector(".welcome-text"),
  startGameBtn: document.querySelector(".start-game-btn"),
};

ref.startGameBtn.addEventListener("click", onstartGameBtnClick);

function onstartGameBtnClick() {
  ref.welcomeText.classList.add("visually-hidden");
}
