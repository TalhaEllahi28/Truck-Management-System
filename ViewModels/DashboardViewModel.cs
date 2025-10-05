using System.Collections.Generic;

namespace Truck_Management_System.ViewModels
{
    public class DashboardViewModel
    {
        public int TotalRoutes { get; set; }
        public int TotalTrucks { get; set; }
        public int TotalAssignments { get; set; }
        public double TotalDistance { get; set; }

        public List<RecentAssignmentViewModel> RecentAssignments { get; set; }
    }

    public class RecentAssignmentViewModel
    {
        public string TruckNumber { get; set; }
        public string RouteName { get; set; }
        public double DistanceKm { get; set; }
        public decimal Price { get; set; }
        public double PetrolConsumption { get; set; }
        public string Status { get; set; }
    }
}
