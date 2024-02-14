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
    
    public List<VistaPubGlobal> VistaPublicacionesFlora(){
        List<VistaPubGlobal> vistaPFlora = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM VistaPublicacionesFlora order by fecha_estudiante DESC";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                VistaPubGlobal flora = new VistaPubGlobal(
                    rs.getInt("id_publicacion"),
                    rs.getString("nombre_estudiante"),
                    rs.getString("fecha_estudiante"),
                    rs.getString("lugar"),
                    rs.getString("titulo"),
                    rs.getString("foto_flora"),
                    rs.getString("nombre_cientifico_flora"),
                    rs.getString("nombre_planta")
                    
                );

                vistaPFlora.add(flora);
            }

            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return vistaPFlora;
    }
    
    public List<VistaPubGlobal> VistaPublicacionesFauna(){
        List<VistaPubGlobal> vistaPFauna = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM VistaPublicacionesFauna order by fecha_estudiante DESC";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                VistaPubGlobal p = new VistaPubGlobal(
                    rs.getInt("id_publicacion"),
                    rs.getString("nombre_estudiante"),
                    rs.getString("fecha_estudiante"),
                    rs.getString("lugar"),
                    rs.getString("titulo"),
                    rs.getString("foto_fauna"),
                    rs.getString("nombre_cientifico_fauna"),
                    rs.getString("nombre_animal")
                );

                vistaPFauna.add(p);
            }

            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return vistaPFauna;
    }

    public List<VistaPubGlobal> VistaFloraCat(String cat) { //Tuve que crear un constructor con las variables que se iban a utilizar en esta funcion, parece que estaba jodiendo por eso
        List<VistaPubGlobal> FloraCat = new ArrayList<>();
    
        try {
            String query = "SELECT * FROM VistaPublicacionesFlora WHERE categoria_flora = '" + cat + "' order by fecha_estudiante DESC";
            Statement stmt = cn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
    
            while (rs.next()) {
                VistaPubGlobal fl = new VistaPubGlobal(
                    rs.getInt("id_publicacion"),
                    rs.getString("nombre_estudiante"),
                    rs.getString("fecha_estudiante"),
                    rs.getString("lugar"),
                    rs.getString("titulo"),
                    rs.getString("foto_flora"),
                    rs.getString("nombre_cientifico_flora"),
                    rs.getString("nombre_planta")
                );
                FloraCat.add(fl);
            }
            stmt.close();
            rs.close();
        } catch (Exception ex) {
            
        }
    
        return FloraCat;
    }

    public List<VistaPubGlobal> VistaFaunaCat(String cat) { //Tuve que crear un constructor con las variables que se iban a utilizar en esta funcion, parece que estaba jodiendo por eso
        List<VistaPubGlobal> FaunaCat = new ArrayList<>();
    
        try {
            String query = "SELECT * FROM VistaPublicacionesFauna WHERE categoria_fauna = '" + cat + "' order by fecha_estudiante DESC";
            Statement stmt = cn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
    
            while (rs.next()) {
                VistaPubGlobal fa = new VistaPubGlobal(
                    rs.getInt("id_publicacion"),
                    rs.getString("nombre_estudiante"),
                    rs.getString("fecha_estudiante"),
                    rs.getString("lugar"),
                    rs.getString("titulo"),
                    rs.getString("foto_fauna"),
                    rs.getString("nombre_cientifico_fauna"),
                    rs.getString("nombre_animal")
                );
                FaunaCat.add(fa);
            }
            stmt.close();
            rs.close();
        } catch (Exception ex) {
            
        }
    
        return FaunaCat;
    }

    public List<VistaPubGlobal> FiltrarPublicaciones(String busqueda){
        List<VistaPubGlobal> vistaG = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "CALL FiltrarPublicacionesGlob('" + busqueda + "')";
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
}
