using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RRS_DataAccess.Context;
using RRS_FormsAppWeb.Helper.Common;
using RRS_FormsAppWeb.Models.ViewModel;
using RRS_Model.Business;

namespace RRS_FormsAppWeb.Controllers
{
    public class RestaurantController : Controller
    {
        private static RRSDatabaseContext db = new RRSDatabaseContext();

        [HttpPost]
        public ActionResult GetModel()
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                // Call action here...
                Restaurant restaurant = new Restaurant();
                restaurant.RestaurantManager = new RestaurantManager();
                restaurant.RestaurantStyles = new List<RestaurantStyles>();
                restaurant.RestaurantCuisines = new List<RestaurantCuisines>();
                restaurant.RestaurantPaymentMethods = new List<RestaurantPaymentMethods>();
                restaurant.RestaurantAmenities = new List<RestaurantAmenities>();
                restaurant.RestaurantTables = new List<RestaurantTables>();

                var cuisines = db.Cuisines.ToList();
                var styles = db.Styles.ToList();
                var amenities = db.Amenities.ToList();
                var paymentMethods = db.PaymentMethods.ToList();
                var ambience = db.Ambiences.ToList();

                result.Data = new
                {
                    Restaurant = restaurant,
                    CuisinesList = cuisines,
                    AmenitiesList = amenities,
                    PaymentMethodsList = paymentMethods,
                    AmbiencesList = ambience,
                    StylesList = styles
                };
                //result.Data = restaurant;
                return result;
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }
        // POST: Login
        [HttpPost]
        public ActionResult Login(string email, string password)
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                // Call action here...
                Restaurant restaurant = db.Restaurants.Where(u => u.RestaurantManager.Email == email && u.RestaurantManager.Password == password).FirstOrDefault();
                var restaurantPass = db.Restaurants.Where(u => u.RestaurantManager.Email == email).Select(u => u.RestaurantManager.Password).FirstOrDefault();
                if (restaurant == null && restaurantPass == null)
                {
                    result.Data = new { Result = false };
                }
                else if (restaurantPass != null && restaurantPass != password)
                {
                    result.Data = new { Result = true, PasswordCorrected = false };
                }
                else
                {
                    var userBooking = db.UserBookings.Where(u => u.RestaurantId == restaurant.Id && u.IsActive).ToList();
                    result.Data = new { Result = true, Restaurant = restaurant, UserBooking = userBooking };
                }

                return result;
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        // POST: RegisterRestaurant
        [HttpPost]
        public ActionResult Signup(Restaurant restaurant)
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                Restaurant res = db.Restaurants.Where(r => r.RestaurantName == restaurant.RestaurantName && r.PhoneNumber == restaurant.PhoneNumber && r.RestaurantManager.Email == restaurant.RestaurantManager.Email).FirstOrDefault();
                if (res == null)
                {
                    // Add new restaurant and save changes to db
                    db.Restaurants.Add(restaurant);
                    db.SaveChanges();
                    result.Data = new { Result = true, Restaurant = restaurant };
                }
                else
                {
                    result.Data = new { Result = false };
                }

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public ActionResult UploadImages(int restaurantId)
        {
            CustomJsonResult result = new CustomJsonResult();
            try
            {
                string fileName = string.Empty;
                string filePath = string.Empty;
                //string fileExtension = string.Empty;

                for (int i = 0; i < Request.Files.Count; i++)
                {
                    RestaurantImages restaurnatImages = new RestaurantImages();

                    restaurnatImages.ImageName = Path.GetFileName(Request.Files[i].FileName);
                    restaurnatImages.ImageUrl = Path.GetFullPath(Request.Files[i].FileName);
                    restaurnatImages.ImageExtension = Path.GetExtension(Request.Files[i].FileName);

                    restaurnatImages.RestaurantId = restaurantId;

                    BinaryReader br = new BinaryReader(Request.Files[i].InputStream);
                    byte[] bytes = br.ReadBytes((int)Request.Files[i].InputStream.Length);

                    //Convert the Byte Array to Base64 Encoded string.
                    restaurnatImages.ImageBase64 = Convert.ToBase64String(bytes, 0, bytes.Length);

                    db.RestaurantImages.Add(restaurnatImages);
                    db.SaveChanges();
                }
                result.Data = true;
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpPost]
        public ActionResult GetImages(int restaurantId)
        {
            CustomJsonResult result = new CustomJsonResult();
            try
            {
                List<RestaurantImages> restaurnatImages = db.RestaurantImages.Where(r => r.RestaurantId == restaurantId).ToList();
                result.Data = restaurnatImages;
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public ActionResult DeleteImage(int imageId)
        {
            CustomJsonResult result = new CustomJsonResult();
            try
            {
                RestaurantImages restaurnatImages = db.RestaurantImages.Find(imageId);
                if (restaurnatImages != null)
                {
                    db.RestaurantImages.Remove(restaurnatImages);
                    db.SaveChanges();
                    result.Data = true;
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public ActionResult UploadRestaurantTableImage(int restaurantTableId)
        {
            CustomJsonResult result = new CustomJsonResult();
            try
            {
                string fileName = string.Empty;
                string filePath = string.Empty;
                string fileExtension = string.Empty;
                string fileBase64 = string.Empty;

                if (Request.Files.Count > 0)
                {
                    fileName = Path.GetFileName(Request.Files[0].FileName);
                    filePath = Path.GetFullPath(Request.Files[0].FileName);
                    fileExtension = Path.GetExtension(Request.Files[0].FileName);

                    BinaryReader br = new BinaryReader(Request.Files[0].InputStream);
                    byte[] bytes = br.ReadBytes((int)Request.Files[0].InputStream.Length);

                    //Convert the Byte Array to Base64 Encoded string.
                    fileBase64 = Convert.ToBase64String(bytes, 0, bytes.Length);

                    result.Data = new { FileName = fileName, FileExtension = fileExtension, FileBase64 = fileBase64 };
                }

                RestaurantTables restaurantTableImage = db.RestaurantTables.Where(r => r.Id == restaurantTableId).FirstOrDefault();
                if (restaurantTableImage != null)
                {
                    restaurantTableImage.ImageName = fileName;
                    restaurantTableImage.ImageBase64 = fileBase64;
                    restaurantTableImage.ImageExtension = fileExtension;

                    db.SaveChanges();
                }

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public ActionResult GetRestaurantTableImage(int restaurantTableId)
        {
            CustomJsonResult result = new CustomJsonResult();
            try
            {
                RestaurantTables restaurantTableImage = db.RestaurantTables.Where(r => r.Id == restaurantTableId).FirstOrDefault();
                result.Data = restaurantTableImage;
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public ActionResult DeleteRestaurantTableImage(int restaurantTableId)
        {
            CustomJsonResult result = new CustomJsonResult();
            try
            {
                RestaurantTables restaurantTableImage = db.RestaurantTables.Where(r => r.Id == restaurantTableId).FirstOrDefault();
                if (restaurantTableImage != null)
                {
                    restaurantTableImage.ImageName = string.Empty;
                    restaurantTableImage.ImageBase64 = string.Empty;
                    restaurantTableImage.ImageExtension = string.Empty;

                    db.SaveChanges();
                }
                result.Data = restaurantTableImage;
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        // POST: Login
        [HttpPost]
        public ActionResult GetRestaurantByName(string name)
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                // Call action here...
                Restaurant restaurant = db.Restaurants.Where(u => u.RestaurantInternalName == name).FirstOrDefault();
                if (restaurant == null)
                {
                    result.Data = new { Result = false };
                }
                else
                {
                    var userBooking = db.UserBookings.Where(u => u.RestaurantId == restaurant.Id && u.IsActive).ToList();
                    result.Data = new { Result = true, Restaurant = restaurant, UserBooking = userBooking };
                }

                return result;
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        // POST: Login
        [HttpPost]
        public ActionResult GetAllRestaurants()
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                // Call action here...
                List<Restaurant> restaurants = db.Restaurants.ToList();

                if (restaurants == null)
                {
                    result.Data = new { Result = false };
                }
                else
                {
                    result.Data = new { Result = true, Restaurants = restaurants };
                }

                return result;
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        // POST: Login
        [HttpPost]
        public ActionResult GetRestaurantById(int id)
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                // Call action here...
                Restaurant restaurant = db.Restaurants.Find(id);
                if (restaurant == null)
                {
                    result.Data = new { Result = false };
                }
                else
                {
                    var userBooking = db.UserBookings.Where(u => u.RestaurantId == restaurant.Id && u.IsActive).ToList();
                    result.Data = new { Result = true, Restaurant = restaurant, UserBooking = userBooking };
                }

                return result;
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        // POST: UserAcount
        [HttpPost]
        public ActionResult UpdateAccount(Restaurant restaurantVM)
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                Restaurant restaurant = db.Restaurants.Find(restaurantVM.Id);
                if (restaurant != null)
                {
                    restaurant.RestaurantName = restaurantVM.RestaurantName;
                    restaurant.RestaurantInternalName = restaurantVM.RestaurantInternalName;
                    restaurant.Address = restaurantVM.Address;
                    restaurant.City = restaurantVM.City;
                    restaurant.Country = restaurantVM.Country;
                    restaurant.Description = restaurantVM.Description;
                    restaurant.PhoneNumber = restaurantVM.PhoneNumber;
                    restaurant.OpeningHoursTo = restaurantVM.OpeningHoursTo;
                    restaurant.OpeningHoursFrom = restaurantVM.OpeningHoursFrom;

                    if (restaurant.RestaurantStyles != null && restaurant.RestaurantStyles.Count == 0)
                    {
                        if (restaurantVM.RestaurantStyles != null)
                        {
                            restaurant.RestaurantStyles = restaurantVM.RestaurantStyles;
                        }
                    }
                    else if (restaurantVM.RestaurantStyles != null)
                    {

                        for (int i = 0; i < restaurant.RestaurantStyles.Count; i++)
                        {
                            for (int j = 0; j < restaurantVM.RestaurantStyles.Count; j++)
                            {
                                int indexRes = restaurant.RestaurantStyles.FindIndex(f => f.StyleId == restaurantVM.RestaurantStyles[j].StyleId);
                                if (indexRes < 0)
                                {
                                    restaurant.RestaurantStyles.Add(restaurantVM.RestaurantStyles[j]);
                                }
                            }

                            int indexResVM = restaurantVM.RestaurantStyles.FindIndex(f => f.StyleId == restaurant.RestaurantStyles[i].StyleId);
                            if (indexResVM < 0)
                            {
                                //restaurant.RestaurantStyles.Remove(restaurant.RestaurantStyles[i]);
                                db.RestaurantStyles.Remove(restaurant.RestaurantStyles[i]);
                            }
                        }
                    }

                    if (restaurant.RestaurantCuisines != null && restaurant.RestaurantCuisines.Count == 0)
                    {
                        if (restaurantVM.RestaurantCuisines != null)
                        {
                            restaurant.RestaurantCuisines = restaurantVM.RestaurantCuisines;
                        }
                    }
                    else if (restaurantVM.RestaurantCuisines != null)
                    {

                        for (int i = 0; i < restaurant.RestaurantCuisines.Count; i++)
                        {
                            for (int j = 0; j < restaurantVM.RestaurantCuisines.Count; j++)
                            {
                                int indexRes = restaurant.RestaurantCuisines.FindIndex(f => f.CuisineId == restaurantVM.RestaurantCuisines[j].CuisineId);
                                if (indexRes < 0)
                                {
                                    restaurant.RestaurantCuisines.Add(restaurantVM.RestaurantCuisines[j]);
                                }
                            }

                            int indexResVM = restaurantVM.RestaurantCuisines.FindIndex(f => f.CuisineId == restaurant.RestaurantCuisines[i].CuisineId);
                            if (indexResVM < 0)
                            {
                                //restaurant.RestaurantCuisines.Remove(restaurant.RestaurantCuisines[i]);
                                db.RestaurantCuisines.Remove(restaurant.RestaurantCuisines[i]);
                            }
                        }
                    }

                    if (restaurant.RestaurantPaymentMethods != null && restaurant.RestaurantPaymentMethods.Count == 0)
                    {
                        if (restaurantVM.RestaurantPaymentMethods != null)
                        {
                            restaurant.RestaurantPaymentMethods = restaurantVM.RestaurantPaymentMethods;
                        }
                    }
                    else if (restaurantVM.RestaurantPaymentMethods != null)
                    {

                        for (int i = 0; i < restaurant.RestaurantPaymentMethods.Count; i++)
                        {
                            for (int j = 0; j < restaurantVM.RestaurantPaymentMethods.Count; j++)
                            {
                                int indexRes = restaurant.RestaurantPaymentMethods.FindIndex(f => f.PaymentMethodId == restaurantVM.RestaurantPaymentMethods[j].PaymentMethodId);
                                if (indexRes < 0)
                                {
                                    restaurant.RestaurantPaymentMethods.Add(restaurantVM.RestaurantPaymentMethods[j]);
                                }
                            }

                            int indexResVM = restaurantVM.RestaurantPaymentMethods.FindIndex(f => f.PaymentMethodId == restaurant.RestaurantPaymentMethods[i].PaymentMethodId);
                            if (indexResVM < 0)
                            {
                                //restaurant.RestaurantPaymentMethods.Remove(restaurant.RestaurantPaymentMethods[i]);
                                db.RestaurantPaymentMethods.Remove(restaurant.RestaurantPaymentMethods[i]);
                            }
                        }
                    }


                    if (restaurant.RestaurantAmenities != null && restaurant.RestaurantAmenities.Count == 0)
                    {
                        if (restaurantVM.RestaurantAmenities != null)
                        {
                            restaurant.RestaurantAmenities = restaurantVM.RestaurantAmenities;
                        }
                    }
                    else if (restaurantVM.RestaurantAmenities != null)
                    {

                        for (int i = 0; i < restaurant.RestaurantAmenities.Count; i++)
                        {
                            for (int j = 0; j < restaurantVM.RestaurantAmenities.Count; j++)
                            {
                                int indexRes = restaurant.RestaurantAmenities.FindIndex(f => f.AmenitieId == restaurantVM.RestaurantAmenities[j].AmenitieId);
                                if (indexRes < 0)
                                {
                                    restaurant.RestaurantAmenities.Add(restaurantVM.RestaurantAmenities[j]);
                                }
                            }

                            int indexResVM = restaurantVM.RestaurantAmenities.FindIndex(f => f.AmenitieId == restaurant.RestaurantAmenities[i].AmenitieId);
                            if (indexResVM < 0)
                            {
                                //restaurant.RestaurantAmenities.Remove(restaurant.RestaurantAmenities[i]);
                                db.RestaurantAmenities.Remove(restaurant.RestaurantAmenities[i]);
                            }
                        }
                    }

                    if (restaurant.RestaurantTables != null && restaurant.RestaurantTables.Count == 0)
                    {
                        if (restaurantVM.RestaurantTables != null)
                        {
                            restaurant.RestaurantTables = restaurantVM.RestaurantTables;
                        }
                    }
                    else if (restaurantVM.RestaurantTables != null)
                    {
                        for (int j = 0; j < restaurantVM.RestaurantTables.Count; j++)
                        {
                            if (restaurantVM.RestaurantTables[j].Id == 0)
                            {
                                restaurant.RestaurantTables.Add(restaurantVM.RestaurantTables[j]);
                            }
                        }
                        for (int i = 0; i < restaurant.RestaurantTables.Count; i++)
                        {
                            for (int j = 0; j < restaurantVM.RestaurantTables.Count; j++)
                            {
                                if (restaurantVM.RestaurantTables[j].Id != 0)
                                {
                                    if (restaurant.RestaurantTables[i].Id == restaurantVM.RestaurantTables[j].Id)
                                    {
                                        restaurant.RestaurantTables[i].Ambience = restaurantVM.RestaurantTables[j].Ambience;
                                        restaurant.RestaurantTables[i].NumberOfPersons = restaurantVM.RestaurantTables[j].NumberOfPersons;
                                        restaurant.RestaurantTables[i].NumberOfTable = restaurantVM.RestaurantTables[j].NumberOfTable;
                                    }
                                }
                            }
                            int indexResVM = restaurantVM.RestaurantTables.FindIndex(f => f.Id == restaurant.RestaurantTables[i].Id);
                            if (indexResVM < 0)
                            {
                                db.RestaurantTables.Remove(restaurant.RestaurantTables[i]);
                            }
                        }
                    }
                    restaurant.RestaurantManager.Email = restaurantVM.RestaurantManager.Email;
                    restaurant.RestaurantManager.ManagerName = restaurantVM.RestaurantManager.ManagerName;
                    restaurant.RestaurantManager.Username = restaurantVM.RestaurantManager.Username;

                    if (!string.IsNullOrEmpty(restaurantVM.RestaurantManager.Password))
                    {
                        restaurant.RestaurantManager.Password = restaurantVM.RestaurantManager.Password;
                    }

                    db.SaveChanges();

                    result.Data = new { Result = true, Restaurant = restaurant };
                }
                else
                {
                    result.Data = new { Result = false };
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // POST: UserAcount
        [HttpPost]
        public ActionResult UpdateRestaurantTableAvailability(int restaurantTableId, bool IsBooking)
        {
            CustomJsonResult result = new CustomJsonResult();

            RestaurantTables restaurantTables = db.RestaurantTables.Find(restaurantTableId);
            if (restaurantTables != null)
            {
                restaurantTables.IsBooking = IsBooking;
                db.SaveChanges();
                result.Data = restaurantTables;
            }

            return result;
        }

        // POST: UserAcount
        [HttpPost]
        public ActionResult GetAvailableRestaurantTables(int restaurantId)
        {
            CustomJsonResult result = new CustomJsonResult();

            Restaurant restaurant = db.Restaurants.Find(restaurantId);

            //RestaurantTables restaurantTables = db.RestaurantTables.Find(restaurantTableId);
            if (restaurant != null)
            {
                List<RestaurantTables> restaurantTables = new List<RestaurantTables>();

                if (restaurant.RestaurantTables.Count > 0)
                {
                    for (int i = 0; i < restaurant.RestaurantTables.Count; i++)
                    {
                        var resTable = restaurant.RestaurantTables[i];
                        if (!resTable.IsBooking)
                        {
                            restaurantTables.Add(resTable);
                        }
                    }
                }
                result.Data = restaurantTables;
            }

            return result;
        }

        [HttpPost]
        public ActionResult Search(string search)
        {
            CustomJsonResult result = new CustomJsonResult();
            List<SearchResult> searchResults = new List<SearchResult>();

            // Restaurant
            var restaurants = db.Restaurants.Where(r => r.RestaurantName.Contains(search) || r.City.Contains(search)).Select(r => new SearchResult {
                Id = r.Id.ToString(),
                Name = r.RestaurantName,
                RestautantName = r.RestaurantName,
                City = r.City,
                Description = r.RestaurantName,
                OptGroup = "Restaurants"

            }).ToList();
            UpdateRestaurantList(searchResults, restaurants);

            var restaurantByCuisines = db.RestaurantCuisines.Where(c => c.CuisineId.ToString().Contains(search)).Select(r => new SearchResult
            {
                Id = r.Id.ToString(),
                Name = r.Restaurant.RestaurantName,
                RestautantName = r.Restaurant.RestaurantName,
                City = r.Restaurant.City,
                Description = r.Restaurant.RestaurantName,
                CuisineId = r.CuisineId.ToString(),
                OptGroup = "Restaurants"
            }).ToList();
            UpdateRestaurantList(searchResults, restaurantByCuisines);

            var location = db.Restaurants.Where(l => l.City.Contains(search)).Select(r => new SearchResult
            {
                Id = r.Id.ToString(),
                Name = r.City,
                RestautantName = r.RestaurantName,
                City = r.City,
                Description = r.City,
                OptGroup = "Locations"
            }).ToList();
            UpdateRestaurantList(searchResults, location);

            var restaurantCuisines = db.RestaurantCuisines.Where(c => c.CuisineId.ToString().Contains(search)).Select(r => new SearchResult
            {
                Id = r.Id.ToString(),
                Name = r.CuisineId.ToString(),
                RestautantName = r.Restaurant.RestaurantName,
                City = r.Restaurant.City,
                Description = r.CuisineId.ToString(),
                CuisineId = r.CuisineId.ToString(),
                OptGroup = "Cuisines"
            }).ToList();
            UpdateRestaurantList(searchResults, restaurantCuisines);

            var restaurantByAmenities = db.RestaurantAmenities.Where(c => c.AmenitieId.ToString().Contains(search)).Select(r => new SearchResult
            {
                Id = r.Id.ToString(),
                Name = r.Restaurant.RestaurantName,
                RestautantName = r.Restaurant.RestaurantName,
                City = r.Restaurant.City,
                Description = r.Restaurant.RestaurantName,
                AmenitieId = r.AmenitieId.ToString(),
                OptGroup = "Restaurants"
            }).ToList();
            UpdateRestaurantList(searchResults, restaurantByAmenities);


            var restaurantAmenities = db.RestaurantAmenities.Where(c => c.AmenitieId.ToString().Contains(search)).Select(r => new SearchResult
            {
                Id = r.Id.ToString(),
                Name = r.AmenitieId.ToString(),
                RestautantName = r.Restaurant.RestaurantName,
                City = r.Restaurant.City,
                Description = r.AmenitieId.ToString(),
                AmenitieId = r.AmenitieId.ToString(),
                OptGroup = "Amenities"
            }).ToList();
            UpdateRestaurantList(searchResults, restaurantAmenities);

            var restaurantByStyle = db.RestaurantStyles.Where(c => c.StyleId.ToString().Contains(search)).Select(r => new SearchResult
            {
                Id = r.Id.ToString(),
                Name = r.Restaurant.RestaurantName,
                RestautantName = r.Restaurant.RestaurantName,
                City = r.Restaurant.City,
                Description = r.Restaurant.RestaurantName,
                StyleId = r.StyleId.ToString(),
                OptGroup = "Restaurants"
            }).ToList();
            UpdateRestaurantList(searchResults, restaurantByStyle);

            var restaurantStyle = db.RestaurantStyles.Where(c => c.StyleId.ToString().Contains(search)).Select(r => new SearchResult
            {
                Id = r.Id.ToString(),
                Name = r.StyleId.ToString(),
                RestautantName = r.Restaurant.RestaurantName,
                City = r.Restaurant.City,
                Description = r.StyleId.ToString(),
                StyleId = r.StyleId.ToString(),
                OptGroup = "Style"
            }).ToList();
            UpdateRestaurantList(searchResults, restaurantStyle);

            result.Data = searchResults;

            return result;
        }

        [HttpPost]
        public ActionResult SearchRestaurant(SearchRestaurant searchRestaurant)
        {
            CustomJsonResult result = new CustomJsonResult();

            List<Restaurant> restaurants = new List<Restaurant>();
            if (!string.IsNullOrEmpty(searchRestaurant.RestaurantName))
            {
                var res = db.Restaurants.Where(r => r.RestaurantName == searchRestaurant.RestaurantName).ToList();
                //restaurants.Add(res);
                UpdateRestaurantList(restaurants, res);
            }

            if (searchRestaurant.Search != null && searchRestaurant.Search.Count > 0)
            {
                for (int i = 0; i < searchRestaurant.Search.Count; i++)
                {
                    string id = searchRestaurant.Search[i].Id;
                    if (searchRestaurant.Search[i].OptGroup == "Locations")
                    {
                        var res = db.Restaurants.Where(r => r.City == id).ToList();
                        //restaurants.Add(res);
                        UpdateRestaurantList(restaurants, res);
                    }
                    else if (searchRestaurant.Search[i].OptGroup == "Cuisines")
                    {
                        var res = db.RestaurantCuisines.Where(c => c.CuisineId.ToString() == id).Select(r => r.Restaurant).ToList();
                        //restaurants.Add(res);
                        UpdateRestaurantList(restaurants, res);
                    }
                    else if (searchRestaurant.Search[i].OptGroup == "Amenities")
                    {
                        var res = db.RestaurantAmenities.Where(c => c.AmenitieId.ToString() == id).Select(r => r.Restaurant).ToList();
                        //restaurants.Add(res);
                        UpdateRestaurantList(restaurants, res);
                    }
                    else if (searchRestaurant.Search[i].OptGroup == "Styles")
                    {
                        var res = db.RestaurantStyles.Where(c => c.StyleId.ToString() == id).Select(r => r.Restaurant).ToList();
                        //restaurants.Add(res);
                        //ListA.Where(a => ListX.Any(x => x.b == a.b))
                        UpdateRestaurantList(restaurants, res);
                    }
                    else if (searchRestaurant.Search[i].OptGroup == "Ambience")
                    {
                        var res = db.RestaurantTablesAmbiences.Where(c => c.AmbienceId.ToString() == id).Select(r => r.RestaurantTables.Restaurant).ToList();
                        //restaurants.Add(res);
                        UpdateRestaurantList(restaurants, res);
                    }
                }
            }
            else
            {
                restaurants = db.Restaurants.ToList();
            }

            result.Data = new { Result = true, Restaurants = restaurants };

            return result;
        }

        private void UpdateRestaurantList(List<Restaurant> restaurants, List<Restaurant> res)
        {
            for (int i = 0; i < res.Count; i++)
            {
                if (!restaurants.Contains(res[i]))
                {
                    restaurants.Add(res[i]);
                }
            }
        }
        private void UpdateRestaurantList(List<SearchResult> searchResults, List<SearchResult> res)
        {
            for (int i = 0; i < res.Count; i++)
            {
                if (!searchResults.Contains(res[i]))
                {
                    searchResults.Add(res[i]);
                }
            }
        }

    }
}
