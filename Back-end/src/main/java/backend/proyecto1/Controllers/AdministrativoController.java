package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import backend.proyecto1.Models.Administrativo;
import backend.proyecto1.Services.AdministrativoDb;

@RestController
public class AdministrativoController {
    
    @GetMapping("/administrativo/all")
    public List<Administrativo> TodosLosAdministrativos(){
        return new AdministrativoDb().ObtenerTodosLosAdministrativos();
    }

    @PostMapping("/administrativo")
    public int InsertarAdministrativo(@RequestBody Administrativo a){
        return new AdministrativoDb().GuardarAdministrativo(a);
    }

    @PutMapping("/administrativo")
    public int ActualizarAdministrativo(@RequestBody Administrativo a){
        return new AdministrativoDb().ActualizarAdministrativo(a);
    }

    @DeleteMapping("/administrativo/{id}")
    public int Delete(@PathVariable("id") int id){
        return new AdministrativoDb().EliminarAdministrador(id);
    }

    @GetMapping("/administrativo/{nombre_admin}")
    public Administrativo ObtenerAdmin(@PathVariable("nombre_admin") String nomb){
        return new AdministrativoDb().ObtenerAdmin(nomb);
    }

    @GetMapping("/administrativo/estado_biologo/{id_biologo}")
    public int EstadoBiologo(@PathVariable("id_biologo") int id_biologo){
        return new AdministrativoDb().EstadoDeBiologo(id_biologo);
    }
}
