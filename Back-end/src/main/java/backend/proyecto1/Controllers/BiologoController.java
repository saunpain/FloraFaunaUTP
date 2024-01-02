package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.proyecto1.Models.Biologo;
import backend.proyecto1.Services.BiologoDb;

@RestController
public class BiologoController {
    
    @GetMapping("/biologo/all")
    public List<Biologo> TodosLosBiologos(){
        return new BiologoDb().ObtenerTodosLosBiologos();
    }
}
