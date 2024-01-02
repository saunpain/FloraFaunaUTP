package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.proyecto1.Models.Administrativo;
import backend.proyecto1.Services.AdministrativoDb;

@RestController
public class AdministrativoController {
    
    @GetMapping("/administrativo/all")
    public List<Administrativo> TodosLosAdministrativos(){
        return new AdministrativoDb().ObtenerTodosLosAdministrativos();
    }
}
