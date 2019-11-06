using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ProyectoGimnacio
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Login", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "login",
                url: "login",
                defaults: new { controller = "Home", action = "Login", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "home",
                url: "home",
                defaults: new { controller = "Home", action = "Index" }
            );

            routes.MapRoute(
                name: "ejercicios",
                url: "ejercicios",
                defaults: new { controller = "Entrenamiento", action = "Ejercicios" }
            );

            routes.MapRoute(
                name: "maquinas",
                url: "maquinas",
                defaults: new { controller = "Entrenamiento", action = "Maquinas" }
            );

            routes.MapRoute(
                name: "ejercicio_fisico",
                url: "ejercicio_fisico",
                defaults: new { controller = "Entrenamiento", action = "EjercicioFisico" }
            );

            routes.MapRoute(
                name: "Rutina",
                url: "Rutina",
                defaults: new { controller = "Entrenamiento", action = "Rutina" }
            );

            routes.MapRoute(
                name: "alimentos",
                url: "alimentos",
                defaults: new { controller = "Nutricion", action = "Alimentos" }
            );

            routes.MapRoute(
                name: "comidas",
                url: "comidas",
                defaults: new { controller = "Nutricion", action = "Comidas" }
            );

            routes.MapRoute(
                name: "menu",
                url: "menu",
                defaults: new { controller = "Nutricion", action = "Menu" }
            );

            routes.MapRoute(
                name: "dietas",
                url: "dietas",
                defaults: new { controller = "Nutricion", action = "Dietas" }
            );
        }
    }
}
