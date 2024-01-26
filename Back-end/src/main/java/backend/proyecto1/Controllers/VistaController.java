package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import backend.proyecto1.Models.Vista;
import backend.proyecto1.Services.VistaDb;
import backend.proyecto1.Models.Vista_Fl;
import backend.proyecto1.Models.VistaPubGlobal;

@RestController
public class VistaController {
    /*
    @GetMapping("vista/all")
    public List<Vista> TodasLasVistaPublicaciones(){
        return new VistaDb().VistaPublicacionesFauna();
    }
    @GetMapping("vista/all")
    public List<Vista_Fl> TodasLasVistaFlPublicaciones(){
        return new VistaDb().VistaPublicacionesFlora();
    }*/
    @GetMapping("vista/all")
    public List<VistaPubGlobal> TodasLasVistaPublicacionesG(){
        return new VistaDb().VistaPublicacionesGlobal();
    }

}
