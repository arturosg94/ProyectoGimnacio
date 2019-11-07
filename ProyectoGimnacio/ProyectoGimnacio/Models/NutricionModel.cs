using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data.SqlClient;
using System.Data;
using ProyectoGimnacio.Clases;

namespace ProyectoGimnacio.Models
{
    public class NutricionModel : ConexionModel
    {
        public List<Alimento> MostrarAlimento()
        {
            List<Alimento> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_most_alimento", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Alimento entidad = null;
                    listEntidad = new List<Alimento>();
                    while (reader.Read())
                    {
                        entidad = new Alimento();
                        entidad.AlimentoID = reader.GetInt32(0);
                        entidad.Nombre = reader.GetString(1);
                        entidad.Calorias = reader.GetInt32(2);
                        entidad.Proteinas = reader.GetInt32(2);
                        entidad.Grasas = reader.GetDecimal(3);
                        entidad.Carbohidratos = reader.GetInt32(4);
                        entidad.Carbohidratos = reader.GetInt32(4);
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public List<E_MensajeSalida> AgregarAlimento(string Nombre, int Proteinas, decimal Grasas, int Carbohidratos)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_alimento", connection);
                command.Parameters.Add("@Accion", SqlDbType.Int).Value = 1;
                command.Parameters.Add("@Nombre", SqlDbType.VarChar).Value = Nombre;
                command.Parameters.Add("@Proteinas", SqlDbType.Int).Value = Proteinas;
                command.Parameters.Add("@Grasa", SqlDbType.Int).Value = Grasas;
                command.Parameters.Add("@Carbohidratos", SqlDbType.Int).Value = Carbohidratos;
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

        public List<Comida> MostrarComida()
        {
            List<Comida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_most_comida", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Comida entidad = null;
                    listEntidad = new List<Comida>();
                    while (reader.Read())
                    {
                        entidad = new Comida();
                        entidad.ComidaID = reader.GetInt32(0);
                        entidad.Nombre = reader.GetString(1);
                        entidad.Calorias = reader.GetInt32(2);
                        entidad.Carbohidratos = reader.GetInt32(3);
                        entidad.Proteinas = reader.GetInt32(4);
                        entidad.Grasas = reader.GetInt32(5);
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public List<E_MensajeSalida> AgregarComida(string Nombre)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_comida", connection);
                command.Parameters.Add("@Accion", SqlDbType.Int).Value = 1;
                command.Parameters.Add("@Nombre", SqlDbType.VarChar).Value = Nombre;
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

        public List<EjercicioFisico> MostrarEjercicioFisico()
        {
            List<EjercicioFisico> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_most_EjercicioFisico", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    EjercicioFisico entidad = null;
                    listEntidad = new List<EjercicioFisico>();
                    while (reader.Read())
                    {
                        entidad = new EjercicioFisico();
                        entidad.EjercicioFisicoID = reader.GetInt32(0);
                        entidad.EjercicioID = reader.GetInt32(1);
                        entidad.EjercicioNombre = reader.GetString(2);
                        entidad.MusculoID = reader.GetInt32(3);
                        entidad.MusculoNombre = reader.GetString(4);
                        entidad.MaquinaID = reader.GetInt32(5);
                        entidad.MaquinaNombre = reader.GetString(6);
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public List<E_MensajeSalida> AgregarEjercicioFisico(int EjercicioID, int MusculoID, int MaquinaID)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_ejerciciofisico", connection);
                command.Parameters.Add("@Accion", SqlDbType.Int).Value = 1;
                command.Parameters.Add("@EjercicioID", SqlDbType.Int).Value = EjercicioID;
                command.Parameters.Add("@MusculoID", SqlDbType.Int).Value = MusculoID;
                command.Parameters.Add("@MaquinaID", SqlDbType.Int).Value = MaquinaID;
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

        public List<Rutina> MostrarRutina()
        {
            List<Rutina> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_most_Rutina", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Rutina entidad = null;
                    listEntidad = new List<Rutina>();
                    while (reader.Read())
                    {
                        entidad = new Rutina();
                        entidad.RutinaID = reader.GetInt32(0);
                        entidad.NivelRutinaID = reader.GetInt32(1);
                        entidad.NivelRutinaNombre = reader.GetString(2);
                        entidad.TipoRutinaID = reader.GetInt32(3);
                        entidad.TipoRutinaNombre = reader.GetString(4);
                        entidad.Nombre = reader.GetString(5);
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public List<E_MensajeSalida> AgregarRutina(int NivelRutinaID, int TipoRutinaID, string Nombre)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_ejerciciofisico", connection);
                command.Parameters.Add("@Accion", SqlDbType.Int).Value = 1;
                command.Parameters.Add("@NivelRutinaID", SqlDbType.Int).Value = NivelRutinaID;
                command.Parameters.Add("@TipoRutinaID", SqlDbType.Int).Value = TipoRutinaID;
                command.Parameters.Add("@Nombre", SqlDbType.VarChar).Value = Nombre;
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