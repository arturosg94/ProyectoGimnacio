using ProyectoGimnacio.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace ProyectoGimnacio.Models
{
    public class HomeModel:ConexionModel
    {
        public List<E_MensajeSalida> ValiUsuario(string DNI, string Contraseña)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_vali_usuario", connection);
                command.Parameters.Add("@DNI", SqlDbType.Char).Value = DNI;
                command.Parameters.Add("@Contrasena", SqlDbType.VarChar).Value = Contraseña;
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    E_MensajeSalida entidad = null;
                    listEntidad = new List<E_MensajeSalida>();
                    while (reader.Read())
                    {
                        entidad = new E_MensajeSalida();
                        entidad.Mensaje = reader.GetString(0);
                        entidad.Valor = reader.GetString(1);
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }
    }
}