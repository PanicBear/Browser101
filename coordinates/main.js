const vertical = document.querySelector(".vertical");
const horizontal = document.querySelector(".horizontal");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");

addEventListener("mousemove", (event) => {
  const x = event.clientX;
  const y = event.clientY;

  console.log(x, y);

  vertical.style.transform = `translateX(${
    x - document.documentElement.clientWidth / 2
  }px)`;
  horizontal.style.transform = `translateY(${
    y - document.documentElement.clientHeight / 2
  }px)`;
  target.style.transform = `translate(${
    x - document.documentElement.clientWidth / 2 - 60
  }px, ${y - document.documentElement.clientHeight / 2 - 60}px)`;
  tag.style.transform = `translate(${
    x - document.documentElement.clientWidth / 2
  }px, ${y - document.documentElement.clientHeight / 2}px)`;
  tag.innerHTML = `${x}px, ${y}px`;
});
