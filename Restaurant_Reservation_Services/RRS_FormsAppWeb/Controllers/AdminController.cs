using RRS_DataAccess.Context;
using RRS_FormsAppWeb.Helper.Common;
using RRS_Model.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RRS_FormsAppWeb.Controllers
{
    public class AdminController : Controller
    {
        private static RRSDatabaseContext db = new RRSDatabaseContext();

        [HttpPost]
        public ActionResult GetModel()
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                // Call action here...
                Admin admin = new Admin();
                admin.Email = "m.kyriakos18@gmail.com";
                result.Data = new
                {
                    Admin = admin
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
                var pass = Cryptography.GetMD5Hash(password);

                // Call action here...
                Admin admin = db.Admins.Where(u => u.Email == email && u.Password == pass).FirstOrDefault();
                if (admin == null)
                {
                    result.Data = new { Result = false };
                }
                else
                {
                    var restaurants = db.Restaurants.ToList();
                    var users = db.Users.ToList();
                    result.Data = new {
                        Result = true,
                        Restaurants = restaurants,
                        Users = users,
                        Admin = admin
                    };
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
        public ActionResult ActivateDeactivateRestaurant(string restaurantId, bool isActive)
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                Restaurant restaurant = db.Restaurants.Find(int.Parse(restaurantId));
                restaurant.IsActive = isActive;

                db.SaveChanges();

                var restaurants = db.Restaurants.ToList();
                var users = db.Users.ToList();

                result.Data = new
                {
                    Result = true,
                    Restaurants = restaurants,
                    Users = users

                };

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
