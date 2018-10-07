using RRS_Model.Base;
using System.Collections.Generic;

namespace RRS_Model.Business
{
    public class RestaurantTables: BaseEntity
    {
        public RestaurantTables()
        {
            IsBooking= false;
        }

        public string NumberOfTable { get; set; }
        public string NumberOfPersons { get; set; }
        public string Ambience { get; set; }
        public bool IsBooking { get; set; }
        public virtual Restaurant Restaurant{ get; set; }
    }
}
