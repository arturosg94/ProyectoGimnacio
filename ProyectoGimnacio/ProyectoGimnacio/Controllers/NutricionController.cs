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

        /****************************ALIMENTO******************************************************/
        public JsonResult MostrarAlimento()
        {
            JsonResult response = null;
            List<Alimento> list = new List<Alimento>();
            NutricionModel cn = new NutricionModel();
            list = cn.MostrarAlimento();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult AgregarAlimento(string Nombre, int Calorias, decimal Proteinas, decimal Grasas, decimal Carbohidratos)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.AgregarAlimento(Nombre, Calorias, Proteinas, Grasas, Carbohidratos);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }
        public JsonResult EditarAlimento(int AlimentoID, string Nombre,int Calorias, decimal Proteinas, decimal Grasas, decimal Carbohidratos)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.EditarAlimento(AlimentoID, Nombre, Calorias, Proteinas, Grasas, Carbohidratos);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult EliminarAlimento(int AlimentoID)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.EliminarAlimento(AlimentoID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }
        /****************************COMIDA******************************************************/

        public JsonResult MostrarComida()
        {
            JsonResult response = null;
            List<Comida> list = new List<Comida>();
            NutricionModel cn = new NutricionModel();
            list = cn.MostrarComida();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult MostrarDetalleComida(int ComidaID)
        {
            JsonResult response = null;
            List<DetalleComida> list = new List<DetalleComida>();
            NutricionModel cn = new NutricionModel();
            list = cn.MostrarDetalleComida(ComidaID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult AgregarComida(string Nombre)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.AgregarComida(Nombre);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult AgregarDetalleComida(int ComidaID, int AlimentoID)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.AgregarDetalleComida(ComidaID, AlimentoID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult EditarComida(int ComidaID, string Nombre)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.EditarComida(ComidaID, Nombre);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult EliminarComida(int ComidaID)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.EliminarComida(ComidaID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        /****************************DIETA******************************************************/

        public JsonResult MostrarDieta()
        {
            JsonResult response = null;
            List<Dieta> list = new List<Dieta>();
            NutricionModel cn = new NutricionModel();
            list = cn.MostrarDieta();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult MostrarDetalleDieta(int DietaID)
        {
            JsonResult response = null;
            List<Menu> list = new List<Menu>();
            NutricionModel cn = new NutricionModel();
            list = cn.MostrarDetalleDieta(DietaID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }
        public JsonResult AgregarDieta(string Nombre)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.AgregarDieta(Nombre);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }
        public JsonResult MostrarHorario()
        {
            JsonResult response = null;
            List<Horario> list = new List<Horario>();
            NutricionModel cn = new NutricionModel();
            list = cn.MostrarHorario();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }
 
        public JsonResult AgregarDetalleDieta(int DietaID,int ComidaID, int HorarioID)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.AgregarDetalleDieta(DietaID, ComidaID, HorarioID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult EliminarDieta(int DietaID)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            NutricionModel cn = new NutricionModel();
            list = cn.EliminarDieta(DietaID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

    }
}