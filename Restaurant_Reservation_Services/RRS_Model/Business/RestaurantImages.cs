using RRS_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RRS_Model.Business
{
    public class RestaurantImages: BaseEntity
    {
        public string ImageName { get; set; }

        public string ImageUrl { get; set; }

        public string ImageExtension { get; set; }

        public string ImageBase64 { get; set; }

        public int RestaurantId{ get; set; }
    }
}
