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

        public List<DetalleComida> MostrarDetalleComida(int ComidaID)
        {
            List<DetalleComida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_most_detallecomida", connection);
                command.Parameters.Add("@ComidaID", SqlDbType.Int).Value = ComidaID;
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    DetalleComida entidad = null;
                    listEntidad = new List<DetalleComida>();
                    while (reader.Read())
                    {
                        entidad = new DetalleComida();
                        entidad.AlimentoID = reader.GetInt32(0);
                        entidad.AlimentoNombre = reader.GetString(1);
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

        public List<E_MensajeSalida> AgregarDetalleComida(int ComidaID,int AlimentoID)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_detallecomida", connection);
                command.Parameters.Add("@Accion", SqlDbType.Int).Value = 1;
                command.Parameters.Add("@ComidaID", SqlDbType.Int).Value = ComidaID;
                command.Parameters.Add("@AlimentoID", SqlDbType.Int).Value = AlimentoID;
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

        public List<E_MensajeSalida> EditarComida(int ComidaID, string Nombre)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_comida", connection);
                command.Parameters.Add("@Accion", SqlDbType.Int).Value = 2;
                command.Parameters.Add("@ComidaID", SqlDbType.Int).Value = ComidaID;
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

        public List<E_MensajeSalida> EliminarComida(int ComidaID)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_comida", connection);
                command.Parameters.Add("@Accion", SqlDbType.Int).Value = 3;
                command.Parameters.Add("@ComidaID", SqlDbType.VarChar).Value = ComidaID;
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
        /****************************DIETA******************************************************/

        public List<Dieta> MostrarDieta()
        {
            List<Dieta> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_most_dieta", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Dieta entidad = null;
                    listEntidad = new List<Dieta>();
                    while (reader.Read())
                    {
                        entidad = new Dieta();
                        entidad.DietaID = reader.GetInt32(0);
                        entidad.Nombre = reader.GetString(1);
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }
        public List<Menu> MostrarDetalleDieta(int DietaID)
        {
            List<Menu> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_most_menu", connection);
                command.Parameters.Add("@DietaID", SqlDbType.Int).Value = DietaID;
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Menu entidad = null;
                    listEntidad = new List<Menu>();
                    while (reader.Read())
                    {
                        entidad = new Menu();
                        entidad.ComidaID = reader.GetInt32(0);
                        entidad.NombreComida = reader.GetString(1);
                        entidad.HorarioID = reader.GetInt32(2);
                        entidad.NombreHorario = reader.GetString(3);

                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public List<E_MensajeSalida> AgregarDieta(string Nombre)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_dieta", connection);
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
        public List<Horario> MostrarHorario()
        {
            List<Horario> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_most_horario", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Horario entidad = null;
                    listEntidad = new List<Horario>();
                    while (reader.Read())
                    {
                        entidad = new Horario();
                        entidad.HorarioID = reader.GetInt32(0);
                        entidad.Nombre = reader.GetString(1);
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public List<E_MensajeSalida> AgregarDetalleDieta(int DietaID, int ComidaID, int HorarioID)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_menu", connection);
                command.Parameters.Add("@Accion", SqlDbType.Int).Value = 1;
                command.Parameters.Add("@DietaID", SqlDbType.Int).Value = DietaID;
                command.Parameters.Add("@ComidaID", SqlDbType.Int).Value = ComidaID;
                command.Parameters.Add("@HorarioID", SqlDbType.Int).Value = HorarioID;
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

        public List<E_MensajeSalida> EliminarDieta(int DietaID)
        {
            List<E_MensajeSalida> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(GymDB))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("pa_mant_dieta", connection);
                command.Parameters.Add("@Accion", SqlDbType.Int).Value = 3;
                command.Parameters.Add("@DietaID", SqlDbType.VarChar).Value = DietaID;
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