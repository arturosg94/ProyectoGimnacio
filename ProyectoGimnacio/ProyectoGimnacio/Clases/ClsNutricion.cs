﻿using System;
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
        public decimal Proteinas { get; set; }
        public decimal Grasas { get; set; }
        public decimal Carbohidratos { get; set; }
        public int Peso { get; set; }
    }

    public class Comida
    {
        public int ComidaID { get; set; }
        public string Nombre { get; set; }
        public int Calorias { get; set; }
        public decimal Proteinas { get; set; }
        public decimal Grasas { get; set; }
        public decimal Carbohidratos { get; set; }
    }

    public class DetalleComida
    {
        public int AlimentoID { get; set; }
        public string AlimentoNombre { get; set; }
        public decimal Carbohidratos { get; set; }
        public int Calorias { get; set; }
        public decimal Proteinas { get; set; }
        public decimal Grasas { get; set; }
    }

    public class Menu
    {
        public int ComidaID { get; set; }
        public string NombreComida { get; set; }
        public int HorarioID { get; set; }
        public string NombreHorario { get; set; }
    }

    public class Dieta
    {
        public int DietaID { get; set; }
        public string Nombre { get; set; }
    }
    public class Horario
    {
        public int HorarioID { get; set; }
        public string Nombre { get; set; }
    }
}
