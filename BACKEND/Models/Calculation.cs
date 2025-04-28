namespace BACKEND.Models
{
  public class Calculation
  {
    //Input
    public double roomWidth { get; set; }
    public double roomHeight { get; set; }
    public double tileWidth { get; set; }
    public double tileHeight { get; set; }

    //Conversion
    public double roomWidthM2 => roomWidth / 100;
    public double roomHeightM2 => roomHeight / 100;
    public double tileWidthM2 => tileWidth / 100;
    public double tileHeightM2 => tileHeight / 100;

    //Calculations
    public double roomArea => roomWidthM2 * roomHeightM2;
    public double tileArea => tileWidthM2 * tileHeightM2;
    public double tilesAlongWidth => (roomWidth / tileWidth);
    public double tilesAlongHeight => (roomHeight / tileHeight);
    public double totalTiles => tilesAlongHeight * tilesAlongWidth;
    public double unusedWidth => roomWidthM2%tileWidthM2;
    public double unusedHeight => roomHeightM2%tileHeightM2;
    public double unusedWidthArea => unusedWidth * roomWidthM2;
    public double unusedHeightArea => unusedHeight * roomHeightM2;
    public double totalUnusedArea => unusedWidthArea + unusedHeightArea;

  }
}
