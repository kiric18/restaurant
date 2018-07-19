using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RRS_FormsAppWeb.Models.ViewModel
{
    public class Signup
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter Email!")]
        [DisplayName("Email")]
        [EmailAddress]
        public string Email { get; set; }

        public PasswordVM PasswordVM { get; set; }

        public string ValidationMessage { get; set; }
    }
}