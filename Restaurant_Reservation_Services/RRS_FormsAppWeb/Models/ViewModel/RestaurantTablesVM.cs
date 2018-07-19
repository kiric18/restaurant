using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RRS_FormsAppWeb.Models.ViewModel
{
    public class RestaurantTablesVM
    {
        public string NumberOfTable { get; set; }

        public string NumberOfPersons { get; set; }

        public List<string> Ambience { get; set; }
    }
}