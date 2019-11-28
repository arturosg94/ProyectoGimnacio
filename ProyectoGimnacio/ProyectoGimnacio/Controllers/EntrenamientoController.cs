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

        /****************************EJERCICIO******************************************************/

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


        public JsonResult EditarEjercicio(int EjercicioID,string Nombre, string Imagen)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.EditarEjercicio(EjercicioID,Nombre, Imagen);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult EliminarEjercicio(int EjercicioID)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.EliminarEjercicio(EjercicioID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        /****************************MUSCULO******************************************************/

        public JsonResult MostrarMusculo()
        {
            JsonResult response = null;
            List<Musculo> list = new List<Musculo>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.MostrarMusculo();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        /****************************MAQUINA******************************************************/

        public JsonResult MostrarMaquina()
        {
            JsonResult response = null;
            List<Maquina> list = new List<Maquina>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.MostrarMaquina();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult AgregarMaquina(string Nombre, string Fabricante)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.AgregarMaquina(Nombre, Fabricante);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }
        public JsonResult EditarMaquina(int MaquinaID, string Nombre, string Fabricante)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.EditarMaquina(MaquinaID, Nombre, Fabricante);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult EliminarMaquina(int MaquinaID)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.EliminarMaquina(MaquinaID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        /****************************EJERCICIO-FISICO******************************************************/

        public JsonResult MostrarEjercicioFisico()
        {
            JsonResult response = null;
            List<EjercicioFisico> list = new List<EjercicioFisico>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.MostrarEjercicioFisico();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult AgregarEjercicioFisico(int EjercicioID, int MusculoID, int MaquinaID)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.AgregarEjercicioFisico(EjercicioID, MusculoID, MaquinaID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult EditarEjercicioFisico(int EjercicioFisicoID, int EjercicioID, int MaquinaID, int MusculoID)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.EditarEjercicioFisico(EjercicioFisicoID, EjercicioID, MaquinaID, MusculoID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult EliminarEjercicioFisico(int EjercicioFisicoID)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.EliminarEjercicioFisico(EjercicioFisicoID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        /****************************RUTINA******************************************************/

        public JsonResult MostrarRutina()
        {
            JsonResult response = null;
            List<Rutina> list = new List<Rutina>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.MostrarRutina();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult MostrarDetalleRutina(int RutinaID)
        {
            JsonResult response = null;
            List<DetalleRutina> list = new List<DetalleRutina>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.MostrarDetalleRutina(RutinaID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult AgregarRutina(int NivelRutinaID, int TipoRutinaID, string Nombre)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.AgregarRutina(NivelRutinaID, TipoRutinaID, Nombre);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult AgregarDetalleRutina(int RutinaID, int EjercicioFisicoID, int Series, int Repeticiones, int Peso, int Descanso)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.AgregarDetalleRutina(RutinaID, EjercicioFisicoID, Series, Repeticiones, Peso, Descanso);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult MostrarNivelRutina()
        {
            JsonResult response = null;
            List<NivelRutina> list = new List<NivelRutina>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.MostrarNivelRutina();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult MostrarTipoRutina()
        {
            JsonResult response = null;
            List<TipoRutina> list = new List<TipoRutina>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.MostrarTipoRutina();
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }

        public JsonResult EliminarRutina(int RutinaID)
        {
            JsonResult response = null;
            List<E_MensajeSalida> list = new List<E_MensajeSalida>();
            EntrenamientoModel cn = new EntrenamientoModel();
            list = cn.EliminarRutina(RutinaID);
            response = Json(list, JsonRequestBehavior.AllowGet);
            return response;
        }
    }
}