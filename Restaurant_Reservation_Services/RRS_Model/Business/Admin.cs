using RRS_Model.Base;

namespace RRS_Model.Business
{
    public class Admin: BaseEntity
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
