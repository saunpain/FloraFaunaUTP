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
                    rs.getString("perfil_biologo")
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
