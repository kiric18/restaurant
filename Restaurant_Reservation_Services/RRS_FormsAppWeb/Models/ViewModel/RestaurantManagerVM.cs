using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace RRS_FormsAppWeb.Models.ViewModel
{
     public class RestaurantManagerVM
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter Email!")]
        [DataType(DataType.EmailAddress)]
        [DisplayName("Email")]
        public string Email { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please select Username!")]
        [DisplayName("Username")]
        public string Username { get; set; }

        public PasswordVM PasswordVM { get; set; }
    }
}
