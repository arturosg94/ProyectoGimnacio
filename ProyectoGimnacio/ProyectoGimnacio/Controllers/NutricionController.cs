using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoGimnacio.Models;
using ProyectoGimnacio.Clases;

namespace ProyectoGimnacio.Controllers
{
    public class NutricionController : Controller
    {
        // GET: Nutricion
        public ActionResult Alimentos()
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

        public ActionResult Comidas()
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

        public ActionResult Menu()
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

        public ActionResult Dietas()
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

        public JsonResult MostrarAlimento()
        {
            JsonResult response = null;
            List<Alimento> list = new List<Alimento>();
            NutricionModel cn = new NutricionModel();
            list = cn.MostrarAlimento();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult AgregarAlimento(string Nombre, int Proteinas, decimal Grasas, int Carbohidratos)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.AgregarAlimento(Nombre, Proteinas, Grasas, Carbohidratos);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult MostrarComida()
        {
            JsonResult response = null;
            List<Comida> list = new List<Comida>();
            NutricionModel cn = new NutricionModel();
            list = cn.MostrarComida();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult AgregarMaquina(string Nombre)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.AgregarComida(Nombre);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult MostrarEjercicioFisico()
        {
            JsonResult response = null;
            List<EjercicioFisico> list = new List<EjercicioFisico>();
            NutricionModel cn = new NutricionModel();
            list = cn.MostrarEjercicioFisico();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult AgregarEjercicioFisico(int EjercicioID, int MusculoID, int MaquinaID)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.AgregarEjercicioFisico(EjercicioID, MusculoID, MaquinaID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult MostrarRutina()
        {
            JsonResult response = null;
            List<Rutina> list = new List<Rutina>();
            NutricionModel cn = new NutricionModel();
            list = cn.MostrarRutina();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult AgregarRutina(int NivelRutinaID, int TipoRutinaID, string Nombre)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.AgregarRutina(NivelRutinaID, TipoRutinaID, Nombre);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }


    }
}