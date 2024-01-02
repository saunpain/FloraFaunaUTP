package backend.proyecto1.Helpers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {
  public Connection openDb() {
    try {
      Class.forName("org.mariadb.jdbc.Driver");
      return DriverManager.getConnection("jdbc:mariadb://mariadb-17648-0.cloudclusters.net:17664/nadim","nadim","N@d1M2023");
    } catch (SQLException e) {
      System.out.println("Error de conexion con la base de datos");
      e.printStackTrace();
    } catch (ClassNotFoundException e) {
      System.out.println("Error al cargar el driver de la base de datos");
      e.printStackTrace();
    }
    return null;
  }
}