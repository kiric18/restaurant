using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RRS_FormsAppWeb.Controllers
{
    public class VirtualRealityWebFrameworkController : Controller
    {
        public ActionResult RestaurantReservationServices()
        {
            return View();
            //return View("~/Views/SPA/Forms.cshtml");
        }
    }
}
