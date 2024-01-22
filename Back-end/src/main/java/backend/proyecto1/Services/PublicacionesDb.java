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
            String query = "SELECT p.id_publicacion, p.titulo, p.lugar, e.fecha_estudiante, p.id_flora, p.id_fauna, e.id_estudiante " +
                    "FROM Publicaciones p " +
                    "INNER JOIN Estudiante_Publicacion e ON p.id_publicacion = e.id_publicacion";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Publicaciones p = new Publicaciones(
                    rs.getInt("id_publicacion"),
                    rs.getString("titulo"),
                    rs.getString("lugar"),
                    rs.getString("fecha_estudiante"),
                    rs.getInt("id_flora"),
                    rs.getInt("id_fauna"),
                    rs.getInt("id_estudiante")
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
                + p.getfecha_estudiante() + "','"
                + p.getId_flora() + "','"
                + p.getId_fauna() + "','"
                + p.getId_estudiante() + "')";
                
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
                + p.getId_publicacion() + "','"
                + p.getTitulo() + "','"
                + p.getLugar() + "')";
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
