using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using RRS_Model.Base;

namespace RRS_Model.Business
{
    public class User: BaseEntity
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Gender { get; set; }

        public string Birthday { get; set; }

        public string PhoneNumber { get; set; }

        [Required]
        public string Email { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string Address { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public List<UserBooking> UserBookings { get; set; }

        public List<UserFavoriteRestaurnat> UserFavoriteRestaurnats { get; set; }

        public List<UserRestaurnatReview> UserRestaurnatReviews { get; set; }
    }
}
