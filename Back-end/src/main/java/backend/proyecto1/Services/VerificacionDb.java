package backend.proyecto1.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import backend.proyecto1.Helpers.Conexion;
import backend.proyecto1.Models.Verificacion;

public class VerificacionDb {
    
    private Connection cn;

    public VerificacionDb(){
        this.cn = new Conexion().openDb();
    }

    public List<Verificacion> ObtenerTodasLasVerificaciones(){
        List<Verificacion> verificaciones = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM Verificacion";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Verificacion v = new Verificacion(
                    rs.getInt("id_admin"),
                    rs.getInt("id_solicitud"),
                    rs.getInt("id_biologo")
                );

                verificaciones.add(v);
            }

            stmt.close();
            rs.close();
        } catch (Exception e){

        }
        return verificaciones;
    }

    public int GuardarVerificacion(Verificacion v){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call AgregarVerificacion('"
                + v.getId_admin() + "','"
                + v.getId_solicitud() + "','"
                + v.getId_biologo() + "')";

            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int ActualizarVerificacion(Verificacion v){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call ActualizarVerificacion('"
                + v.getId_admin() + "','"
                + v.getId_solicitud() + "','"
                + v.getId_biologo() + "')";

            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int EliminarVerificacion(int id){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call EliminarVerificacion(" + id + ")";
            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch(Exception e){

        }
        return resultado;
    }
}
