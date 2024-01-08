package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import backend.proyecto1.Models.Publicaciones;
import backend.proyecto1.Services.PublicacionesDb;

@RestController
public class PublicacionesController {
    
    @GetMapping("/publicaciones/all")
    public List<Publicaciones> TodasLasPublicaciones(){
        return new PublicacionesDb().ObtenerTodasLasPublicaciones();
    }

    @PostMapping("/publicaciones")
    public int InsertarPublicaciones(@RequestBody Publicaciones p){
        return new PublicacionesDb().GuardarPublicaciones(p);
    }

    @PutMapping("/publicaciones")
    public int ActualizarPublicaciones(@RequestBody Publicaciones f){
        return new PublicacionesDb().ActualizarPublicaciones(f);
    }

    @DeleteMapping("/publicaciones/{id}")
    public int Delete(@PathVariable("id") int id){
        return new PublicacionesDb().EliminarPublicaciones(id);
    }
}
