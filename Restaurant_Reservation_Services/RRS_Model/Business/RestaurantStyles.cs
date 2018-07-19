using RRS_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RRS_Model.Business
{
    public class RestaurantStyles : BaseEntity
    {
        public Styles Style { get; set; }
        public StyleEnum StyleId { get; set; }
        public virtual Restaurant Restaurant { get; set; }
    }
}
