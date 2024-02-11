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

    public int GuardarPubFlora(Publicaciones p){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call AgregarPubFlora('"
                + p.getTitulo() + "','"
                + p.getLugar() + "','"
                + p.getId_flora() + "')";
                resultado = stmt.executeUpdate(query);
            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int GuardarPubFauna(Publicaciones p){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call AgregarPubFauna('"
                + p.getTitulo() + "','"
                + p.getLugar() + "','"
                + p.getId_fauna() + "')";
                resultado = stmt.executeUpdate(query);
            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int GuardarPubEstudiante(Publicaciones e){
        int resultado = 10;

        try{
            Statement stmt = cn.createStatement();
            String query = "INSERT INTO Estudiante_Publicacion(id_publicacion, id_estudiante)" +
                "VALUES ('" + e.getId_publicacion() + "', '" + e.getId_estudiante() + "')";
                resultado = stmt.executeUpdate(query);
            return resultado;
        } catch (Exception ex){

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


    public Publicaciones ObtenerPubFlora(int id) {
        Publicaciones pub = null;
    
        try {
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM Publicaciones WHERE id_flora = '"+ id + "'";
            ResultSet rs = stmt.executeQuery(query);
    
            if (rs.next()) {
                pub = new Publicaciones(
                    rs.getInt("id_publicacion"),
                    rs.getString("titulo"),
                    rs.getString("lugar"),
                    rs.getInt("id_flora")
                );
            }
            stmt.close();
            rs.close();
            return pub;
        } catch (Exception ex) {
            
        }
    
        return pub;
    }

    public Publicaciones ObtenerPubFauna(int id) {
        Publicaciones pub = null;
    
        try {
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM Publicaciones WHERE id_fauna = '"+ id + "'";
            ResultSet rs = stmt.executeQuery(query);
    
            if (rs.next()) {
                pub = new Publicaciones(
                    rs.getInt("id_publicacion"),
                    rs.getString("titulo"),
                    rs.getString("lugar"),
                    rs.getInt("id_fauna")
                );
            }
            stmt.close();
            rs.close();
            return pub;
        } catch (Exception ex) {
            
        }
    
        return pub;
    }
    
    public int ReportePublicaciones() {
        int cantidad = 0;
    
        try {
            Statement stmt = cn.createStatement();
            String query = "SELECT COUNT(*) FROM Publicaciones";
            ResultSet resultSet = stmt.executeQuery(query);
            
            if (resultSet.next()) {
                cantidad = resultSet.getInt(1);
            }
            return cantidad;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cantidad;
    }

    public List<Publicaciones> FiltrarPublicaciones(String busqueda){
        List<Publicaciones> publicaciones = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "CALL FiltrarPublicaciones('" + busqueda + "')";
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

    public List<Publicaciones> FiltrarPublicacionesGlob(String busqueda){
        List<Publicaciones> publicaciones = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "CALL FiltrarPublicacionesGlob('" + busqueda + "')";
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
}
