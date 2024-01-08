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

    public List<Comentario> ObtenerTodosLosComentarios(){
        List<Comentario> comentarios = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM Comentario";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Comentario c = new Comentario(
                    rs.getInt("id_comentario"),
                    rs.getString("comentario"),
                    rs.getInt("id_publicacion")
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
            String query = "Call AgregarComentario('"
                + c.getComentario() + "','"
                + c.getId_publicacion() + "')";

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
            String query = "Call ActualizarAdministrativo('"
                + c.getComentario() + "','"
                + c.getId_publicacion() + "')";

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
}
