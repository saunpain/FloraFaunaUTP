package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import backend.proyecto1.Models.Flora;
import backend.proyecto1.Services.FloraDb;

@RestController
public class FloraController {
    
    @GetMapping("/flora/all")
    public List<Flora> TodaLaFlora(){
        return new FloraDb().ObtenerTodaLaFlora();
    }

    @PostMapping("/flora")
    public int InsertarFlora(@RequestBody Flora f){
        return new FloraDb().GuardarFlora(f);
    }

    @PutMapping("/flora")
    public int ActualizarFlora(@RequestBody Flora f){
        return new FloraDb().ActualizarFlora(f);
    }

    @DeleteMapping("/flora/{id}")
    public int Delete(@PathVariable("id") int id){
        return new FloraDb().EliminarFlora(id);
    }
}
