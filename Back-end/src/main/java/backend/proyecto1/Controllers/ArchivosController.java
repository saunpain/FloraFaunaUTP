package backend.proyecto1.Controllers;

import org.kohsuke.github.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import backend.proyecto1.Helpers.Conexion;

import java.io.IOException;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@CrossOrigin(origins = "http://localhost:5500")
public class ArchivosController {

    private Connection cn;

    public ArchivosController(){
        this.cn = new Conexion().openDb();
    }

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("archivo") MultipartFile archivo, String usuario, String correo, String titulo, int id_biologo) {
        try {
            //Autenticación con el token de acceso personal proporcionado por GitHub
            GitHub github = new GitHubBuilder().withOAuthToken("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").build();

            //Obtiende el repositorio
            GHRepository repository = github.getRepository("saunpain/FloraFaunaUTP");

            //Construye la ruta y nombre del archivo basado en fecha y hora
            String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String filePath = "Solicitudes/" + "archivo_" + timeStamp + ".pdf";

            // Sube el archivo al repositorio GitHub
            uploadFileToRepository(repository, archivo, filePath, usuario, correo, titulo, id_biologo);

            return "Archivo subido con éxito";
        }  catch (IOException e) {
            return "Error al subir el archivo: " + e.getMessage();
        } catch (Exception ex) {
            return "Error general al subir el archivo: " + ex.getMessage();
        }
    }

    private int uploadFileToRepository(GHRepository repository, MultipartFile archivo, String filePathh, String usuario, String correo, String titulo, int id_biologo) throws IOException {
        // Ruta directa a la carpeta de "Solicitudes" del repo en GitHub
        String filePath = filePathh;
        
        GHContentBuilder contentBuilder = repository.createContent()
                .content(archivo.getBytes())
                .path(filePath)
                .message("Subir archivo");
        
        contentBuilder.commit();

        int resultado = 0;
        String link = "https://github.com/saunpain/FloraFaunaUTP/blob/main/";
        System.out.println(link + filePath);
        System.out.println(usuario);
        System.out.println(correo);
        System.out.println(titulo);
        System.out.println(id_biologo);

        try{
            Statement stmt = cn.createStatement();
            String query = "CALL AgregarSolicitud('"
                + link + filePath + "','"
                + usuario + "','"
                + correo + "','"
                + titulo + "','"
                + id_biologo + "')";

            resultado = stmt.executeUpdate(query);
            System.out.println(resultado);
            return resultado;
            
        } catch (Exception e){
            System.out.println("Error " + e);
        }
        return resultado;



    }
}
