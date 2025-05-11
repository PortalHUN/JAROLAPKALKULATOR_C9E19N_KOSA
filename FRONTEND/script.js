const error = document.getElementById("error");
const visualization = document.getElementById("visualization");
const calculation = document.getElementById("calculation");
const form = document.getElementById("inputForm");

const TABLEWIDTHINVH = 60;

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

    document.getElementById("roomHeight").innerHTML =
      body.roomHeightM2.toFixed(4);
    document.getElementById("roomWidth").innerHTML =
      body.roomWidthM2.toFixed(4);
    document.getElementById("roomArea").innerHTML = body.roomArea.toFixed(4);
    document.getElementById("tileArea").innerHTML = body.tileArea.toFixed(4);
    document.getElementById("intactTiles").innerHTML =
      body.intactTiles.toFixed(4);
    document.getElementById("tilesPlus10Percent").innerHTML = Math.ceil(
      body.intactTiles * 1.2
    );
    document.getElementById("horizontalUnused").innerHTML =
      body.roomWidth % body.tileWidth;
    document.getElementById("verticalUnused").innerHTML =
      body.roomHeight % body.tileHeight;

    render(body);
  });
});

const render = (body) => {
  visualization.innerHTML = "";
  const tableWidth = vhToPixel(TABLEWIDTHINVH);
  visualization.style.width = tableWidth + "px";
  const horizontalTileWidth = tableWidth / body.tilesAlongWidth;
  const scaleTileHeight = body.horizontalTile
    ? body.tileHeight / body.tileWidth
    : (body.tileWidth / body.tileHeight) * 10;
  const calculatedHeight = horizontalTileWidth * scaleTileHeight;
  console.log(horizontalTileWidth);
  console.log(horizontalTileWidth * scaleTileHeight);
  console.log(calculatedHeight);
  console.log(body.tileHeight / body.tileWidth);
  console.log(body.tileWidth / body.tileHeight + 1);

  for (let index = 0; index < body.tilesAlongHeight; index++) {
    const tr = document.createElement("tr");
    for (let i2 = 0; i2 < body.tilesAlongWidth; i2++) {
      const td = document.createElement("td");
      td.style.background = "royalblue";
      td.style.width = horizontalTileWidth + "px";
      td.style.height = calculatedHeight + "px";
      if (body.tilesAlongHeight - index < 1) {
        td.style.background = "red";
        const height = calculatedHeight * (body.tilesAlongHeight - index);
        td.style.height = height + "px";
      }
      if (body.tilesAlongWidth - i2 < 1) {
        td.style.background = "orange";
        const width = horizontalTileWidth * (body.tilesAlongWidth - i2);
        td.style.width = width + "px";
      }
      td.style.boxSizing = "border-box";

      tr.appendChild(td);
    }
    visualization.appendChild(tr);
  }
};

const vhToPixel = (vh) => {
  return Math.round(window.innerWidth / (100 / vh)) - 20;
};
