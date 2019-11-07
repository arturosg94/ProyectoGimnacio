using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data.SqlClient;
using System.Data;
using ProyectoGimnacio.Clases;

namespace ProyectoGimnacio.Models
{
    public class EntrenamientoModel : ConexionModel
    {
        public List<Ejercicio> MostrarEjercicio()
        {
            List<Ejercicio> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_most_ejercicio", connection);
                command.CommandType = CommandType.StoredProcedure;
                //command.Parameters.Add("@UserNetName", SqlDbType.VarChar).Value = UserNetName;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Ejercicio entidad = null;
                    listEntidad = new List<Ejercicio>();
                    while (reader.Read())
                    {
                        entidad = new Ejercicio();
                        entidad.EjercicioID = reader.GetInt32(0);
                        entidad.Nombre = reader.GetString(1);
                        entidad.Imagen = reader.GetString(2);
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public List<E_MensajeSalida> AgregarEjercicio(string Nombre, string Imagen)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_ejercicio", connection);
                command.Parameters.Add("@Accion", SqlDbType.Int).Value = 1;
                command.Parameters.Add("@Nombre", SqlDbType.VarChar).Value = Nombre;
                command.Parameters.Add("@Imagen", SqlDbType.VarChar).Value = Imagen;
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