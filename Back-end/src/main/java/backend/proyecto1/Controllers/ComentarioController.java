package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import backend.proyecto1.Models.Comentario;
import backend.proyecto1.Services.ComentarioDb;

@RestController
public class ComentarioController {
    
    @GetMapping("/comentario/all")
    public List<Comentario> TodosLosComentarios(){
        return new ComentarioDb().ObtenerTodosLosComentarios();
    }

    @PostMapping("/comentario")
    public int InsertarComentario(@RequestBody Comentario c){
        return new ComentarioDb().GuardarComentario(c);
    }

    @PutMapping("/comentario")
    public int ActualizarComentario(@RequestBody Comentario c){
        return new ComentarioDb().ActualizarComentario(c);
    }

    @DeleteMapping("/comentario/{id}")
    public int Delete(@PathVariable("id") int id){
        return new ComentarioDb().EliminarComentario(id);
    }
}
