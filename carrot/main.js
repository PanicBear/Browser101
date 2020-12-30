class GameObject {
    constructor(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
    }
}

const field = document.querySelector("section.field");
const carrot = document.querySelector(".carrot");

const carrotObj = new GameObject("carrot", 80, 80);
const bugObj = new GameObject("bug", 50, 50);

let carrotCnt = 10;
let bugCnt = 10;


document.addEventListener("click", () => {
    createGameObj(field.getBoundingClientRect(), carrotObj, 10);
    createGameObj(field.getBoundingClientRect(), bugObj, 10);
});

function createGameObj(DOMRect, gameObject, objCnt) {
    for (let i = 0; i < objCnt; i++) {
        const createdObj = createElement(gameObject);
        const objCoordinate = getRandomCoordinate(DOMRect, carrotObj);
        createdObj.style.transform = `translate(${objCoordinate.x}px, ${objCoordinate.y}px)`;
    }
}

function createElement(gameObject) {
    const gameObj = document.createElement("div");
    gameObj.setAttribute('class', gameObject.name);
    field.appendChild(gameObj);
    return gameObj;
}

function getRandomCoordinate(DOMRect, gameObject) {
    const coordinate = {};
    coordinate.x = Math.floor(Math.random() * (DOMRect.right - gameObject.width));
    coordinate.y = Math.floor(Math.random() * (DOMRect.top - gameObject.height));
    return coordinate;
}

// game cycle
function init() { };

function stop() { };

function win() { };

function lose() { };