
using System.ComponentModel.DataAnnotations;

namespace Truck_Management_System.Models
{

    public class Truck
    {
        public int Id { get; set; }

        [Required]
        public string TruckNumber { get; set; }

        [Required]
        public string Color { get; set; }

        [Required]
        public int Tyres { get; set; }

        // Navigation property
        public ICollection<TruckRoute> TruckRoutes { get; set; }
    }

}
