using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Truck_Management_System.Models
{


    public class TruckRoute
    {
        public int Id { get; set; }

        [Required]
        public int TruckId { get; set; }

        [Required]
        public int RouteId { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public double PetrolConsumption { get; set; }

        [ForeignKey("TruckId")]
        public Truck Truck { get; set; }

        [ForeignKey("RouteId")]
        public Route Route { get; set; }
    }

}
