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
        /****************************ALIMENTO******************************************************/
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
                        entidad.Proteinas = reader.GetDecimal(3);
                        entidad.Grasas = reader.GetDecimal(4);
                        entidad.Carbohidratos = reader.GetDecimal(5);
                        entidad.Peso = reader.GetInt32(6);
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public List<E_MensajeSalida> AgregarAlimento(string Nombre, int Calorias, decimal Proteinas, decimal Grasas, decimal Carbohidratos)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_alimento", connection);
                command.Parameters.Add("@Accion", SqlDbType.Int).Value = 1;
                command.Parameters.Add("@Nombre", SqlDbType.VarChar).Value = Nombre;
                command.Parameters.Add("@Calorias", SqlDbType.Int).Value = Calorias;
                command.Parameters.Add("@Proteinas", SqlDbType.Int).Value = Proteinas;
                command.Parameters.Add("@Grasas", SqlDbType.Int).Value = Grasas;
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
        public List<E_MensajeSalida> EditarAlimento(int AlimentoID, string Nombre, int Calorias, decimal Proteinas, decimal Grasas, decimal Carbohidratos)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_alimento", connection);
                command.Parameters.Add("@Accion", SqlDbType.Int).Value = 2;
                command.Parameters.Add("@AlimentoID", SqlDbType.VarChar).Value = AlimentoID;
                command.Parameters.Add("@Nombre", SqlDbType.VarChar).Value = Nombre;
                command.Parameters.Add("@Calorias", SqlDbType.Int).Value = Calorias;
                command.Parameters.Add("@Proteinas", SqlDbType.Decimal).Value = Proteinas;
                command.Parameters.Add("@Grasa", SqlDbType.Decimal).Value = Grasas;
                command.Parameters.Add("@Carbohidratos", SqlDbType.Decimal).Value = Carbohidratos;
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
        public List<E_MensajeSalida> EliminarAlimento(int AlimentoID)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_alimento", connection);
                command.Parameters.Add("@Accion", SqlDbType.Int).Value = 3;
                command.Parameters.Add("@AlimentoID", SqlDbType.VarChar).Value = AlimentoID;
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

        /****************************COMIDA******************************************************/
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
                        entidad.Carbohidratos = reader.GetDecimal(3);
                        entidad.Proteinas = reader.GetDecimal(4);
                        entidad.Grasas = reader.GetDecimal(5);
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
        
        /****************************RUTINA******************************************************/
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