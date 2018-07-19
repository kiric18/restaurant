using RRS_Model.Base;
using System.Collections.Generic;

namespace RRS_Model.Business
{
    public class RestaurantTables: BaseEntity
    {
        public RestaurantTables()
        {
            Ambience = new List<RestaurantTablesAmbiences>();
        }

        public string NumberOfTable { get; set; }
        public string NumberOfPersons { get; set; }
        public virtual List<RestaurantTablesAmbiences> Ambience { get; set; }
        public virtual Restaurant Restaurant{ get; set; }
    }
}
