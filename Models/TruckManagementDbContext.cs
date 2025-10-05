using System.Collections.Generic;
using Truck_Management_System.Models;
using Microsoft.EntityFrameworkCore;

namespace Truck_Management_System.Models
{
    public class TruckManagementDbContext : DbContext
    {
        public TruckManagementDbContext(DbContextOptions<TruckManagementDbContext> options)
            : base(options) { }

        public DbSet<Route> Routes { get; set; }
        public DbSet<Truck> Trucks { get; set; }
        public DbSet<TruckRoute> TruckRoutes { get; set; }
    }
}
