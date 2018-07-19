using RRS_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RRS_Model.Business
{
    public class Ambiences
    {
        public new AmbiencesEnum Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public enum AmbiencesEnum
    {
        WithVirtualTour = 1,
        Thematic = 2,
        ByTheSea = 3,
        WithView = 4,
        WithAFireplace = 5,
        WithGarden = 6,
        NoSmokingInAllAreas = 7,
        Romantic = 8,
        ScenicView = 9,
        PrivateRoom = 11,
        Anniversaries = 12,
        Birthdays = 13,
        Groups = 14,
        BusinessMeeting = 15,
    }
}
