package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import backend.proyecto1.Models.Biologo;
import backend.proyecto1.Services.BiologoDb;

@RestController
public class BiologoController {
    
    @GetMapping("/biologo/all")
    public List<Biologo> TodosLosBiologos(){
        return new BiologoDb().ObtenerTodosLosBiologos();
    }

    @PostMapping("/biologo")
    public int InsertarBiologo(@RequestBody Biologo b){
        return new BiologoDb().GuardarBiologo(b);
    }

    @PutMapping("/biologo")
    public int ActualizarBiologo(@RequestBody Biologo b){
        return new BiologoDb().ActualizarBiologo(b);
    }

    @DeleteMapping("/biologo/{id}")
    public int Delete(@PathVariable("id") int id){
        return new BiologoDb().EliminarBiologo(id);
    }

    @GetMapping("/biologo/{nombre_biologo}")
    public Biologo ObtenerBiologo(@PathVariable("nombre_biologo") String nomb){
        return new BiologoDb().ObtenerBiologo(nomb);
    }
}
