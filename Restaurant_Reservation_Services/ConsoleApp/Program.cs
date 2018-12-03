using RRS_DataAccess.Context;
using RRS_FormsAppWeb.Helper.Common;
using RRS_Model.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var db = new RRSDatabaseContext())
            {
                var pass3 = Cryptography.GetMD5Hash("1234");
                Console.WriteLine("1234: " + pass3);
                var pass = Cryptography.GetMD5Hash("12345");
                Console.WriteLine("12345: " + pass);
                var pass2 = Cryptography.GetMD5Hash("123456");
                Console.WriteLine("123456: " + pass2);
                Console.ReadLine();
            }
        }
    }
}
