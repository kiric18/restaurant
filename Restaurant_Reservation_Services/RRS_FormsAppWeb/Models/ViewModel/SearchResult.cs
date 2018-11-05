using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RRS_FormsAppWeb.Models.ViewModel
{
    public class SearchResult
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string RestautantName { get; set; }

        public string Description { get; set; }

        public string City { get; set; }

        public string CuisineId { get; set; }

        public string AmenitieId { get; set; }

        public string StyleId { get; set; }

        public string OptGroup { get; set; }
    }
}