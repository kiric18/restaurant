using RRS_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RRS_Model.Business
{
    public class PaymentMethods
    {
        public new PaymentMethodEnum Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public enum PaymentMethodEnum
    {
        AMEX = 1,
        VISA = 2,
        MasterCard = 3,
    }
}
