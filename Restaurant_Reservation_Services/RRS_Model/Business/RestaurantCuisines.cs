using RRS_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RRS_Model.Business
{
    public class RestaurantCuisines : BaseEntity
    {
        public Cuisines Cuisine { get; set; }
        public CuisinesEnum CuisineId { get; set; }
        public virtual Restaurant Restaurant { get; set; }
    }
}
