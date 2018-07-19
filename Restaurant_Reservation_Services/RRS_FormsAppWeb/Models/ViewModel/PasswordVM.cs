using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RRS_FormsAppWeb.Models.ViewModel
{
    public class PasswordVM
    {
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter Password!")]
        [DisplayName("Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "Confirm password doesn't match, Type again !")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Please confirm your Password!")]
        [DataType(DataType.Password)]
        [DisplayName("Confirm Password")]
        public string ConfirmPassword { get; set; }
    }
}