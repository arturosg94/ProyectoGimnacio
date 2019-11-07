using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace ProyectoGimnacio.Models
{
    public class ConexionModel
    {
        public static string GymDB { get; set; }

        public ConexionModel()
        {
            GymDB = ConfigurationManager.ConnectionStrings["GymDB"].ConnectionString;
        }
    }
}