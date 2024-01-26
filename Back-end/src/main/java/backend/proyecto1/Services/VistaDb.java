package backend.proyecto1.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import backend.proyecto1.Helpers.Conexion;
import backend.proyecto1.Models.Vista;

public class VistaDb {

    private Connection cn;

    public VistaDb(){
        this.cn = new Conexion().openDb();
    }

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
                    rs.getString("nombre_animal")
                );

                vista.add(p);
            }

            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return vista;
    }
}
