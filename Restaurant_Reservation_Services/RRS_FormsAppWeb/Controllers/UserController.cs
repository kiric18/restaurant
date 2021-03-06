﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using RRS_Model.Business;
using RRS_FormsAppWeb.Helper.Services;
using RRS_FormsAppWeb.Models.ViewModel;
using RRS_FormsAppWeb.Helper.Common;
using RRS_DataAccess.Context;
using RRS_Model.Business;

namespace RRS_FormsAppWeb.Controllers
{
    public class UserController : Controller
    {
        private static RRSDatabaseContext db = new RRSDatabaseContext();

        [HttpPost]
        public ActionResult GetModel()
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                // Call action here...
                User user = new User();
                user.UserBookings = new List<UserBooking>();
                user.UserFavoriteRestaurnats = new List<UserFavoriteRestaurnat>();
                user.UserRestaurnatReviews = new List<UserRestaurnatReview>();

                var cuisines = db.Cuisines.ToList();
                var styles = db.Styles.ToList();
                var amenities = db.Amenities.ToList();
                var paymentMethods = db.PaymentMethods.ToList();
                var ambience = db.Ambiences.ToList();
                var restaurantNames = db.Restaurants.Select(r => new { r.Id, r.RestaurantName }).ToList();
                var searchRestaurant = new SearchRestaurant();
                searchRestaurant.Search = new List<OptGroupList>();
                var userBooking = new UserBooking();

                result.Data = new
                {
                    User = user,
                    CuisinesList = cuisines,
                    AmenitiesList = amenities,
                    PaymentMethodsList = paymentMethods,
                    AmbiencesList = ambience,
                    StylesList = styles,
                    RestaurantNamesList = restaurantNames,
                    SearchRestaurant = searchRestaurant,
                    UserBooking = userBooking
                };
                //result.Data = restaurant;
                return result;
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        // POST: SignUp
        [HttpPost]
        public ActionResult SignUp(User userVM)
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();
                var pass = Cryptography.GetMD5Hash(userVM.Password);
                // Check if the email already exists.
                User us = db.Users.Where(u => u.Email == userVM.Email && u.Password == pass).FirstOrDefault();
                if (us == null)
                {
                    db.Users.Add(userVM);
                    db.SaveChanges();

                    result.Data = new { Result = true, User = userVM };
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

        // POST: Login
        [HttpPost]
        public ActionResult Login(string email, string password)
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                var pass = Cryptography.GetMD5Hash(password);
                // Call action here...
                User user = db.Users.Where(u => u.Email == email && u.Password == pass).FirstOrDefault();
                var userPass = db.Users.Where(u => u.Email == email).Select(u => u.Password).FirstOrDefault();
                var userEmail = db.Users.Where(u => u.Email != email && u.Password == pass).Select(u => u.Email).FirstOrDefault();
                if (user == null && userPass == null)
                {
                    result.Data = new { Result = false };
                }
                else if ((userPass != null && userPass != pass) || (userEmail != null && userEmail != email))
                {
                    result.Data = new { Result = true, IsLoginCorrected = false };
                }
                else
                {
                    result.Data = new { Result = true, User = user };
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
        public ActionResult GetUserById(int id)
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                // Call action here...
                User user = db.Users.Find(id);
                if (user == null)
                {
                    result.Data = new { Result = false };
                }
                else
                {
                    result.Data = new { Result = true, User = user };
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
        public ActionResult UpdateAccount(User userVM)
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                User user = db.Users.Find(userVM.Id);
                user.FirstName = userVM.FirstName;
                user.LastName = userVM.LastName;
                user.Address = userVM.Address;
                user.Birthday = userVM.Birthday;
                user.City = userVM.City;
                user.Country = userVM.Country;
                user.Email = userVM.Email;
                user.Username = userVM.Username;
                user.PhoneNumber = userVM.PhoneNumber;
                user.Gender = userVM.Gender;
                if (!string.IsNullOrEmpty(userVM.Password))
                {
                    user.Password = Cryptography.GetMD5Hash(userVM.Password);
                }

                db.SaveChanges();

                result.Data = new { Result = true, User = user };

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        // POST: UserAcount
        [HttpPost]
        public ActionResult BookTable(UserBooking booking)
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();
                UserBooking userBooking = db.UserBookings.Find(booking.Id);
                if (userBooking == null)
                {
                    db.UserBookings.Add(booking);
                    db.SaveChanges();
                    result.Data = new { Result = true, UserBooking = booking };
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
        public ActionResult UpdateUserBookingActive(int userBookingId, bool isActive)
        {
            CustomJsonResult result = new CustomJsonResult();

            UserBooking userBooking = db.UserBookings.Find(userBookingId);
            if (userBooking != null)
            {
                userBooking.IsActive = isActive;
                db.SaveChanges();
                result.Data = userBooking;
            }

            return result;
        }

        [HttpPost]
        public ActionResult GetBookingTables(int resId)
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();

                // Call action here...
                var userBooking = db.UserBookings.Where(r => r.RestaurantId == resId && r.IsActive).ToList();
                if (userBooking != null)
                {
                    result.Data = new { Result = true, UserBooking = userBooking };
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
        public ActionResult CheckIfTableIsBook(UserBooking booking)
        {
            try
            {
                CustomJsonResult result = new CustomJsonResult();
                UserBooking userBooking = db.UserBookings.Where(u => u.Date == booking.Date && u.Time == booking.Time && u.IsActive == true).FirstOrDefault();
                if (userBooking != null)
                {
                    result.Data = new { Result = true, UserBooking = booking };
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
