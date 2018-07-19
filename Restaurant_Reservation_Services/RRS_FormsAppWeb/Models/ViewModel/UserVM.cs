using RRS_Model.Business;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace RRS_FormsAppWeb.Models.ViewModel
{
    public class UserVM
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Gender { get; set; }

        public string Birthday { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string Address { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

    }
}