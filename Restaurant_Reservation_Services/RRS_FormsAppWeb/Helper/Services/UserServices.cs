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
    public class UserServices
    {
        private static RRSDatabaseContext db = new RRSDatabaseContext();

        public static UserVM UpdateUserDetails(UserVM userVM)
        {
            try
            {
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
                    user.Password = userVM.Password;
                }

                db.SaveChanges();
                userVM.Password = "";
                return userVM;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private static UserVM ConvertUserToUserVM(User user)
        {
            if (user != null)
            {
                UserVM userVM = new UserVM();
                userVM.Id = user.Id;
                userVM.FirstName = user.FirstName;
                userVM.LastName = user.LastName;
                userVM.Address = user.Address;
                userVM.Birthday = user.Birthday;
                userVM.City = user.City;
                userVM.Country = user.Country;
                userVM.Email = user.Email;
                userVM.Username = user.Username;
                userVM.PhoneNumber = user.PhoneNumber;
                userVM.Gender = user.Gender;

                return userVM;
            }
            else
            {
                return null;
            }
        }

        private static User ConvertUserVMToUser(UserVM userVM)
        {
            if (userVM != null)
            {
                User user = new User();
                user.Id = userVM.Id;
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

                return user;
            }
            else
            {
                return null;
            }
        }
    }
}