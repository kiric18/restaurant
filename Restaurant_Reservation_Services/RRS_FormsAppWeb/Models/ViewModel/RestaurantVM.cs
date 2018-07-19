using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web;
using System.Web.Mvc;

namespace RRS_FormsAppWeb.Models.ViewModel
{
    public class RestaurantVM
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string OpeningHoursFrom { get; set; }

        public string OpeningHoursTo { get; set; }

        public string PhoneNumber { get; set; }

        public string[] Style { get; set; }

        public string[] PaymentMethods { get; set; }

        public string[] Amenities { get; set; }

        public List<RestaurantTablesVM>Tables { get; set; }

        public string Desrciption { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }

        public HttpPostedFileBase[] PostedFiles { get; set; }
    }
}
