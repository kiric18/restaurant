using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using RRS_Model.Base;

namespace RRS_Model.Business
{
    public class UserFavoriteRestaurnat: BaseEntity
    {
        public virtual Restaurant Restaurant { get; set; }
        public virtual User User { get; set; }
    }
}
