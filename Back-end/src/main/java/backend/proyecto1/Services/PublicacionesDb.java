package backend.proyecto1.Services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import backend.proyecto1.Helpers.Conexion;
import backend.proyecto1.Models.Publicaciones;

public class PublicacionesDb {
    
    private Connection cn;

    public PublicacionesDb(){
        this.cn = new Conexion().openDb();
    }

    public List<Publicaciones> ObtenerTodasLasPublicaciones(){
        List<Publicaciones> publicaciones = new ArrayList<>();

        try{
            Statement stmt = cn.createStatement();
            String query = "SELECT * FROM Publicaciones";
            ResultSet rs = stmt.executeQuery(query);

            while(rs.next()){
                Publicaciones p = new Publicaciones(
                    rs.getInt("id_publicacion"),
                    rs.getString("titulo"),
                    rs.getString("lugar"),
                    rs.getString("fecha_publicacion"),
                    rs.getInt("id_flora"),
                    rs.getInt("id_fauna")
                );

                publicaciones.add(p);
            }

            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return publicaciones;
    }
}
