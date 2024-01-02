package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.proyecto1.Models.Fauna;
import backend.proyecto1.Services.FaunaDb;

@RestController
public class FaunaController {
    
    @GetMapping("/fauna/all")
    public List<Fauna> TodaLaFauna(){
        return new FaunaDb().ObtenerTodaLaFauna();
    }
}
