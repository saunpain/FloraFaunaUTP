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
    
    @PostMapping("/publicacion/flora")
    public int InsertarPublicacionesFlora(@RequestBody Publicaciones p){
        return new PublicacionesDb().GuardarPubFlora(p);
    }
    @PostMapping("/publicacion_estudiante")
    public int InsertarPublicacionesEstudiante(@RequestBody Publicaciones e){
        return new PublicacionesDb().GuardarPubEstudiante(e);
    }

    @PutMapping("/publicaciones")
    public int ActualizarPublicaciones(@RequestBody Publicaciones p){
        return new PublicacionesDb().ActualizarPublicaciones(p);
    }

    @DeleteMapping("/publicaciones/{id}")
    public int Delete(@PathVariable("id") int id){
        return new PublicacionesDb().EliminarPublicaciones(id);
    }
    @GetMapping("/publicacion_flora/{id_flora}")
    public Publicaciones ObtenerPubFlora(@PathVariable ("id_flora") int id) {
        return new PublicacionesDb().ObtenerPubFlora(id);
    }

}
