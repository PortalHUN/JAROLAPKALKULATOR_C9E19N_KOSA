const error = document.getElementById("error");
const visualization = document.getElementById("visualization");
const cont = document.getElementById("viscontainer");
const calculation = document.getElementById("calculation");
const form = document.getElementById("inputForm");

const CONT_WIDTH = 900;

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    error.innerHTML = "";
    error.classList.remove("show");
    visualization.classList.remove("show");
    calculation.classList.remove("show");

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
      console.error("Hiba");
      return;
    }

    const body = await response.json();
    console.log(body);

    calculation.classList.add("show");
    visualization.classList.add("show");

    document.getElementById("roomHeight").innerHTML = body.roomHeightM2;
    document.getElementById("roomWidth").innerHTML = body.roomWidthM2;
    document.getElementById("roomArea").innerHTML = body.roomArea;
    document.getElementById("tileArea").innerHTML = body.tileArea;
    document.getElementById("intactTiles").innerHTML = body.intactTiles;
    document.getElementById("tilesPlus10Percent").innerHTML = Math.ceil(
      body.intactTiles * 1.1
    );
  });
});
