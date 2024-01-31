package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import backend.proyecto1.Services.VistaPubGlobalDb;
import backend.proyecto1.Models.VistaPubGlobal;

@CrossOrigin(origins = "http://127.0.0.1:5501")
@RestController
public class VistaController {

    @GetMapping("vista/all")
    public List<VistaPubGlobal> TodasLasVistaPublicacionesG(){
        return new VistaPubGlobalDb().VistaPublicacionesGlobal();
    }

}
