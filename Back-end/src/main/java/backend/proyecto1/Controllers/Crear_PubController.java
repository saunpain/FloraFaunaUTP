package backend.proyecto1.Controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import backend.proyecto1.Models.Publicaciones;
import backend.proyecto1.Services.PublicacionesDb;

import java.io.File;
import java.io.IOException;

@Controller
public class Crear_PubController{
/* 
    @PostMapping("/procesarFormulario")
    public int InsertarPublicacion(@RequestBody Publicaciones p){
        return new PublicacionesDb().GuardarPublicacion(p);
    } */
    /* 
    public String procesarFormulario(@RequestParam("imagen") MultipartFile file,
        RedirectAttributes redirectAttributes) {
        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Selecciona un archivo para subir.");
            return "redirect:/";
        }

        try {
            String nombreArchivo = file.getOriginalFilename();
            String rutaAlmacenamiento = "https://github.com/saunpain/FloraFaunaUTP/tree/main/FotoPrueba" + nombreArchivo;
            File archivo = new File(rutaAlmacenamiento);

            file.transferTo(archivo);


            redirectAttributes.addFlashAttribute("message", "Imagen subida exitosamente.");
        } catch (IOException e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("message", "Error al subir la imagen.");
        }

        return "redirect:/";
    } */
}
