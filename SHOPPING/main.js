const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

let id = 0; // 원래는 UUID 라이브러리나 오브젝트 내장 해시코드 써야

function onAdd() {
    const text = input.value;
    if (text === '') {
        input.focus();
        return;
    }
    const item = createItem(text);
    items.appendChild(item);
    item.scrollIntoView({ block: 'center' });
    
    input.value = "";
    input.focus();

    function createItem(text) {
        const itemRow = document.createElement('li');
        itemRow.setAttribute('class', 'item__row');
        itemRow.setAttribute('data-id', id);
        itemRow.innerHTML =
        `
          <div class="item">
            <span class="item__name">${text}</span>
            <button class="item__delete" data-id=${id++}>
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
          <div class="item__divider"></div>
        `;
        return itemRow;
    }
};

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keypress', (e) => {
    console.log(e);
    if (e.key === 'Enter') {
        onAdd();
    }
});

// 데이터 구조나 ui 구성의 변경에 따라 작동하지 않는 코드이기 때문에
// id(혹은 UUID 라이브러리)를 사용하여 변경해야
items.addEventListener('click', (e) => {
    if (e.target.className == "item__delete" || e.target.parentNode.className == "item__delete") {
        console.log("clicked one is " + e.target.tagName);
        let id = e.target.className == "item__delete" ? e.target.dataset.id : e.target.parentNode.dataset.id;
        document.querySelector(`.item__row[data-id="${id}"]`).remove();
        return;
    }
    console.log("clicked one is not a button or img");
});