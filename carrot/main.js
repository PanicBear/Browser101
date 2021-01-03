class GameObject {
  constructor(name, width, height) {
    this.name = name;
    this.width = width;
    this.height = height;
  }
}

const field = document.querySelector("section.field");

//<i class="fas fa-play"></i>
const uiBtn = document.querySelector(".ui--btn");
const uiBtnStopImg = `<i class="fas fa-stop"></i>`;

const uiCarrotLeftCnt = document.querySelector(".ui--cnt");

let uiTime = document.querySelector(".ui--time");

const carrotObj = new GameObject("carrot", 80, 80);
const bugObj = new GameObject("bug", 50, 50);

const carrotCnt = 10;
const bugCnt = 10;
const timeLimit = 10;
let carrotLeft = carrotCnt;
let timeLeft = timeLimit;

let timer = function () {};

const bgm = new Audio("./sound/bg.mp3");
const bugPullFx = new Audio("./sound/bug_pull.mp3");
const carrotPullFx = new Audio("./sound/carrot_pull.mp3");
const alertFx = new Audio("./sound/alert.wav");
const gameWinFx = new Audio("./sound/game_win.mp3");

activeUIBtn();

{
  // game cycle
  function init() {
    console.log("init()");

    timeLeft = timeLimit;
    uiTime.textContent = `${Math.floor(timeLeft / 60)}:${timeLeft % 60}`;
    uiCarrotLeftCnt.textContent = carrotCnt;

    clearField();
    createGameObj(field.getBoundingClientRect(), carrotObj, carrotCnt);
    createGameObj(field.getBoundingClientRect(), bugObj, bugCnt);

    onPlay();
  }

  function onPlay() {
    console.log("onPlay()");
    bgm.play();
    uiBtn.innerHTML = uiBtnStopImg;
    uiBtn.dataset.status = "stop";
    setTimer();
  }

  {
    function stop() {
      console.log("stop()");
      const msg = "Replay?";
      finish(msg);
    }

    function win() {
      console.log("win()");
      gameWinFx.play();
      const msg = "YOU WON!";
      finish(msg);
    }

    function lose() {
      console.log("lose()");
      const msg = "You lost...";
      finish(msg);
    }
  }

  function finish(msg) {
    clearTimer();
    bgm.pause();
    bgm.currentTime = 0;
    uiBtn.removeEventListener("click", btnClickListener);
    uiBtn.style.opacity = 0;
    field.removeEventListener("click", fieldClickListener);

    const fieldMsg = createElement("div");
    fieldMsg.innerHTML = `
        <div class="msg">
          <div class="msg__btn-replay btn" data-status="restart">
              <i class="fas fa-redo-alt"></i>
          </div>
          <div class="msg__text">
              ${msg}
          </div>
        </div>
      `;
    fieldMsg.removeAttribute("class");
    fieldMsg.removeAttribute("data-filter");
    field.appendChild(fieldMsg);

    const restartBtn = document.querySelector(".msg__btn-replay");
    restartBtn.addEventListener("click", btnClickListener);
  }
}

function btnClickListener(event) {
  console.log(`${event.currentTarget.dataset.status} clicked`, event);
  switch (event.currentTarget.dataset.status) {
    case "play":
      init();
      break;
    case "stop":
      alertFx.play();
      stop();
      break;
    case "restart":
      activeUIBtn();
      init();
      break;
  }
}

function activeUIBtn() {
  uiBtn.style.opacity = 1;
  uiBtn.addEventListener("click", btnClickListener);
}

function clearField() {
  field.innerHTML = "";
  field.addEventListener("click", fieldClickListener);
}

function fieldClickListener(event) {
  const target = event.target;
  switch (target.className) {
    case "carrot":
      carrotPullFx.play();
      carrotPullFx.currentTime = 0;
      target.parentNode.removeChild(target);
      if (--uiCarrotLeftCnt.textContent > 0) {
        console.log(`uiCarrotLeftCnt : ${uiCarrotLeftCnt.textContent}`);
      } else {
        win();
      }
      break;
    case "bug":
      bugPullFx.play();
      target.parentNode.removeChild(target);
      lose();
      break;
  }
}

function createGameObj(DOMRect, gameObject, objCnt) {
  for (let i = 0; i < objCnt; i++) {
    const createdObj = createElement(gameObject);
    const objCoordinate = getRandomCoordinate(DOMRect, carrotObj);
    createdObj.style.transform = `translate(${objCoordinate.x}px, ${objCoordinate.y}px)`;
  }
}

function createElement(gameObject) {
  const gameObj = document.createElement("div");
  gameObj.setAttribute("class", gameObject.name);
  gameObj.setAttribute("data-filter", "GameObject");
  field.appendChild(gameObj);
  return gameObj;
}

function getRandomCoordinate(DOMRect, gameObject) {
  const coordinate = {};
  coordinate.x = Math.floor(Math.random() * (DOMRect.right - gameObject.width));
  coordinate.y = Math.floor(
    Math.random() * (DOMRect.height - gameObject.height)
  );
  return coordinate;
}

function setTimer() {
  timer = setInterval(() => {
    uiTime.textContent = `${Math.floor(timeLeft / 60)}:${timeLeft % 60}`;
    console.log(`timeLeft : ${timeLeft}`);
    if (timeLeft-- <= 0) {
      lose();
      clearTimer();
    }
  }, 1000);
}

function clearTimer() {
  clearInterval(timer);
}
