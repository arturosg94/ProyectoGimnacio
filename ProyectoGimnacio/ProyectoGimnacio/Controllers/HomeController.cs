using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectoGimnacio.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
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

        public ActionResult Login()
        {
            if (Session.Count > 0)
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                return View();
            }

        }

        public ActionResult Logout()
        {

            Session.Clear();
            return RedirectToAction("Login", "Home");

        }

        //public JsonResult LoginUser(string User, string Password)
        //{
        //    JsonResult list = null;
        //    //bool returnValue = ADLibrary.ADLibrary.LoginActiveDirectory(User, Password);
        //    bool returnValue = true;
        //    //HomeModel cn = new HomeModel();
        //    list = Json(returnValue, JsonRequestBehavior.AllowGet);
        //    return list;
        //}

        public String LoginUser(string DNI, string Password)
        {
            String list = "1";
            Session["DNI"] = DNI;
            return list;
        }

    }
}