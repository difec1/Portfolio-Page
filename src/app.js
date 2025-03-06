document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("hamburger-menu");
  const nav = document.querySelector("nav");

  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
});
