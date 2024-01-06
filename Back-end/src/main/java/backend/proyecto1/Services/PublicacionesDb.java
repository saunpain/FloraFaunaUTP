package backend.proyecto1.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import backend.proyecto1.Helpers.Conexion;
import backend.proyecto1.Models.Publicaciones;

public class PublicacionesDb {
    
    private Connection cn;

    public PublicacionesDb(){
        this.cn = new Conexion().openDb();
    }

    public List<Publicaciones> ObtenerTodasLasPublicaciones(){
        List<Publicaciones> publicaciones = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM Publicaciones";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Publicaciones p = new Publicaciones(
                    rs.getInt("id_publicacion"),
                    rs.getString("titulo"),
                    rs.getString("lugar"),
                    rs.getString("fecha_publicacion"),
                    rs.getInt("id_flora"),
                    rs.getInt("id_fauna")
                );

                publicaciones.add(p);
            }

            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return publicaciones;
    }

    public int GuardarPublicaciones(Publicaciones p){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call AgregarPublicaciones('"
                + p.getTitulo() + "','"
                + p.getLugar() + "','"
                + p.getFecha_publicacion() + "','"
                + p.getId_flora() + "','"
                + p.getId_fauna() + "')";

            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int ActualizarPublicaciones(Publicaciones p){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call ActualizarPublicaciones('"
                + p.getId_publicaciones() + "','"
                + p.getTitulo() + "','"
                + p.getLugar() + "','"
                + p.getId_flora() + "','"
                + p.getId_fauna() + "')";

            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int EliminarPublicaciones(int id){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call EliminarPublicaciones(" + id + ")";
            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch(Exception e){

        }
        return resultado;
    }
}
