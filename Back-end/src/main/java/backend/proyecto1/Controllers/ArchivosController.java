package backend.proyecto1.Controllers;

import org.kohsuke.github.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class ArchivosController{

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            // Autenticación con tu token de acceso personal de GitHub
            GitHub github = new GitHubBuilder().withOAuthToken("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").build();
    
            // Obtener el repositorio existente (debes conocer su nombre y propietario)
            GHRepository repository = github.getRepository("saunpain/FloraFaunaUTP");
    
            // Construir la ruta y nombre del archivo basado en fecha y hora
            String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String filePath = "Solicitudes/" + "archivo_" + timeStamp + ".pdf";  // Ajusta la ruta según tu estructura
    
            // Subir el archivo al repositorio
            uploadFileToRepository(repository, file, filePath);
    
            return "Archivo subido exitosamente!";
        } catch (IOException e) {
            return "Error al subir el archivo: " + e.getMessage();
        }
    }

    private void uploadFileToRepository(GHRepository repository, MultipartFile file, String titulo) throws IOException {
        // Ruta directa sin carpeta adicional "Solicitudes"
        String filePath = titulo;
        
        GHContentBuilder contentBuilder = repository.createContent()
                .content(file.getBytes())
                .path(filePath)
                .message("Subir archivo");
    
        contentBuilder.commit();
    }
    
}
