using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RRS_DataAccess.Context;
using RRS_FormsAppWeb.Helper.Common;
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
                    result.Data = new { Result = true, Restaurant = restaurant };
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
        public ActionResult UploadFile(HttpPostedFileBase[] files)
        {
            try
            {
                //Ensure model state is valid
                if (ModelState.IsValid)
                {   //iterating through multiple file collection
                    foreach (HttpPostedFileBase file in files)
                    {
                        //Checking file is available to save.
                        if (file != null)
                        {
                            var InputFileName = Path.GetFileName(file.FileName);
                            var ServerSavePath = Path.Combine(Server.MapPath("~/UploadedFiles/") + InputFileName);
                            //Save file to server folder
                            file.SaveAs(ServerSavePath);
                            //assigning file uploaded status to ViewBag for showing message to user.
                            ViewBag.UploadStatus = files.Count().ToString() + " files uploaded successfully.";
                        }

                    }
                }
                return View();
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
                    restaurant.Address = restaurantVM.Address;
                    restaurant.City = restaurantVM.City;
                    restaurant.Country = restaurantVM.Country;
                    restaurant.Description = restaurantVM.Description;
                    restaurant.PhoneNumber = restaurantVM.PhoneNumber;
                    restaurant.OpeningHoursTo = restaurantVM.OpeningHoursTo;
                    restaurant.OpeningHoursFrom = restaurantVM.OpeningHoursFrom;

                    if (restaurant.RestaurantStyles.Count == 0)
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

                    if (restaurant.RestaurantCuisines.Count == 0)
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

                    if (restaurant.RestaurantPaymentMethods.Count == 0)
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


                    if (restaurant.RestaurantAmenities.Count == 0)
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

                    if (restaurant.RestaurantTables.Count == 0)
                    {
                        if (restaurantVM.RestaurantTables != null)
                        {
                            restaurant.RestaurantTables = restaurantVM.RestaurantTables;
                        }
                    }
                    else if (restaurantVM.RestaurantTables != null)
                    {
                        for (int i = 0; i < restaurant.RestaurantTables.Count; i++)
                        {
                            for (int j = 0; j < restaurantVM.RestaurantTables.Count; j++)
                            {
                                int indexRes = restaurant.RestaurantTables.FindIndex(f => f.Id == restaurantVM.RestaurantTables[j].Id);
                                if (indexRes < 0)
                                {
                                    restaurant.RestaurantTables.Add(restaurantVM.RestaurantTables[j]);
                                }
                                else
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

    }
}
