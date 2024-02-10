package backend.proyecto1.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import backend.proyecto1.Helpers.Conexion;
import backend.proyecto1.Models.Biologo;

public class BiologoDb {
    
    private Connection cn;

    public BiologoDb(){
        this.cn = new Conexion().openDb();
    }

    public List<Biologo> ObtenerTodosLosBiologos(){
        List<Biologo> biologos = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM Biologo";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Biologo b = new Biologo(
                    rs.getInt("id_biologo"),
                    rs.getString("nombre_biologo"),
                    rs.getString("correo_biologo"),
                    rs.getString("contraseña_biologo"),
                    rs.getString("perfil_biologo"),
                    rs.getString("estado")
                );

                biologos.add(b);
            }

            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return biologos;
    }

    public int GuardarBiologo(Biologo b){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call AgregarBiologo('"
                + b.getNombre_biologo() + "','"
                + b.getCorreo_biologo() + "','"
                + b.getContraseña_biologo() + "','"
                + b.getPerfil_biologo() + "','"
                + b.getEstado() + "')";

            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int ActualizarBiologo(Biologo b){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call ActualizarBiologo('"
                + b.getId_biologo() + "','"
                + b.getNombre_biologo() + "','"
                + b.getCorreo_biologo() + "','"
                + b.getPerfil_biologo() + "','"
                + b.getEstado()+"')";

            resultado = stmt.executeUpdate(query);
            stmt.close();
            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int EliminarBiologo(int id){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call EliminarBiologo(" + id + ")";
            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch(Exception e){

        }
        return resultado;
    }

    public Biologo ObtenerBiologo(String nomb) {
        Biologo b = null;
    
        try {
            String query = "SELECT * FROM Biologo WHERE nombre_biologo = '" + nomb + "'";
            Statement stmt = cn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
    
            if (rs.next()) {
                b= new Biologo(
                    rs.getInt("id_biologo"),
                    rs.getString("nombre_biologo"),
                    rs.getString("correo_biologo"),
                    rs.getString("contraseña_biologo"),
                    rs.getString("perfil_biologo"),
                    rs.getString("estado")
                );
            }
    
            stmt.close();
            rs.close();
            return b;
        } catch (Exception ex) {
            
        }
    
        return b;
    }

    public Biologo ObtenerBiologoID(int id) {
        Biologo b = null;
    
        try {
            String query = "SELECT * FROM Biologo WHERE id_biologo = '" + id + "'";
            Statement stmt = cn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
    
            if (rs.next()) {
                b= new Biologo(
                    rs.getInt("id_biologo"),
                    rs.getString("nombre_biologo"),
                    rs.getString("correo_biologo"),
                    rs.getString("contraseña_biologo"),
                    rs.getString("perfil_biologo"),
                    rs.getString("estado")
                );
            }
    
            stmt.close();
            rs.close();
            return b;
        } catch (Exception ex) {
            
        }
    
        return b;
    }

    public int ReporteBiologo() {
        int cantidad = 0;
    
        try {
            Statement stmt = cn.createStatement();
            String query = "SELECT COUNT(*) FROM Biologo";
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

    public int ReporteBiologosVerificados() {
        int cantidad = 0;
    
        try {
            Statement stmt = cn.createStatement();
            String query = "SELECT COUNT(*) FROM Biologo WHERE estado = 'Aprobado'";
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
    
    public List<Biologo> FiltrarBiologos(String busqueda){
        List<Biologo> biologos = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "CALL FiltrarBiologo('" + busqueda + "')";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Biologo b = new Biologo(
                    rs.getInt("id_biologo"),
                    rs.getString("nombre_biologo"),
                    rs.getString("correo_biologo"),
                    rs.getString("contraseña_biologo"),
                    rs.getString("perfil_biologo"),
                    rs.getString("estado")
                );

                biologos.add(b);
            }

            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return biologos;
    }
}
