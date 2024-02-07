package backend.proyecto1.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import backend.proyecto1.Helpers.Conexion;
import backend.proyecto1.Models.Comentario;

public class ComentarioDb {
    
    private Connection cn;

    public ComentarioDb(){
        this.cn = new Conexion().openDb();
    }

    public List<Comentario> ObtenerTodosLosComentarios(int id){
        List<Comentario> comentarios = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM VistaComentario where id_estudiante = '" + id + "'";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Comentario c = new Comentario(
                    rs.getInt("id_comentario"),
                    rs.getString("comentario"),
                    rs.getInt("id_publicacion"),
                    rs.getInt("id_estudiante"),
                    rs.getString("fecha_comentario")
                );
                comentarios.add(c);
            }
        } catch (Exception e){

        }
        return comentarios;
    }

    public int GuardarComentario(Comentario c){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "INSERT INTO Comentario (comentario, id_publicacion, fecha_comentario, id_estudiante) " +
                            "VALUES ('" + c.getComentario() + "', '" + c.getId_publicacion() + "', curdate(), '" + c.getId_estudiante() + "')";

            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int ActualizarComentario(Comentario c){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call ActualizarComentario('"
            + c.getId_comentario() + "','"
            + c.getComentario() +"')";

            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int EliminarComentario(int id){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call EliminarComentario(" + id + ")";
            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch(Exception e){

        }
        return resultado;
    }

    public List<Comentario> ObtenerComentariosPub(int id){
        List<Comentario> comentarios = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM VistaComentario where id_publicacion = '" + id + "' order by fecha_comentario DESC";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Comentario c = new Comentario(
                    rs.getInt("id_comentario"),
                    rs.getString("comentario"),
                    rs.getInt("id_publicacion"),
                    rs.getInt("id_estudiante"),
                    rs.getString("fecha_comentario"),
                    rs.getString("nombre_estudiante")
                );
                comentarios.add(c);
            }
        } catch (Exception e){

        }
        return comentarios;
    }
    
    public int ReporteComentarios() {
        int cantidad = 0;
    
        try {
            Statement stmt = cn.createStatement();
            String query = "SELECT COUNT(*) FROM Comentario";
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
}
