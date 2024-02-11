package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import backend.proyecto1.Services.VistaDb;
import backend.proyecto1.Models.VistaPubGlobal;

@RestController
public class VistaController {

    @GetMapping("vista/all")
    public List<VistaPubGlobal> TodasLasVistaPublicacionesG(){
        return new VistaDb().VistaPublicacionesGlobal();
    }

    @GetMapping("/vista/{id_publicacion}")
    public VistaPubGlobal ObtenerPublicacion(@PathVariable ("id_publicacion") int id){
        return new VistaDb().ObtenerPublicacion(id);
    }

    @GetMapping("vista_flora")
    public List<VistaPubGlobal> VistaPublicacionesFlora(){
        return
         new VistaDb().VistaPublicacionesFlora();
    }

    @GetMapping("vista_fauna")
    public List<VistaPubGlobal> VistaPublicacionesFauna(){
        return new VistaDb().VistaPublicacionesFauna();
    }
    
    @GetMapping("/vista_flora/{categoria_flora}")
    public List<VistaPubGlobal> ObtenerFloraCategoria(@PathVariable ("categoria_flora") String cat){
        return new VistaDb().VistaFloraCat(cat);
    }

    @GetMapping("/vista_fauna/{categoria_fauna}")
    public List<VistaPubGlobal> ObtenerFaunaCategoria(@PathVariable ("categoria_fauna") String cat){
        return new VistaDb().VistaFaunaCat(cat);
    }

    @GetMapping("/vista/filtrarGlob")
    public List<VistaPubGlobal> FiltrarPublicacionesGlob(
        @RequestParam(required = true) String busqueda
    ){
        return new VistaDb().FiltrarPublicaciones(busqueda);
    }
}
