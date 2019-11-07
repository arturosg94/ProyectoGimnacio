using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoGimnacio.Models;
using ProyectoGimnacio.Clases;

namespace ProyectoGimnacio.Controllers
{
    public class EntrenamientoController : Controller
    {
        // GET: Entrenamiento
        public ActionResult Ejercicios()
        {
            if (Session.Count > 0)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult Maquinas()
        {
            if (Session.Count > 0)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult EjercicioFisico()
        {
            if (Session.Count > 0)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult Rutina()
        {
            if (Session.Count > 0)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public JsonResult MostrarEjercicio()
        {
            JsonResult response = null;
            List<Ejercicio> list = new List<Ejercicio>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.MostrarEjercicio();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult AgregarEjercicio(string Nombre,string Imagen)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.AgregarEjercicio(Nombre, Imagen);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }
    }
}