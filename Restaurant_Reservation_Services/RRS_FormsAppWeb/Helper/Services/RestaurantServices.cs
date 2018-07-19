using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using RRS_DataAccess.Context;
using RRS_FormsAppWeb.Helper.Common;
using RRS_FormsAppWeb.Models.ViewModel;
using RRS_Model.Business;

namespace RRS_FormsAppWeb.Helper.Services
{
    public class RestaurantServices
    {
        public static RestaurantVM UpdateRestaurantDetails(RestaurantVM restaurantVM)
        {
            try
            {
                //Restaurant restaurant = db.Restaurants.Find(restaurantVM.Id);

                //restaurant.Name = restaurantVM.Name;
                //restaurant.Address = restaurantVM.Address;
                //restaurant.Amenities = restaurantVM.Amenities;
                //restaurant.City = restaurantVM.City;
                //restaurant.Country = restaurantVM.Country;
                //restaurant.Style = restaurantVM.Style;
                //restaurant.Desrciption = restaurantVM.Desrciption;
                //restaurant.PhoneNumber = restaurantVM.PhoneNumber;
                //restaurant.OpeningHoursTo = restaurantVM.OpeningHoursTo;
                //restaurant.OpeningHoursFrom = restaurantVM.OpeningHoursFrom;
                //restaurant.PaymentMethods = restaurantVM.PaymentMethods;
                //restaurant.RestaurantManager.Email = restaurantVM.Email;
                //restaurant.RestaurantManager.Username = restaurantVM.Username;

                //if (!string.IsNullOrEmpty(restaurantVM.Password))
                //{
                //    restaurant.RestaurantManager.Password =restaurantVM.Password;
                //}

                //db.SaveChanges();

                //restaurantVM.Password = "";
                //restaurantVM.ConfirmPassword = "";

                return restaurantVM;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static Restaurant ConvertRestaurantVMToRestaurant(RestaurantVM restaurantVM)
        {
            if (restaurantVM != null)
            {
                Restaurant restaurant = new Restaurant();
                //restaurant.Name = restaurantVM.Name;
                //restaurant.Address = restaurantVM.Address;
                //restaurant.Amenities = restaurantVM.Amenities;
                //restaurant.City = restaurantVM.City;
                //restaurant.Country = restaurantVM.Country;
                //restaurant.Style = restaurantVM.Style;
                //restaurant.Desrciption = restaurantVM.Desrciption;
                //restaurant.PhoneNumber = restaurantVM.PhoneNumber;
                //restaurant.OpeningHoursFrom = restaurantVM.OpeningHoursFrom;
                //restaurant.OpeningHoursTo = restaurantVM.OpeningHoursTo;
                //restaurant.PaymentMethods = restaurantVM.PaymentMethods;

                //restaurant.RestaurantManager = new RestaurantManager();
                //restaurant.RestaurantManager.Email = restaurantVM.Email;
                //restaurant.RestaurantManager.Username = restaurantVM.Username;
                //restaurant.RestaurantManager.Password = Cryptography.GetMD5Hash(restaurantVM.Password);

                return restaurant;
            }
            else
            {
                return null;
            }
        }

        private static RestaurantVM ConvertRestaurantToRestaurantVM(Restaurant restaurant)
        {
            if (restaurant != null)
            {
                RestaurantVM restaurantVM = new RestaurantVM();
                //restaurantVM.Id = restaurant.Id;
                //restaurantVM.Name = restaurant.Name;
                //restaurantVM.Address = restaurant.Address;
                //restaurantVM.Amenities = restaurant.Amenities;
                //restaurantVM.City = restaurant.City;
                //restaurantVM.Country = restaurant.Country;
                //restaurantVM.Style = restaurant.Style;
                //restaurantVM.Desrciption = restaurant.Desrciption;
                //restaurantVM.PhoneNumber = restaurant.PhoneNumber;
                //restaurantVM.OpeningHoursFrom = restaurant.OpeningHoursFrom;
                //restaurantVM.OpeningHoursTo = restaurant.OpeningHoursTo;
                //restaurantVM.PaymentMethods = restaurant.PaymentMethods;
                //restaurantVM.Email = restaurant.RestaurantManager.Email;
                //restaurantVM.Username = restaurant.RestaurantManager.Username;

                return restaurantVM;
            }
            else
            {
                return null;
            }
        }
    }
}