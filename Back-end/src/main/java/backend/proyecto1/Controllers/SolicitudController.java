package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.proyecto1.Models.Solicitud;
import backend.proyecto1.Services.SolicitudDb;

@RestController
public class SolicitudController {
    
    @GetMapping("/solicitud/all")
    public List<Solicitud> TodasLasSolicitudes(){
        return new SolicitudDb().ObtenerTodasLasSolicitudes();
    }
}
