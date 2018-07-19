using RRS_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RRS_Model.Business
{
    public class RestaurantTablesAmbiences : BaseEntity
    {
        public Ambiences Ambience { get; set; }
        public AmbiencesEnum AmbienceId { get; set; }
        public virtual RestaurantTables RestaurantTables { get; set; }
    }
}
