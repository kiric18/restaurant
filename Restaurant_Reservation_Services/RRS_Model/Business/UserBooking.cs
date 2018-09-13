using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using RRS_Model.Base;

namespace RRS_Model.Business
{
    public class UserBooking : BaseEntity
    {
        public string Date { get; set; }
        public string Time { get; set; }
        public string ReservationName { get; set; }
        public string ReservationPhoneNumber{ get; set; }
        public string UserEmail{ get; set; }
        public virtual Restaurant Restaurant { get; set; }
        public virtual RestaurantTables RestaurantTables { get; set; }
        public virtual User User { get; set; }
    }
}
