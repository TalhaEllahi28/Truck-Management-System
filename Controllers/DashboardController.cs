using Microsoft.AspNetCore.Mvc;
using Truck_Management_System.Models;
using Truck_Management_System.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Truck_Management_System.Controllers
{
    public class DashboardController : Controller
    {
        private readonly TruckManagementDbContext _context;

        public DashboardController(TruckManagementDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Home()
        {
            ViewBag.ActivePage = "Dashboard";

            var totalRoutes = await _context.Routes.CountAsync();
            var totalTrucks = await _context.Trucks.CountAsync();
            var totalAssignments = await _context.TruckRoutes.CountAsync();
            var totalDistance = await _context.Routes.SumAsync(r => r.DistanceKm);

            var recentAssignments = await _context.TruckRoutes
                .Include(tr => tr.Truck)
                .Include(tr => tr.Route)
                .OrderByDescending(tr => tr.Id)
                .Take(5)
                .Select(tr => new RecentAssignmentViewModel
                {
                    TruckNumber = tr.Truck.TruckNumber,
                    RouteName = $"{tr.Route.FromCity} → {tr.Route.ToCity}",
                    DistanceKm = tr.Route.DistanceKm,
                    Price = tr.Price,
                    PetrolConsumption = tr.PetrolConsumption,
                    Status = "Active" 
                })
                .ToListAsync();

            var dashboardVM = new DashboardViewModel
            {
                TotalRoutes = totalRoutes,
                TotalTrucks = totalTrucks,
                TotalAssignments = totalAssignments,
                TotalDistance = totalDistance,
                RecentAssignments = recentAssignments
            };

            ViewData["Title"] = "Dashboard";
            ViewData["ActivePage"] = "Dashboard";

            return View(dashboardVM);
        }
    }
}
