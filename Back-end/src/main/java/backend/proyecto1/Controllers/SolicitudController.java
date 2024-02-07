package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import backend.proyecto1.Models.Solicitud;
import backend.proyecto1.Services.SolicitudDb;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class SolicitudController {
    
    @GetMapping("/solicitud/all")
    public List<Solicitud> TodasLasSolicitudes(){
        return new SolicitudDb().ObtenerTodasLasSolicitudes();
    }

    @PostMapping("/solicitud")
    public int InsertarSolicitud(@RequestBody Solicitud s){
        return new SolicitudDb().GuardarSolicitud(s);
    }

    @PutMapping("/solicitud")
    public int ActualizarSolicitud(@RequestBody Solicitud s){
        return new SolicitudDb().ActualizarSolicitud(s);
    }

    @DeleteMapping("/solicitud/{id}")
    public int Delete(@PathVariable("id") int id){
        return new SolicitudDb().EliminarSolicitud(id);
    }
    @GetMapping("/solicitud_biologo/{id_biologo}")
    public Solicitud obtenerSolitudBiologo(@PathVariable("id_biologo")int id){
        return new SolicitudDb().ObtenerSolicitud(id);
    }
    
}
