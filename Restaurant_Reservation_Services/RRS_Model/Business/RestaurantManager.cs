using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using RRS_Model.Base;

namespace RRS_Model.Business
{
     public class RestaurantManager: BaseEntity
    {
        public string ManagerName { get; set; }

        [Required]
        public string Email { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }
    }
}
