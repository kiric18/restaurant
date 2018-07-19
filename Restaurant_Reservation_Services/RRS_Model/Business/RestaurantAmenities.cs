using RRS_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RRS_Model.Business
{
    public class RestaurantAmenities : BaseEntity
    {
        public Amenities Amenitie { get; set; }
        public AmenitiesEnum AmenitieId { get; set; }
        public virtual Restaurant Restaurant { get; set; }
    }
}
