using RRS_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RRS_Model.Business
{
    public class Amenities
    {
        public new AmenitiesEnum Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public enum AmenitiesEnum
    {
        WiFi = 1,
        Childseats = 2,
        WineList = 3,
        WheelchairAccess = 4,
        FreePrivateParking = 5,
        PaidParking = 6,
        ClosedPlayground = 7,
        OpenPlayground = 8,
        LiveMusic = 9,
        Buffet = 10,
    }
}
