using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controller
{
  [ApiController]
  [Route("/calculate")]
  public class CalculationController : ControllerBase
  {
    [HttpPost]
    public IActionResult Post([FromBody] Calculation calc)
    {
      if (calc.roomArea == 0 || calc.tileArea == 0) return BadRequest("A bemeneti paraméterek nem lehetnek egyenlőek nullával.");

      Calculation Horizontal = calc;
      Calculation Vertical = new Calculation() { roomHeight = calc.roomHeight, roomWidth = calc.roomWidth, tileHeight = calc.tileWidth, tileWidth = calc.tileHeight };

      if (Horizontal.totalUnusedArea < Vertical.totalUnusedArea) return Ok(Horizontal);
      else return Ok(Vertical);
    }

    [HttpGet]
    public IActionResult Get(){
      return Ok("OK");
    }
  }
}
