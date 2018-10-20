using RRS_Model.Business;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RRS_DataAccess.Context
{
    public class RRSDatabaseContext: DbContext
    {
        public RRSDatabaseContext() : base("name=RRSDatabase")
        {
            //Database.SetInitializer<RRSDatabaseContext>(null);
        }

        public DbSet<Admin> Admins { get; set; }

        public DbSet<Styles> Styles{ get; set; }

        public DbSet<Cuisines> Cuisines { get; set; }

        public DbSet<PaymentMethods> PaymentMethods { get; set; }

        public DbSet<Amenities> Amenities { get; set; }

        public DbSet<Ambiences> Ambiences { get; set; }

        public DbSet<Restaurant> Restaurants { get; set; }

        public DbSet<RestaurantManager> RestaurantManagers { get; set; }

        public DbSet<RestaurantTables> RestaurantTables { get; set; }

        public DbSet<RestaurantAlerts> RestaurantAlerts { get; set; }

        public DbSet<RestaurantPaymentMethods> RestaurantPaymentMethods { get; set; }

        public DbSet<RestaurantAmenities> RestaurantAmenities { get; set; }

        public DbSet<RestaurantStyles> RestaurantStyles { get; set; }

        public DbSet<RestaurantCuisines> RestaurantCuisines { get; set; }

        public DbSet<RestaurantTablesAmbiences> RestaurantTablesAmbiences { get; set; }

        public DbSet<RestaurantImages> RestaurantImages { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<UserFavoriteRestaurnat> UserFavoriteRestaurnats { get; set; }

        public DbSet<UserRestaurnatReview> UserRestaurnatReviews { get; set; }

        public DbSet<UserBooking> UserBookings { get; set; }
    }
}