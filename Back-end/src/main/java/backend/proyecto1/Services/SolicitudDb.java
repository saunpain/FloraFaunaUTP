package backend.proyecto1.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import backend.proyecto1.Helpers.Conexion;
import backend.proyecto1.Models.Solicitud;

public class SolicitudDb {
    
    private Connection cn;

    public SolicitudDb(){
        this.cn = new Conexion().openDb();
    }

    public List<Solicitud> ObtenerTodasLasSolicitudes(){
        List<Solicitud> solicitudes = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM Solicitud";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Solicitud s =  new Solicitud(
                    rs.getInt("id_solicitud"),
                    rs.getString("formulario"),
                    rs.getString("estado")
                );

                solicitudes.add(s);
            }

            stmt.close();
            rs.close();
        } catch (Exception e){

        }
        return solicitudes;
    }

    public int GuardarSolicitud(Solicitud s){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call AgregarSolicitud('"
                + s.getFormulario() + "','"
                + s.getEstado() + "')";

            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int ActualizarSolicitud(Solicitud s){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call ActualizarSolicitud('"
                + s.getId_solicitud() + "','"
                + s.getFormulario() + "','"
                + s.getEstado() + "')";

            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int EliminarSolicitud(int id){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call EliminarSolicitud(" + id + ")";
            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch(Exception e){

        }
        return resultado;
    }
}
