package backend.proyecto1.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


import backend.proyecto1.Helpers.Conexion;
import backend.proyecto1.Models.Fauna;

public class FaunaDb {
    
    private Connection cn;

    public FaunaDb(){
        this.cn = new Conexion().openDb();
    }

    public List<Fauna> ObtenerTodaLaFauna(){
        List<Fauna> fauna = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM Fauna";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Fauna f = new Fauna(
                    rs.getInt("id_fauna"),
                    rs.getString("nombre_animal"),
                    rs.getString("foto_fauna"),
                    rs.getString("nombre_cientifico_fauna"),
                    rs.getString("descripcion_cientifica_fauna"),
                    rs.getString("categoria_fauna")
                );

                fauna.add(f);
            }
            stmt.close();
            rs.close();
        } catch(Exception e){
            System.out.println(e);
        }
        return fauna;
    }

    public Fauna ObtenerFauna(String nomb){
        Fauna f = null;
        try {
            String query = "SELECT * FROM Fauna WHERE nombre_animal = '"+ nomb + "'";
            Statement stmt = cn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            if(rs.next()){
                f = new Fauna(
                    rs.getInt("id_fauna"),
                    rs.getString("nombre_animal"),
                    rs.getString("foto_fauna"),
                    rs.getString("nombre_cientifico_fauna"),
                    rs.getString("descripcion_cientifica_fauna"),
                    rs.getString("categoria_fauna")
                );
        }
        stmt.close();
        rs.close();
        return f;
        } catch (Exception e) {
            
        }
        return f;
    }

    public int GuardarFauna(Fauna f){
        int resultado = 0;
        try{
            Statement stmt = cn.createStatement();
            String query = "Call AgregarFauna('"
                + f.getNombre_animal() + "','"
                + f.getNombre_cientifico_fauna() + "','"
                + f.getDescripcion_cientifica_fauna() + "','"
                + f.getCategoria_fauna() + "','"
                + f.getFoto_fauna() + "')";

            resultado = stmt.executeUpdate(query);
            stmt.close();
            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int ActualizarFauna(Fauna f){
        int resultado = 0;

        System.out.println(f.getId_fauna());
        System.out.println(f.getNombre_animal());
        System.out.println(f.getNombre_cientifico_fauna());
        System.out.println(f.getDescripcion_cientifica_fauna());
        System.out.println(f.getCategoria_fauna());

        try{
            Statement stmt = cn.createStatement();
            String query = "Call ActualizarFauna('"
            + f.getId_fauna() + "','"
            + f.getNombre_animal() + "','"
            + f.getNombre_cientifico_fauna() + "','"
            + f.getDescripcion_cientifica_fauna() + "','"
            + f.getCategoria_fauna() + "')";

            resultado = stmt.executeUpdate(query);
            stmt.close();
            return resultado;
        }catch (Exception e){

        }
        return resultado;
    }


    public int EliminarFauna( int id){
        int resultado = 0;
        try{
            Statement stmt = cn.createStatement();
            String query = "Call EliminarFauna(" + id + ")";
            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch(Exception e){

        }
        return resultado;
    }

    public int ReporteFauna() {
        int cantidad = 0;
    
        try {
            Statement stmt = cn.createStatement();
            String query = "SELECT COUNT(*) FROM Fauna";
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

    public int ReporteReptiles() {
        int cantidad = 0;
    
        try {
            Statement stmt = cn.createStatement();
            String query = "SELECT COUNT(*) FROM Fauna WHERE categoria_fauna = 'Reptiles'";
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
    public int ReporteArtropodos() {
        int cantidad = 0;
    
        try {
            Statement stmt = cn.createStatement();
            String query = "SELECT COUNT(*) FROM Fauna WHERE categoria_fauna = 'Artrópodos'";
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

    public int ReporteAves() {
        int cantidad = 0;
    
        try {
            Statement stmt = cn.createStatement();
            String query = "SELECT COUNT(*) FROM Fauna WHERE categoria_fauna = 'Aves'";
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
    public int ReporteMamiferos() {
        int cantidad = 0;
    
        try {
            Statement stmt = cn.createStatement();
            String query = "SELECT COUNT(*) FROM Fauna WHERE categoria_fauna = 'Mamíferos'";
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

    public int ActualizarNombreCFauna(Fauna f){
        int resultado = 0;

        System.out.println(f.getId_fauna());
        System.out.println(f.getNombre_cientifico_fauna());
        System.out.println(f.getNombre_animal());

        try{
            Statement stmt = cn.createStatement();
            String query = "UPDATE Fauna SET nombre_cientifico_fauna = '"
            + f.getNombre_cientifico_fauna() + "' WHERE nombre_animal = '"
            + f.getNombre_animal() + "'";
            
            resultado = stmt.executeUpdate(query);
            stmt.close();
            return resultado;
        }catch (Exception e){

        }
        return resultado;
    }

    public int ActualizarDescripcion(Fauna f){
        int resultado = 0;

        System.out.println(f.getDescripcion_cientifica_fauna());
        System.out.println(f.getNombre_animal());

        try{
            Statement stmt = cn.createStatement();
            String query = "UPDATE Fauna SET descripcion_cientifica_fauna = '"
            + f.getDescripcion_cientifica_fauna() + "' WHERE nombre_animal = '"
            + f.getNombre_animal() + "'";
            
            resultado = stmt.executeUpdate(query);
            stmt.close();
            return resultado;
        }catch (Exception e){

        }
        return resultado;
    }

    public List<Fauna> FiltrarFauna(String busqueda){
        List<Fauna> fauna = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "CALL FiltrarFauna('" + busqueda + "')";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Fauna f = new Fauna(
                    rs.getInt("id_fauna"),
                    rs.getString("nombre_animal"),
                    rs.getString("foto_fauna"),
                    rs.getString("nombre_cientifico_fauna"),
                    rs.getString("descripcion_cientifica_fauna"),
                    rs.getString("categoria_fauna")
                );

                fauna.add(f);
            }
            stmt.close();
            rs.close();
        } catch(Exception e){
            System.out.println(e);
        }
        return fauna;
    }
}
