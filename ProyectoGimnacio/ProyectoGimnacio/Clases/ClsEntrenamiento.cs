using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoGimnacio.Clases
{
    public class Ejercicio
    {
        public int EjercicioID { get; set; }
        public string Nombre { get; set; }
        public string Imagen { get; set; }
    }

    public class Maquina
    {
        public int MaquinaID { get; set; }
        public string Nombre { get; set; }
        public string Fabricante { get; set; }
    }

    public class Musculo
    {
        public int MusculoID { get; set; }
        public string Nombre { get; set; }
        public string ParteCuerpo { get; set; }
    }

    public class EjercicioFisico
    {
        public int EjercicioFisicoID { get; set; }
        public int EjercicioID { get; set; }
        public string EjercicioNombre { get; set; }
        public int MusculoID { get; set; }
        public string MusculoNombre { get; set; }
        public int MaquinaID { get; set; }
        public string MaquinaNombre { get; set; }


    }

    public class Rutina
    {
        public int RutinaID { get; set; }
        public int NivelRutinaID { get; set; }
        public string NivelRutinaNombre { get; set; }
        public int TipoRutinaID { get; set; }
        public string TipoRutinaNombre { get; set; }
        public string Nombre { get; set; }
    }

    public class NivelRutina
    {
        public int NivelRutinaID { get; set; }
        public string Nombre { get; set; }
    }

    public class TipoRutina
    {
        public int TipoRutinaID { get; set; }
        public string Nombre { get; set; }
    }

    public class E_MensajeSalida
    {
        public string Mensaje { get; set; }
        public string Valor { get; set; }
    }
}