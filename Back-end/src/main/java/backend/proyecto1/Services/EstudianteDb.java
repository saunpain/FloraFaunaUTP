package backend.proyecto1.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import backend.proyecto1.Helpers.Conexion;
import backend.proyecto1.Models.Estudiante;

public class EstudianteDb {
    
    private Connection cn;

    public EstudianteDb(){
        this.cn = new Conexion().openDb();
    }

    public List<Estudiante> ObtenerTodosLosEstudiantes(){
        List<Estudiante> estudiantes = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM Estudiante";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Estudiante e = new Estudiante(
                    rs.getInt("id_estudiante"),
                    rs.getString("nombre_estudiante"),
                    rs.getString("correo_estudiante"),
                    rs.getString("contraseña_estudiante"),
                    rs.getString("perfil_estudiante")
                );

                estudiantes.add(e);
            }

            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return estudiantes;
    }

    public int GuardarEstudiante(Estudiante e){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call AgregarEstudiante('"
                + e.getNombre_estudiante() + "','"
                + e.getCorreo_estudiante() + "','"
                + e.getContraseña_estudiante() + "','"
                + e.getPerfil_estudiante() + "')";

            resultado = stmt.executeUpdate(query);
            stmt.close();
            return resultado;
        } catch (Exception ex){
            System.out.println(ex);
        }
        return resultado;
    }

    public int ActualizarEstudiante(Estudiante e){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call ActualizarEstudiante('"
                + e.getId_estudiante() + "','"
                + e.getNombre_estudiante() + "','"
                + e.getCorreo_estudiante() + "','"
                + e.getPerfil_estudiante() + "')";

            resultado = stmt.executeUpdate(query);
            stmt.close();
            return resultado;
        } catch (Exception ex){

        }
        return resultado;
    }

    public int EliminarEstudiante(int id){
        int resultado = 0;

        try{
            Statement stmt = cn.createStatement();
            String query = "Call EliminarEstudiante(" + id + ")";
            resultado = stmt.executeUpdate(query);

            return resultado;
        } catch(Exception e){

        }
        return resultado;
    }
}
