package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.proyecto1.Models.Flora;
import backend.proyecto1.Services.FloraDb;

@RestController
public class FloraController {
    
    @GetMapping("/flora/all")
    public List<Flora> TodaLaFlora(){
        return new FloraDb().ObtenerTodaLaFlora();
    }
}
