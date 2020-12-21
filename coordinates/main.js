const two = document.querySelector(".two");
const four = document.querySelector(".four");
const info = document.querySelector(".info");
const cursorSize = 120;
addEventListener("mousemove", (event) => {
  two.style.width = `${event.pageX + cursorSize / 2}px`;
  two.style.height = `${event.pageY + cursorSize / 2}px`;
  four.style.width = `${screen.width - event.pageX - cursorSize / 2}px`;
  four.style.height = `${
    screen.height - event.pageY - (cursorSize * 3) / 2 + 8
  }px`;
  info.style.left = `${event.pageX + cursorSize}px`;
  info.style.top = `${event.pageY + cursorSize / 2}px`;
  info.innerHTML = `
    ${event.pageX} 
    ${event.pageY}
    `;
});
