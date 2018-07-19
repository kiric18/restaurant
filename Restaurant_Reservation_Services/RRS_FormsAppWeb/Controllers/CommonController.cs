using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RRS_DataAccess.Context;
using RRS_FormsAppWeb.Helper.Common;
using RRS_Model.Business;

namespace RRS_FormsAppWeb.Controllers
{
    public class CommonController : Controller
    {
        private static RRSDatabaseContext db = new RRSDatabaseContext();
        // GET: Common
        public ActionResult GetAllListOfTags()
        {
            CustomJsonResult result = new CustomJsonResult();

            var cuisines = db.Cuisines;
            var styles = db.Styles;
            var amenities = db.Amenities;
            var paymentMethods = db.PaymentMethods;
            var ambience = db.Ambiences;

            result.Data = new { Result = true,
                CuisinesList = cuisines,
                AmenitiesList = amenities,
                PaymentMethodsList = paymentMethods,
                AmbiencesList = ambience,
                StylesList = styles
            };

            return result;
        }
    }
}