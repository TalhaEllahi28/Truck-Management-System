using System.ComponentModel.DataAnnotations;


namespace Truck_Management_System.Models
{

    public class Route
    {
        public int Id { get; set; }

        [Required]
        public string FromCity { get; set; }

        [Required]
        public string ToCity { get; set; }

        [Required]
        public double DistanceKm { get; set; }

        public ICollection<TruckRoute> TruckRoutes { get; set; }
    }

}
