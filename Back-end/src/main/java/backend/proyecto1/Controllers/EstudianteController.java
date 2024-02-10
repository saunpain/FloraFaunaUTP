package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.proyecto1.Models.Estudiante;
import backend.proyecto1.Services.EstudianteDb;

@RestController
public class EstudianteController {
    
    @GetMapping("/estudiante/all")
    public List<Estudiante> TodosLosEstudiantes(){
        return new EstudianteDb().ObtenerTodosLosEstudiantes();
    }

    @PostMapping("/estudiante")
    public int InsertarEstudiante(@RequestBody Estudiante e){
        return new EstudianteDb().GuardarEstudiante(e);
    }

    @PutMapping("/estudiante")
    public int ActualizarEstudiante(@RequestBody Estudiante e){
        return new EstudianteDb().ActualizarEstudiante(e);
    }

    @DeleteMapping("/estudiante/{id}")
    public int Delete(@PathVariable("id") int id){
        return new EstudianteDb().EliminarEstudiante(id);
    }

    @GetMapping("/estudiante/{nombre_estudiante}")
    public Estudiante ObtenerEstudiante(@PathVariable("nombre_estudiante") String nomb){
        return new EstudianteDb().ObtenerEstudiante(nomb);
    }
    @GetMapping("/cantidadEstudiante")
    public int obtenerReporteEstudiante() {
        return new EstudianteDb().ReporteEstudiante();
    }

    @GetMapping("/estudiante/filtrar")
    public List<Estudiante> FiltrarEstudiantes(
        @RequestParam(required = true) String busqueda
    ){
        return new EstudianteDb().FiltrarEstudiantes(busqueda);
    }
}
