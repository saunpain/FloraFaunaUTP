package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.proyecto1.Models.Verificacion;
import backend.proyecto1.Services.VerificacionDb;

@RestController
public class VerificacionController {
    
    @GetMapping("verificacion/all")
    public List<Verificacion> TodasLasVerificaciones(){
        return new VerificacionDb().ObtenerTodasLasVerificaciones();
    }
}
