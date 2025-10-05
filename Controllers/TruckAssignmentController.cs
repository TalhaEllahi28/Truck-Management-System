using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Truck_Management_System.Models;
using Truck_Management_System.ViewModels;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Truck_Management_System.Controllers
{
    public class TruckAssignmentController : Controller
    {
        private readonly TruckManagementDbContext _context;

        public TruckAssignmentController(TruckManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Home()
        {
            ViewBag.ActivePage = "Assignments";

            var data = await _context.TruckRoutes
                .Include(tr => tr.Truck)
                .Include(tr => tr.Route)
                .GroupBy(tr => tr.Truck)
                .Select(g => new TruckAssignmentViewModel
                {

                    TruckNumber = g.Key.TruckNumber,
                    TotalDistance = g.Sum(x => x.Route.DistanceKm),
                    Routes = g.Select(x => $"{x.Route.FromCity} -> {x.Route.ToCity}").ToList(),
                    Assignments = g.Count()
                })
                .ToListAsync();

            return View(data);
        }

        [HttpGet]
        public async Task<IActionResult> GetDropdownData()
        {
            var trucks = await _context.Trucks.Select(t => new { t.Id, t.TruckNumber }).ToListAsync();
            var routes = await _context.Routes.Select(r => new { r.Id, RouteName = r.FromCity + " - " + r.ToCity }).ToListAsync();

            return Json(new { trucks, routes });
        }

        [HttpPost]
        public async Task<IActionResult> AssignTruck([FromBody] TruckRouteViewModel model)
        {
            if (model == null || model.RouteDetails == null || model.RouteDetails.Count == 0)
                return Json(new { success = false, message = "Invalid data received." });

            foreach (var route in model.RouteDetails)
            {
                var assignment = new TruckRoute
                {
                    TruckId = model.TruckId,
                    RouteId = route.RouteId,
                    Price = route.Price,
                    PetrolConsumption = route.PetrolConsumption
                };

                _context.TruckRoutes.Add(assignment);
            }

            await _context.SaveChangesAsync();
            return Json(new { success = true, message = "Truck assigned successfully!" });
        }
    }
}
