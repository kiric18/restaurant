using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RRS_FormsAppWeb.Models.ViewModel
{
    public class Login
    {

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter Email!")]
        [DisplayName("Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter Password!")]
        [DisplayName("Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public string ValidationMessage { get; set; }
    }
}