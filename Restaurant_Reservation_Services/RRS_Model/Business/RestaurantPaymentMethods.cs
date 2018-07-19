using RRS_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RRS_Model.Business
{
    public class RestaurantPaymentMethods : BaseEntity
    {
        public PaymentMethods PaymentMethod { get; set; }
        public PaymentMethodEnum PaymentMethodId { get; set; }
        public virtual Restaurant Restaurant { get; set; }
    }
}
