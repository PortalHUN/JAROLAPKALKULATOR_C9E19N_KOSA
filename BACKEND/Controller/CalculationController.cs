using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controller
{
  public class CalculationController : Microsoft.AspNetCore.Mvc.Controller
  {
    public IActionResult Index(){
      return View();
    }
    public IActionResult About()
    {
      return View();
    }
  }
}
