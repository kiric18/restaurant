using RRS_DataAccess.Context;
using RRS_Model.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var db = new RRSDatabaseContext())
            {
                //// Add Payment Methods
                //Console.WriteLine("Add Payment Methods");
                //var amex = new PaymentMethods { Id = PaymentMethodEnum.AMEX, Name = "AMEX", Description = "AMEX" };
                //db.PaymentMethods.Add(amex);

                //var visa = new PaymentMethods { Id = PaymentMethodEnum.VISA, Name = "VISA", Description = "VISA" };
                //db.PaymentMethods.Add(visa);

                //var mc = new PaymentMethods { Id = PaymentMethodEnum.MasterCard, Name = "MasterCard", Description = "Master Card" };
                //db.PaymentMethods.Add(mc);

                //// Add Ambience
                //Console.WriteLine("Add Ambience");
                //var Anniversaries = new Ambiences { Id = AmbiencesEnum.Anniversaries, Name = "Anniversaries", Description = "Anniversaries" };
                //db.Ambiences.Add(Anniversaries);

                //var Birthdays = new Ambiences { Id = AmbiencesEnum.Birthdays, Name = "Birthdays", Description = "Birthdays" };
                //db.Ambiences.Add(Birthdays);

                //var BusinessMeeting = new Ambiences { Id = AmbiencesEnum.BusinessMeeting, Name = "BusinessMeeting", Description = "Business Meeting" };
                //db.Ambiences.Add(BusinessMeeting);

                //var ByTheSea = new Ambiences { Id = AmbiencesEnum.ByTheSea, Name = "ByTheSea", Description = "By The Sea" };
                //db.Ambiences.Add(ByTheSea);

                //var Groups = new Ambiences { Id = AmbiencesEnum.Groups, Name = "Groups", Description = "Groups" };
                //db.Ambiences.Add(Groups);

                //var NoSmokingInAllAreas = new Ambiences { Id = AmbiencesEnum.NoSmokingInAllAreas, Name = "NoSmokingInAllAreas", Description = "No Smoking In All Areas" };
                //db.Ambiences.Add(NoSmokingInAllAreas);

                //var PrivateRoom = new Ambiences { Id = AmbiencesEnum.PrivateRoom, Name = "PrivateRoom", Description = "Private Room" };
                //db.Ambiences.Add(PrivateRoom);

                //var Romantic = new Ambiences { Id = AmbiencesEnum.Romantic, Name = "Romantic", Description = "Romantic" };
                //db.Ambiences.Add(Romantic);

                //var ScenicView = new Ambiences { Id = AmbiencesEnum.ScenicView, Name = "ScenicView", Description = "Scenic View" };
                //db.Ambiences.Add(ScenicView);

                //var Thematic = new Ambiences { Id = AmbiencesEnum.Thematic, Name = "Thematic", Description = "Thematic" };
                //db.Ambiences.Add(Thematic);

                //var WithAFireplace = new Ambiences { Id = AmbiencesEnum.WithAFireplace, Name = "WithAFireplace", Description = "With a Fireplace" };
                //db.Ambiences.Add(WithAFireplace);

                //var WithGarden = new Ambiences { Id = AmbiencesEnum.WithGarden, Name = "WithGarden", Description = "With Garden" };
                //db.Ambiences.Add(WithGarden);

                //var WithView = new Ambiences { Id = AmbiencesEnum.WithView, Name = "WithView", Description = "With View" };
                //db.Ambiences.Add(WithView);

                //var WithVirtualTour = new Ambiences { Id = AmbiencesEnum.WithVirtualTour, Name = "WithVirtualTour", Description = "With Virtual Tour" };
                //db.Ambiences.Add(WithVirtualTour);

                //// Add Style
                //Console.WriteLine("Add Style");
                //var Tavern = new Styles { Id = StyleEnum.Tavern, Name = "Tavern", Description = "Tavern" };
                //db.Styles.Add(Tavern);

                //var CafeRestaurant = new Styles { Id = StyleEnum.CafeRestaurant, Name = "CafeRestaurant", Description = "Cafe Restaurant" };
                //db.Styles.Add(CafeRestaurant);

                //var Cafeteria = new Styles { Id = StyleEnum.Cafeteria, Name = "Cafeteria", Description = "Cafeteria" };
                //db.Styles.Add(Cafeteria);

                //var BarRestaurant = new Styles { Id = StyleEnum.BarRestaurant, Name = "BarRestaurant", Description = "Bar Restaurant" };
                //db.Styles.Add(BarRestaurant);

                //var WineRestaurant = new Styles { Id = StyleEnum.WineRestaurant, Name = "WineRestaurant", Description = "Wine Restaurant" };
                //db.Styles.Add(WineRestaurant);

                //var TraditionalTavern = new Styles { Id = StyleEnum.TraditionalTavern, Name = "TraditionalTavern", Description = "Traditional Tavern" };
                //db.Styles.Add(TraditionalTavern);

                //var Classic = new Styles { Id = StyleEnum.Classic, Name = "Classic", Description = "Classic" };
                //db.Styles.Add(Classic);

                //var FishTavern = new Styles { Id = StyleEnum.FishTavern, Name = "FishTavern", Description = "Fish Tavern" };
                //db.Styles.Add(FishTavern);

                //var FishRestaurant = new Styles { Id = StyleEnum.FishRestaurant, Name = "FishRestaurant", Description = "Fish Restaurant" };
                //db.Styles.Add(FishRestaurant);

                //var BeerRestaurant = new Styles { Id = StyleEnum.BeerRestaurant, Name = "BeerRestaurant", Description = "Beer Restaurant" };
                //db.Styles.Add(BeerRestaurant);

                //var Grill = new Styles { Id = StyleEnum.Grill, Name = "Grill", Description = "Grill" };
                //db.Styles.Add(Grill);

                //var MusicRestaurant = new Styles { Id = StyleEnum.MusicRestaurant, Name = "MusicRestaurant", Description = "Music Restaurant" };
                //db.Styles.Add(MusicRestaurant);

                //var SushiBar = new Styles { Id = StyleEnum.SushiBar, Name = "SushiBar", Description = "Sushi Bar" };
                //db.Styles.Add(SushiBar);

                //var Coffeehouse = new Styles { Id = StyleEnum.Coffeehouse, Name = "Coffeehouse", Description = "Coffee house" };
                //db.Styles.Add(Coffeehouse);

                //var Pub = new Styles { Id = StyleEnum.Pub, Name = "Pub", Description = "Pub" };
                //db.Styles.Add(Pub);

                //// Add Amenities
                //Console.WriteLine("Add Amenities");
                //var WiFi = new Amenities { Id = AmenitiesEnum.WiFi, Name = "WiFi", Description = "WiFi" };
                //db.Amenities.Add(WiFi);

                //var Childseats = new Amenities { Id = AmenitiesEnum.Childseats, Name = "Childseats", Description = "Childseats" };
                //db.Amenities.Add(Childseats);

                //var WineList = new Amenities { Id = AmenitiesEnum.WineList, Name = "WineList", Description = "Wine List" };
                //db.Amenities.Add(WineList);

                //var WheelchairAccess = new Amenities { Id = AmenitiesEnum.WheelchairAccess, Name = "WheelchairAccess", Description = "Wheelchair Access" };
                //db.Amenities.Add(WheelchairAccess);

                //var FreePrivateParking = new Amenities { Id = AmenitiesEnum.FreePrivateParking, Name = "FreePrivateParking", Description = "Free Private Parking" };
                //db.Amenities.Add(FreePrivateParking);

                //var PaidParking = new Amenities { Id = AmenitiesEnum.PaidParking, Name = "PaidParking", Description = "Paid Parking" };
                //db.Amenities.Add(PaidParking);

                //var ClosedPlayground = new Amenities { Id = AmenitiesEnum.ClosedPlayground, Name = "ClosedPlayground", Description = "Closed Playground" };
                //db.Amenities.Add(ClosedPlayground);

                //var OpenPlayground = new Amenities { Id = AmenitiesEnum.OpenPlayground, Name = "OpenPlayground", Description = "Open Playground" };
                //db.Amenities.Add(OpenPlayground);

                //var LiveMusic = new Amenities { Id = AmenitiesEnum.LiveMusic, Name = "LiveMusic", Description = "Live Music" };
                //db.Amenities.Add(LiveMusic);

                //var Buffet = new Amenities { Id = AmenitiesEnum.Buffet, Name = "Buffet", Description = "Buffet" };
                //db.Amenities.Add(Buffet);

                ////Add Cuisines
                //Console.WriteLine("Add Cuisines");
                //var International = new Cuisines { Id = CuisinesEnum.International, Name = "International", Description = "International" };
                //db.Cuisines.Add(International);

                //var Cypriot = new Cuisines { Id = CuisinesEnum.Cypriot, Name = "Cypriot", Description = "Cypriot" };
                //db.Cuisines.Add(Cypriot);

                //var Mediterranean = new Cuisines { Id = CuisinesEnum.Mediterranean, Name = "Mediterranean", Description = "Mediterranean" };
                //db.Cuisines.Add(Mediterranean);

                //var Chinese = new Cuisines { Id = CuisinesEnum.Chinese, Name = "Chinese", Description = "Chinese" };
                //db.Cuisines.Add(Chinese);

                //var Mexican = new Cuisines { Id = CuisinesEnum.Mexican, Name = "Mexican", Description = "Mexican" };
                //db.Cuisines.Add(Mexican);

                //var Greek = new Cuisines { Id = CuisinesEnum.Greek, Name = "Greek", Description = "Greek" };
                //db.Cuisines.Add(Greek);

                //var Italian = new Cuisines { Id = CuisinesEnum.Italian, Name = "Italian", Description = "Italian" };
                //db.Cuisines.Add(Italian);

                //var French = new Cuisines { Id = CuisinesEnum.French, Name = "French", Description = "French" };
                //db.Cuisines.Add(French);

                //var Indian = new Cuisines { Id = CuisinesEnum.Indian, Name = "Indian", Description = "Indian" };
                //db.Cuisines.Add(Indian);

                //var Japanese = new Cuisines { Id = CuisinesEnum.Japanese, Name = "Japanese", Description = "Japanese" };
                //db.Cuisines.Add(Japanese);

                //var Fusion = new Cuisines { Id = CuisinesEnum.Fusion, Name = "Fusion", Description = "Fusion" };
                //db.Cuisines.Add(Fusion);

                //var AmericanStyleBurgers = new Cuisines { Id = CuisinesEnum.AmericanStyleBurgers, Name = "AmericanStyleBurgers", Description = "American Style Burgers" };
                //db.Cuisines.Add(AmericanStyleBurgers);

                //// Admin
                //Console.WriteLine("Add Admin");
                //var admin = new Admin { Name= "Kyriakos", Surname="Michael", Username="km_admin", Email="m.kyriakos18@gmail.com", Password= "2107fd5f8de098ed3953952d5885eeb0" };
                //db.Admins.Add(admin);

                //Console.WriteLine("Start db SaveChanges");
                //db.SaveChanges();
                //Console.WriteLine("End db SaveChanges");
            }
        }
    }
}
