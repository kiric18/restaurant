using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using RRS_Model.Base;

namespace RRS_Model.Business
{
    public class UserRestaurnatReview : BaseEntity
    {
        public string Description { get; set; }
        public string OverallRating { get; set; }
        public ReviewEnum Food { get; set; }
        public ReviewEnum Service { get; set; }
        public ReviewEnum Environment { get; set; }
        public ReviewEnum Price { get; set; }
        public virtual Restaurant Restaurant { get; set; }
        public virtual User User { get; set; }
    }

    public enum ReviewEnum
    {
        Excellent = 5,
        VeryGood = 4,
        Average = 3,
        Poor = 2,
        Terrible = 1,
    }
}
