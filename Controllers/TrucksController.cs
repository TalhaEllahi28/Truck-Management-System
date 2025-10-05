using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Truck_Management_System.Models;
using System.Threading.Tasks;
using System.Linq;

namespace Truck_Management_System.Controllers
{
    public class TrucksController : Controller
    {
        private readonly TruckManagementDbContext _context;

        public TrucksController(TruckManagementDbContext context)
        {
            _context = context;
        }

        // GET: Trucks
        public async Task<IActionResult> Home()
        {
            ViewBag.ActivePage = "Trucks";

            var trucks = await _context.Trucks.ToListAsync();
            return View(trucks);
        }

        // POST: Add Truck (AJAX)
        [HttpPost]
        public async Task<IActionResult> AddTruck([FromBody] Truck truck)
        {
            ModelState.Remove("TruckRoutes");

            if (ModelState.IsValid)
            {
                _context.Trucks.Add(truck);
                await _context.SaveChangesAsync();
                return Json(new { success = true, message = "Truck added successfully!" });
            }

            return Json(new { success = false, message = "Invalid truck data!" });
        }
    }
}
