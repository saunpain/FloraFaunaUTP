package backend.proyecto1.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import backend.proyecto1.Helpers.GitHubFileUploader;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5501")
@RestController
@RequestMapping("/api/archivos")
public class ArchivosController {

    String owner = "saunpain";
    String repo = "FloraFaunaUTP";
    String filePath = "Solicitudes/";
    String token = "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";

    @PostMapping("/subir")
    public ResponseEntity<String> subirArchivo(@RequestParam("archivo") MultipartFile archivo) {
        try {
            // Guardar el archivo localmente en el servidor
            String nombreArchivo = System.currentTimeMillis() + "_" + archivo.getOriginalFilename();
            Path rutaArchivo = Path.of("C:\\Users\\mois_\\Desktop\\Repositorios\\FloraFaunaUTP\\Solicitudes", nombreArchivo);
            Files.copy(archivo.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);

            // Subir el archivo al repositorio de GitHub
            GitHubFileUploader.uploadFileToGitHub(owner, repo, filePath + nombreArchivo, rutaArchivo.toFile(), token);

            return ResponseEntity.ok("Archivo subido exitosamente a GitHub.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al subir el archivo: " + e.getMessage());
        }
    }
}

