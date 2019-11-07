using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoGimnacio.Clases
{
    public class Alimento
    {
        public int AlimentoID { get; set; }
        public string Nombre { get; set; }
        public int Calorias { get; set; }
        public int Proteinas { get; set; }
        public decimal Grasas { get; set; }
        public int Carbohidratos { get; set; }
        public int Peso { get; set; }
    }

    public class Comida
    {
        public int ComidaID { get; set; }
        public string Nombre { get; set; }
        public int Calorias { get; set; }
        public int Proteinas { get; set; }
        public decimal Grasas { get; set; }
        public int Carbohidratos { get; set; }
    }

    public class Menu
    {
        public int MenuID { get; set; }
        public string DietaID { get; set; }
        public int ComidaID { get; set; }
        public int HorarioID { get; set; }
    }

    public class Dieta
    {
        public int DietaID { get; set; }
        public string Nombre { get; set; }
    }
}