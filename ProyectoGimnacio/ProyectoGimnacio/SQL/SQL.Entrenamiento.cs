using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoGimnacio.SQL
{
    public class SQL
    {
        #region "SQL"
        public const string SQL_ROLE_COUNTBYUSER = "pa_mant_maquina";
        #endregion

        #region "PARAMETERS"
        public const string PARAM_ACCION = "@Accion";
        public const string PARAM_MAQUINAID = "@MaquinaID";
        public const string PARAM_NOMBRE = "@Nombre";
        public const string PARAM_FABRICANTE = "@Fabricante";
        #endregion
    }
}