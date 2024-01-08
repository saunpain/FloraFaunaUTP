package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import backend.proyecto1.Models.Verificacion;
import backend.proyecto1.Services.VerificacionDb;

@RestController
public class VerificacionController {
    
    @GetMapping("verificacion/all")
    public List<Verificacion> TodasLasVerificaciones(){
        return new VerificacionDb().ObtenerTodasLasVerificaciones();
    }

    @PostMapping("/verificacion")
    public int InsertarVerificacion(@RequestBody Verificacion v){
        return new VerificacionDb().GuardarVerificacion(v);
    }

    @PutMapping("/verificacion")
    public int ActualizarVerificacion(@RequestBody Verificacion v){
        return new VerificacionDb().ActualizarVerificacion(v);
    }

    @DeleteMapping("/verificacion/{id}")
    public int Delete(@PathVariable("id") int id){
        return new VerificacionDb().EliminarVerificacion(id);
    }
}
