namespace BACKEND.Models
{
  public class Calculation
  {
    //Input
    public double roomWidth { get; set; }
    public double roomHeight { get; set; }
    public double tileWidth { get; set; }
    public double tileHeight { get; set; }

    //Conversion To Meter
    public double roomWidthM => roomWidth / 100;
    public double roomHeightM => roomHeight / 100;
    public double tileWidthM => tileWidth / 100;
    public double tileHeightM => tileHeight / 100;

    //Calculations
    public double roomArea => roomWidthM * roomHeightM;
    public double tileArea => tileWidthM * tileHeightM;
    public double tilesAlongWidth => (roomWidth / tileWidth);
    public double tilesAlongHeight => (roomHeight / tileHeight);
    public double intactTiles => tilesAlongHeight * tilesAlongWidth;
    public double unusedWidth => roomWidthM%tileWidthM;
    public double unusedHeight => roomHeightM%tileHeightM;
    public double unusedWidthArea => unusedWidth * roomWidthM;
    public double unusedHeightArea => unusedHeight * roomHeightM;
    public double totalUnusedArea => unusedWidthArea + unusedHeightArea;

    //Ratio
    public double HorizontalTileRatio => tileWidth / tileHeight;
    public double VerticalTileRatio => tileHeight / tileWidth;

    //Orientation The tile horizontally longer than vertically
    public bool horizontalTile => tileWidth >= tileHeight;
  }
}
