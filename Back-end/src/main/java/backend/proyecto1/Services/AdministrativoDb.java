package backend.proyecto1.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import backend.proyecto1.Helpers.Conexion;
import backend.proyecto1.Models.Administrativo;

public class AdministrativoDb {
    
    private Connection cn;

    public AdministrativoDb(){
        this.cn = new Conexion().openDb();
    }

    public List<Administrativo> ObtenerTodosLosAdministrativos(){
        List<Administrativo> administrativos = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM Administrativo";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Administrativo a = new Administrativo(
                    rs.getInt("id_admin"),
                    rs.getString("nombre_admin"),
                    rs.getString("correo_admin"),
                    rs.getString("contraseña_admin"),
                    rs.getString("perfil_admin")
                );

                administrativos.add(a);
            }

            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return administrativos;
    }

    public int GuardarAdministrativo(Administrativo a){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call AgregarAdministrativo('"
                + a.getNombre_admin() + "','"
                + a.getCorreo_admin() + "','"
                + a.getContraseña_admin() + "','"
                + a.getPerfil_admin() + "')";

            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int ActualizarAdministrativo(Administrativo a){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call ActualizarAdministrativo('"
                + a.getId_admin() + "','"
                + a.getNombre_admin() + "','"
                + a.getCorreo_admin() + "')";

            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch (Exception e){

        }
        return resultado;
    }

    public int EliminarAdministrador(int id){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call EliminarAdministrativo(" + id + ")";
            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch(Exception e){

        }
        return resultado;
    }
}
