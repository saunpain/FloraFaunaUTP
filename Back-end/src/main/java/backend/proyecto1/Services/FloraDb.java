package backend.proyecto1.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import backend.proyecto1.Helpers.Conexion;
import backend.proyecto1.Models.Flora;

public class FloraDb {
    
    private Connection cn;

    public FloraDb(){
        this.cn = new Conexion().openDb();
    }

    public List<Flora> ObtenerTodaLaFlora(){
        List<Flora> flora = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM Flora";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Flora f = new Flora(
                    rs.getInt("id_flora"),
                    rs.getString("nombre_planta"),
                    rs.getString("nombre_cientifico_flora"),
                    rs.getString("descripcion_cientifica_flora"),
                    rs.getString("categoria_flora"),
                    rs.getString("foto_flora")
                );

                flora.add(f);
            }
            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return flora;
    }

    public Flora ObtenerFlora(String nomb){
        Flora f = null;
        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM Flora WHERE nombre_planta = '"+ nomb + "'";
            ResultSet rs = stmt.executeQuery(query);

            if(rs.next()){
                f = new Flora(
                    rs.getInt("id_flora"),
                    rs.getString("nombre_planta"),
                    rs.getString("nombre_cientifico_flora"),
                    rs.getString("descripcion_cientifica_flora"),
                    rs.getString("categoria_flora"),
                    rs.getString("foto_flora")
                );
            }
            stmt.close();
            rs.close();
        } catch(Exception e){

        }

        return f;
    }

    public int GuardarFlora(Flora f){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call AgregarFlora('"
                + f.getNombre_planta() + "','"
                + f.getNombre_cientifico_flora() + "','"
                + f.getCategoria_flora() + "','"
                + f.getDescripcion_cientifica_flora() + "','"
                + f.getFoto_flora() +"')";

            resultado = stmt.executeUpdate(query);
            stmt.close();
            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int ActualizarFlora(Flora f){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call ActualizarFlora('"
                + f.getId_flora() + "','"
                + f.getNombre_planta() + "','"
                + f.getNombre_cientifico_flora() + "','"
                + f.getDescripcion_cientifica_flora() + "','"
                + f.getCategoria_flora() + "')";

            resultado = stmt.executeUpdate(query);
            stmt.close();
            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int EliminarFlora(int id){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call EliminarFlora(" + id + ")";
            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch(Exception e){

        }
        return resultado;
    }

}
