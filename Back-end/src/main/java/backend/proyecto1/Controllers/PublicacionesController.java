package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import backend.proyecto1.Models.Publicaciones;
import backend.proyecto1.Services.PublicacionesDb;
import backend.proyecto1.Models.Vista_Pub;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class PublicacionesController {
    
    @GetMapping("/publicaciones/all")
    public List<Publicaciones> TodasLasPublicaciones(){
        return new PublicacionesDb().ObtenerTodasLasPublicaciones();
    }
    @GetMapping("/publicacion/{id_publicacion}")
    public Vista_Pub ObtenerPublicacion(@PathVariable ("id_publicacion") int id) {
        return new PublicacionesDb().ObtenerPublicacion(id);
    }
    
    @PostMapping("/publicaciones")
    public int InsertarPublicaciones(@RequestBody Publicaciones p){
        return new PublicacionesDb().GuardarPublicaciones(p);
    }

    @PutMapping("/publicaciones")
    public int ActualizarPublicaciones(@RequestBody Publicaciones p){
        return new PublicacionesDb().ActualizarPublicaciones(p);
    }

    @DeleteMapping("/publicaciones/{id}")
    public int Delete(@PathVariable("id") int id){
        return new PublicacionesDb().EliminarPublicaciones(id);
    }

}
