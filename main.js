"use-strict";

let windowSizeInfo = document.querySelector(".window--size");
addEventListener("resize", () => {
  windowSizeInfo.innerHTML = `
    window.screen : ${window.screen.width}, ${window.screen.height}\
    window.outer : ${window.outerWidth}, ${window.outerHeight}\
    window.inner : ${window.innerWidth}, ${window.innerHeight}\
    documentElement.clientWidth : ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}
  `;
});
