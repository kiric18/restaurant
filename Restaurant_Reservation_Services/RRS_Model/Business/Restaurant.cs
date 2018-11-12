using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using RRS_Model.Base;

namespace RRS_Model.Business
{
    public class Restaurant: BaseEntity
    {
        public string RestaurantName { get; set; }

        public string RestaurantInternalName { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string Address { get; set; }

        public string OpeningHoursFrom { get; set; }

        public string OpeningHoursTo { get; set; }

        public string PhoneNumber { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }

        public virtual RestaurantManager RestaurantManager { get; set; }

        public virtual List<RestaurantTables> RestaurantTables{ get; set; }

        public virtual List<RestaurantStyles> RestaurantStyles { get; set; }

        public virtual List<RestaurantAmenities> RestaurantAmenities { get; set; }

        public virtual List<RestaurantCuisines> RestaurantCuisines { get; set; }

        public virtual List<RestaurantPaymentMethods> RestaurantPaymentMethods { get; set; }

        public virtual List<RestaurantImages> RestaurantImages { get; set; }
    }
}
