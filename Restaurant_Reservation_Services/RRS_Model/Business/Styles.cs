using RRS_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RRS_Model.Business
{
    public class Styles
    {
        public new StyleEnum Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public enum StyleEnum
    {
        Tavern =	1,
        CafeRestaurant = 2,
        Cafeteria =	3,
        BarRestaurant = 4,
        WineRestaurant =	5,
        TraditionalTavern =	6,
        Classic = 7,
        FishTavern =	8,
        FishRestaurant =	9,
        BeerRestaurant =	10,
        Grill = 11,
        MusicRestaurant	= 12,
        SushiBar = 13,
        Coffeehouse	= 14,
        Pub = 15,
    }
}
