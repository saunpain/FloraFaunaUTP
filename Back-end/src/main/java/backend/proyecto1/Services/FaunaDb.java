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
                    rs.getString("nombre_cientifica_fauna"),
                    rs.getString("decripcion_cientifica_fauna"),
                    rs.getString("categoria_fauna")
                );

                fauna.add(f);
            }
        } catch(Exception e){

        }
        return fauna;
    }
}
