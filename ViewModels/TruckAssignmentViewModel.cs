using System.Collections.Generic;

namespace Truck_Management_System.ViewModels
{
    public class TruckRouteViewModel
    {
        public int TruckId { get; set; }
        public List<int> RouteIds { get; set; }
        public List<RouteDetail> RouteDetails { get; set; }
    }

    public class RouteDetail
    {
        public int RouteId { get; set; }
        public decimal Price { get; set; }
        public double PetrolConsumption { get; set; }
    }
    public class TruckAssignmentViewModel
    {
        public string TruckNumber { get; set; }
        public double TotalDistance { get; set; }
        public List<string> Routes { get; set; }
        public int Assignments { get; set; }
    }
}
