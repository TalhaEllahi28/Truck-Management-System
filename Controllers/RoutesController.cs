using Microsoft.AspNetCore.Mvc;
using Truck_Management_System.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Truck_Management_System.Controllers
{
    public class RoutesController : Controller
    {
        private readonly TruckManagementDbContext _context;

        public RoutesController(TruckManagementDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Home()
        {
            ViewBag.ActivePage = "Routes";

            var routes = await _context.Routes.ToListAsync();
            return View(routes);
        }

        [HttpPost]
        public async Task<IActionResult> AddRoute([FromBody] Models.Route route)
        {
            ModelState.Remove("TruckRoutes");
            if (ModelState.IsValid)
            {
                _context.Routes.Add(route);
                await _context.SaveChangesAsync();
                return Json(new { success = true, message = "Route added successfully!" });
            }
            return Json(new { success = false, message = "Invalid route data!" });
        }
    }
}
