document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("hamburger-menu");
  const nav = document.querySelector("nav");
  const body = document.body;
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  // Funktion zur Aktualisierung des Dark Mode Buttons
  function updateDarkModeButton() {
    if (body.classList.contains("dark-mode")) {
      darkModeToggle.textContent = "☀️ Light Mode";
    } else {
      darkModeToggle.textContent = "🌙 Dark Mode";
    }
  }

  // Prüfe, ob Dark Mode bereits aktiviert war (LocalStorage)
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    updateDarkModeButton(); // Button-Text anpassen
  }

  // Toggle Dark Mode
  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.setItem("dark-mode", "disabled");
    }

    updateDarkModeButton(); // Button nach Änderung aktualisieren
  });

  // Toggle Navigation für Mobile-Menü
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    body.classList.toggle("menu-open");
  });

  // Wenn auf den Inhalt geklickt wird, Menü schließen
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
      nav.classList.remove("open");
      body.classList.remove("menu-open");
    }
  });

  // Falls Menü auf der index.html leer ist, Inhalte hinzufügen
  if (document.querySelector("nav ul").children.length === 0) {
    document.querySelector("nav ul").innerHTML = `
          <li><a href="index.html">Home</a></li>
          <li><a href="assets/about.html">Über mich</a></li>
          <li><a href="assets/projects.html">Projekte</a></li>
          <li><a href="assets/api.html">APIs</a></li>
          <li><a href="assets/contact.html">Kontakt</a></li>
      `;
  }
});
