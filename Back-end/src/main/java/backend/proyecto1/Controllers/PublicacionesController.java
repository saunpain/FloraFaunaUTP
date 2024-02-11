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
    
    @PostMapping("/publicacion/flora")
    public int InsertarPublicacionesFlora(@RequestBody Publicaciones p){
        return new PublicacionesDb().GuardarPubFlora(p);
    }
    @PostMapping("/publicacion/fauna")
    public int InsertarPublicacionesFauna(@RequestBody Publicaciones p){
        return new PublicacionesDb().GuardarPubFauna(p);
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

    @GetMapping("/publicacion_fauna/{id_fauna}")
    public Publicaciones ObtenerPubFauna(@PathVariable ("id_fauna") int id) {
        return new PublicacionesDb().ObtenerPubFauna(id);
    }

     @GetMapping("/cantidadPub")
    public int obtenerReportePub() {
        return new PublicacionesDb().ReportePublicaciones();
    }

    @GetMapping("/publicacion/filtrar")
    public List<Publicaciones> FiltrarPublicaciones(
        @RequestParam(required = true) String busqueda
    ){
        return new PublicacionesDb().FiltrarPublicaciones(busqueda);
    }

    @GetMapping("/publicacion/filtrarGlob")
    public List<Publicaciones> FiltrarPublicacionesGlob(
        @RequestParam(required = true) String busqueda
    ){
        return new PublicacionesDb().FiltrarPublicaciones(busqueda);
    }
}
