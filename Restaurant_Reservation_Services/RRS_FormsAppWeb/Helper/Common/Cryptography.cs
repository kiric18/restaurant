using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace RRS_FormsAppWeb.Helper.Common
{
    public class Cryptography
    {
        public Cryptography()
        {
        }

        public static string GetMD5Hash(string password)
        {
            MD5CryptoServiceProvider MD5provider = new MD5CryptoServiceProvider();
            byte[] hasedvalue = MD5provider.ComputeHash(Encoding.Default.GetBytes(password));
            StringBuilder str = new StringBuilder();
            for (int counter = 0; counter < hasedvalue.Length; counter++)
            {
                str.Append(hasedvalue[counter].ToString("x2"));
            }
            return str.ToString();
        }

        public static bool VerifyMD5hash(string hashedvalue2, string prevhashedvalue)
        {
            // Create a StringComparer an compare the hashes.
            StringComparer strcomparer = StringComparer.OrdinalIgnoreCase;

            if (strcomparer.Compare(hashedvalue2, prevhashedvalue).Equals(0))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}