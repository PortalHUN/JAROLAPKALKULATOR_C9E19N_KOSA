const error = document.getElementById("error");
const loadingOverlay = document.getElementById("loading-overlay");
const form = document.getElementById("inputForm");
let isLoading = false;

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    error.innerHTML = "";
    error.classList.remove("show");

    const roomWidth = Number(document.getElementById("inputWidth").value);
    const roomHeight = Number(document.getElementById("inputHeight").value);

    if (roomHeight == 0 || roomWidth == 0) {
      error.innerHTML = "A tér szélessége vagy magassága nem lehet 0 cm!";
      error.classList.add("show");
      return;
    }

    const tileSize = document.getElementById("tileInput").value;

    const tile = tileSize.split("x");
    const tileWidth = Number(tile[0]);
    const tileHeight = Number(tile[1]);

    const response = await fetch("http://localhost:5078/calculate", {
      method: "POST",
      body: JSON.stringify({ tileWidth, tileHeight, roomHeight, roomWidth }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status != 200) {
      error.innerHTML = "Hiba történt a kommunikáció során!";
      return;
    }

    const body = await response.json();
    console.log(body);
  });
});
