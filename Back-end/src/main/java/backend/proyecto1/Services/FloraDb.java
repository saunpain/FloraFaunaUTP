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
                    rs.getString("categoria_fauna")
                );

                flora.add(f);
            }

            stmt.close();
            rs.close();
        } catch(Exception e){

        }
        return flora;
    }
}
