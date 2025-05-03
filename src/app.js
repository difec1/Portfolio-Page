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

// Leaflet-Karte mit Standard-Zentrum in der Schweiz
var map = L.map("map").setView([46.8182, 8.2275], 8);

// OpenStreetMap-Kacheln hinzufügen
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Gerätestandort anzeigen
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userCoords = [position.coords.latitude, position.coords.longitude];
      const redIcon = new L.Icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      L.marker(userCoords, { icon: redIcon })
        .addTo(map)
        .bindPopup("Dein Standort")
        .openPopup();
      map.setView(userCoords, 10);
    },
    () => {
      console.warn("Standortzugriff verweigert oder nicht verfügbar.");
    }
  );
} else {
  console.warn("Geolocation wird nicht unterstützt.");
}

// Liste mit Pässen (Koordinaten + Namen)
const passMarkers = [
  { name: "Grimselpass", coords: [46.5611, 8.3375] },
  { name: "Furkapass", coords: [46.5723, 8.4164] },
  { name: "Sustenpass", coords: [46.7052, 8.4202] },
  { name: "Gotthardpass", coords: [46.5607, 8.561] },
  { name: "Gurnigelpass", coords: [46.7558, 7.4599] },
  { name: "Schallenbergpass", coords: [46.8027, 7.8021] },
  { name: "Böhlerpass", coords: [47.395, 7.8994] },
  { name: "Brünigpass", coords: [46.7484, 8.1414] },
  { name: "Chuderhüsi", coords: [46.8765, 7.8083] },
  { name: "Beatenberg", coords: [46.6981, 7.7657] },
  { name: "Glaubenbielenpass", coords: [46.8708, 8.0915] },
  { name: "Jaunpass", coords: [46.6089, 7.3694] },
  { name: "Glaubenbergpass", coords: [46.8803, 8.1669] },
  { name: "Col du Pillon", coords: [46.3607, 7.1407] },
  { name: "Col des Mosses", coords: [46.3967, 7.0819] },
  { name: "Großer St. Bernhard", coords: [45.8652, 7.1759] },
  { name: "Nufenenpass", coords: [46.4806, 8.3781] },
  { name: "Flüelapass", coords: [46.7421, 9.9252] },
  { name: "Berninapass", coords: [46.4111, 10.0216] },
  { name: "Julierpass", coords: [46.4981, 9.7175] },
  { name: "San-Bernardino", coords: [46.4661, 9.19] },
  { name: "Oberalppass", coords: [46.6592, 8.6712] },
  { name: "Lukmanierpass", coords: [46.5462, 8.8271] },
];

// Marker zur Karte hinzufügen
passMarkers.forEach((pass) => {
  L.marker(pass.coords).addTo(map).bindPopup(pass.name);
});

// Funktion zum Öffnen der PDFs
function openPDF(pdfFile) {
  window.open(`../documents/${pdfFile}`, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("rNRH19IqkW1xGB5LZ"); // EmailJS Public Key

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Verhindert das Neuladen der Seite

      emailjs.sendForm("service_mtwwt7r", "template_bj0fk3k", this).then(
        () => {
          alert("Nachricht erfolgreich gesendet!");
          this.reset();
        },
        (error) => {
          alert(
            "Nachricht konnte nicht gesendet werden. Bitte versuche es erneut."
          );
          console.error(error);
        }
      );
    });
});
