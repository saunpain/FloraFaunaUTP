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

    @PutMapping("/faunaNombreC")
    public int ActualizarNombreCFauna(@RequestBody Fauna f) {
        return new FaunaDb().ActualizarNombreCFauna(f);
    }

    @PutMapping("/faunaDescripcion")
    public int ActualizarDescripcion(@RequestBody Fauna f) {
        return new FaunaDb().ActualizarDescripcion(f);
    }

    @DeleteMapping("/fauna/{id}")
    public int Delete(@PathVariable("id") int id){
        return new FaunaDb().EliminarFauna(id);
    }

    @PostMapping("/fauna")
    public int InsertarFauna(@RequestBody Fauna f){
        return new FaunaDb().GuardarFauna(f);
    }

    @GetMapping("/fauna/{nombre_animal}")
    public Fauna ObtenerFauna(@PathVariable("nombre_animal")String nomb){
        return new FaunaDb().ObtenerFauna(nomb);
    }

    @GetMapping("/cantidadFauna")
    public int obtenerReporteFlora() {
        return new FaunaDb().ReporteFauna();
    }

    @GetMapping("/cantidadReptiles")
    public int obtenerReporteReptiles() {
        return new FaunaDb().ReporteReptiles();
    }

    @GetMapping("/cantidadArtropodos")
    public int obtenerReporteArtropodos() {
        return new FaunaDb().ReporteArtropodos();
    }

    @GetMapping("/cantidadAves")
    public int obtenerReporteAves() {
        return new FaunaDb().ReporteAves();
    }
    
    @GetMapping("/cantidadMamiferos")
    public int obtenerReporteMamiferos() {
        return new FaunaDb().ReporteMamiferos();
    }

    @GetMapping("/fauna/filtrar")
    public List<Fauna> FiltrarFauna(
        @RequestParam(required = true) String busqueda
    ){
        return new FaunaDb().FiltrarFauna(busqueda);
    }
}
