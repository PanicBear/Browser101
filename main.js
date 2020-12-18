"use-strict";

let windowSizeInfo = document.querySelector(".window--size");
let screenWidth = window.screen.width;
let screenHeight = window.screen.height;
let outerWidth = window.outerWidth;
let outerHeight = window.outerHeight;
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;

addEventListener("resize", () => {
  windowSizeInfo.innerHTML = `
    window.screen : ${window.screen.width}, ${window.screen.height}\
    window.outer : ${window.outerWidth}, ${window.outerHeight}\
    window.inner : ${window.innerWidth}, ${window.innerHeight}\
    documentElement.clientWidth : ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}
  `;
});
