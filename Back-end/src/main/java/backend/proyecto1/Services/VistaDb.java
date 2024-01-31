package backend.proyecto1.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import backend.proyecto1.Helpers.Conexion;
import backend.proyecto1.Models.VistaPubGlobal;


public class VistaDb {

    private Connection cn;

    public VistaDb(){
        this.cn = new Conexion().openDb();
    }
    /*
    public List<Vista> VistaPublicacionesFauna(){
        List<Vista> vista = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM VistaPublicacionesFauna";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Vista p = new Vista(
                    rs.getString("nombre_estudiante"),
                    rs.getString("fecha_estudiante"),
                    rs.getString("lugar"),
                    rs.getString("titulo"),
                    rs.getString("foto_fauna"),
                    rs.getString("nombre_cientifico_fauna"),
                    rs.getString("nombre_animal"),
                    rs.getInt("id_publicacion")
                );

                vista.add(p);
            }

            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return vista;
    }

    public List<Vista_Fl> VistaPublicacionesFlora(){
        List<Vista_Fl> vistafl = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM VistaPublicacionesFlora";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Vista_Fl p = new Vista_Fl(
                    rs.getString("nombre_estudiante"),
                    rs.getString("fecha_estudiante"),
                    rs.getString("lugar"),
                    rs.getString("titulo"),
                    rs.getString("foto_flora"),
                    rs.getString("nombre_cientifico_flora"),
                    rs.getString("nombre_planta"),
                    rs.getInt("id_publicacion")
                );

                vistafl.add(p);
            }

            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return vistafl;
    }
    */
   public List<VistaPubGlobal> VistaPublicacionesGlobal(){
        List<VistaPubGlobal> vistaG = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT id_publicacion, nombre_estudiante, fecha_estudiante, lugar, titulo, foto_flora, nombre_cientifico_flora, nombre_planta, foto_fauna, nombre_cientifico_fauna, nombre_animal FROM VistaPubGlobal order by fecha_estudiante DESC";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                VistaPubGlobal p = new VistaPubGlobal(
                    rs.getString("nombre_estudiante"),
                    rs.getString("fecha_estudiante"),
                    rs.getString("lugar"),
                    rs.getString("titulo"),
                    rs.getString("foto_flora"),
                    rs.getString("nombre_cientifico_flora"),
                    rs.getString("nombre_planta"),
                    rs.getInt("id_publicacion"),
                    rs.getString("foto_fauna"),
                    rs.getString("nombre_cientifico_fauna"),
                    rs.getString("nombre_animal")
                );

                vistaG.add(p);
            }

            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return vistaG;
    }

    public VistaPubGlobal ObtenerPublicacion(int id) { //Tuve que crear un constructor con las variables que se iban a utilizar en esta funcion, parece que estaba jodiendo por eso
        VistaPubGlobal pub = null;
    
        try {
            String query = "SELECT * FROM VistaPubGlobal WHERE id_publicacion = '"+ id + "'";
            Statement stmt = cn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
    
            if (rs.next()) {
                pub = new VistaPubGlobal(
                    rs.getString("nombre_estudiante"),
                    rs.getString("fecha_estudiante"),
                    rs.getString("lugar"),
                    rs.getString("titulo"),
                    rs.getString("foto_flora"),
                    rs.getString("nombre_cientifico_flora"),
                    rs.getString("nombre_planta"),
                    rs.getString("descripcion_cientifica_flora"),
                    rs.getInt("id_publicacion"),
                    rs.getString("foto_fauna"),
                    rs.getString("nombre_cientifico_fauna"),
                    rs.getString("nombre_animal"),
                    rs.getString("descripcion_cientifica_fauna")
                );
            }
            stmt.close();
            rs.close();
        } catch (Exception ex) {
            
        }
    
        return pub;
    } 
    /*
    public int GuardarPublicacion(VistaPubGlobal p){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call AgregarPublicaciones('"
                + p.+ "','"
                + + "','"
                + + "','"
                + s+ "')";

            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch (Exception e){

        }
        return resultado;
    } */
}
