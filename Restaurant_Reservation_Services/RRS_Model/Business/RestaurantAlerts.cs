using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using RRS_Model.Base;

namespace RRS_Model.Business
{
    public class RestaurantAlerts: BaseEntity
    {
        public string Message { get; set; }
        public virtual Restaurant Restaurant { get; set; }
    }
}
