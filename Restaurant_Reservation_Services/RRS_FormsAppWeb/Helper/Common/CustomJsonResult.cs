using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RRS_FormsAppWeb.Helper.Common
{
    public class CustomJsonResult: JsonResult
    {
        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }

            HttpResponseBase response = context.HttpContext.Response;

            if (!String.IsNullOrEmpty(ContentType))
            {
                response.ContentType = ContentType;
            }
            else
            {
                response.ContentType = "application/json";
            }
            if (ContentEncoding != null)
            {
                response.ContentEncoding = ContentEncoding;
            }
            if (Data != null)
            {
                var isoConvert = new IsoDateTimeConverter();

                //isoConvert.DateTimeFormat = _dateFormat;
                var jsonSerialize = JsonConvert.SerializeObject(this.Data, new JsonSerializerSettings()
                {
                    Converters = new List<JsonConverter> { isoConvert },
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
                response.Write(jsonSerialize);
            }
        }
    }
}