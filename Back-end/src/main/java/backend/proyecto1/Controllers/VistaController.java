package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import backend.proyecto1.Models.Vista;
import backend.proyecto1.Services.VistaDb;

@RestController
public class VistaController {
    
    @GetMapping("vista/all")
    public List<Vista> TodasLasVistaPublicaciones(){
        return new VistaDb().VistaPublicacionesFauna();
    }

}
