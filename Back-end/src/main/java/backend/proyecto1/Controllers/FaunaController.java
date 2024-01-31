package backend.proyecto1.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import backend.proyecto1.Models.Fauna;
import backend.proyecto1.Services.FaunaDb;


@RestController
public class FaunaController {
    
    @GetMapping("/fauna/all")
    public List<Fauna> TodaLaFauna(){
        return new FaunaDb().ObtenerTodaLaFauna();
    }

    @PutMapping("/fauna")
    public int ActualizarFauna(@RequestBody Fauna f) {
        return new FaunaDb().ActualizarFauna(f);
    }

    @DeleteMapping("/fauna/{id}")
    public int Delete(@PathVariable("id") int id){
        return new FaunaDb().EliminarFauna(id);
    }

    @PostMapping("/fauna")
    public int InsertarFauna(@RequestBody Fauna f){
        return new FaunaDb().GuardarFauna(f);
    }

    @PostMapping("/procesarFormulario")
    public int procesarFormulario(@RequestBody Fauna f){
        return new FaunaDb().GuardarFaunaP(f);
    }
/* 
    @PostMapping("/fauna")
    public int insertarFauna(@RequestPart("imagen") MultipartFile imagen,
                             @RequestPart("titulo") String titulo,
                             @RequestPart("nombreComun") String nombreComun,
                             @RequestPart("nombreCientifico") String nombreCientifico,
                             @RequestPart("lugar") String lugar,
                             @RequestPart("categoria") String categoria,
                             @RequestPart("subcategoria") String subcategoria,
                             @RequestPart("descripcion") String descripcion) {

        try {
            
            String imagenBase64 = Base64.encodeBase64String(imagen.getBytes());

            // Crear la entidad Fauna
            Fauna nuevaFauna = new Fauna();
            nuevaFauna.setNombreAnimal(nombreComun);
            nuevaFauna.setFotoFaunaBase64(imagenBase64); // Almacenar la imagen como una cadena en base64
            nuevaFauna.setNombreCientificoFauna(nombreCientifico);
            nuevaFauna.setDescripcionCientificaFauna(descripcion);
            nuevaFauna.setCategoriaFauna(categoria);

            // Guardar la entidad Fauna en la base de datos
            faunaRepository.save(nuevaFauna);

            return 1; // Puedes ajustar el valor de retorno según tus necesidades
        } catch (Exception e) {
            e.printStackTrace(); // Maneja la excepción adecuadamente según tus necesidades
            return 0; // Indica un fallo en la operación
        }
    }
    */
        /*  

    @PostMapping("/fauna")
    public int subirFotoFauna(@RequestParam("foto") String foto) {
        try {
            byte[] bytesImagen = Base64.getDecoder().decode(foto);
            return new FaunaDb().guardarFotoFauna(bytesImagen);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    } */
}
