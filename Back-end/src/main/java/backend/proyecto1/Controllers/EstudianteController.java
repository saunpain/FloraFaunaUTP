package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.proyecto1.Models.Estudiante;
import backend.proyecto1.Services.EstudianteDb;

@RestController
public class EstudianteController {
    
    @GetMapping("/estudiante/all")
    public List<Estudiante> TodosLosEstudiantes(){
        return new EstudianteDb().ObtenerTodosLosEstudiantes();
    }
}
