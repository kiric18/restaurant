using RRS_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RRS_Model.Business
{
    public class Cuisines
    {
        public new CuisinesEnum Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public enum CuisinesEnum
    {
        International = 1,
        Cypriot = 2,
        Mediterranean = 3,
        Chinese = 4,
        Mexican = 5,
        Greek = 6,
        Italian = 7,
        French = 8,
        Indian = 9,
        Japanese = 11,
        Fusion = 12,
        AmericanStyleBurgers = 13,
    }
}
