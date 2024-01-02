package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.proyecto1.Models.Comentario;
import backend.proyecto1.Services.ComentarioDb;

@RestController
public class ComentarioController {
    
    @GetMapping("/comentario/all")
    public List<Comentario> TodosLosComentarios(){
        return new ComentarioDb().ObtenerTodosLosComentarios();
    }
}
