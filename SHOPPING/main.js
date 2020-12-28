const addBtn = document.querySelector(".list--footer__btn");
const inputMsg = document.querySelector(".list--input");
const itemContainer = document.querySelector(".list--items");
var itemDelBtns;

let listObj = {};
let listIdx = 0;
let listText = "";

addBtn.addEventListener("click", () => {
    if (inputMsg.value != false) {
        listObj = {
            "listIdx": listIdx++,
            "listText": inputMsg.value,
        }
        itemContainer.innerHTML +=
            `
                <div class="items--item${listIdx}">
                <div class="items--item__text${listIdx}">${listObj.listText}</div>
                <div class="items--item__btn${listIdx}"><i class="fas fa-trash-alt"></i></div>
                </div>
            `;
        inputMsg.value = "";
        itemDelBtns = document.querySelectorAll("[class^=items--item__btn]");
        itemDelBtns.forEach((itemDelBtn) => {
            itemDelBtn.addEventListener("click", (event) => {
                event.currentTarget.parentNode.remove();
            })
        })
    }
});