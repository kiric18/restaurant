using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RRS_FormsAppWeb.Models.ViewModel
{
    public class SearchRestaurant
    {
        public string RestaurantName { get; set; }
        public string RestaurantId { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public List<OptGroupList> Search { get; set; }
    }
}