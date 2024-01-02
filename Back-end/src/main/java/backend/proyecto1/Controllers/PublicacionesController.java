package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.proyecto1.Models.Publicaciones;
import backend.proyecto1.Services.PublicacionesDb;

@RestController
public class PublicacionesController {
    
    @GetMapping("/publicaciones/all")
    public List<Publicaciones> TodasLasPublicaciones(){
        return new PublicacionesDb().ObtenerTodasLasPublicaciones();
    }
}
