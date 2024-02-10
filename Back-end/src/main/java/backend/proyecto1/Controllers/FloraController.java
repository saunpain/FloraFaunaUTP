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

    @PutMapping("/floraNombreC")
    public int ActualizarNombreCFlora(@RequestBody Flora f) {
        return new FloraDb().ActualizarNombreCFlora(f);
    }

    @PutMapping("/floraDescripcion")
    public int ActualizarDescripcion(@RequestBody Flora f) {
        return new FloraDb().ActualizarDescripcion(f);
    }

    @DeleteMapping("/flora/{id}")
    public int Delete(@PathVariable("id") int id){
        return new FloraDb().EliminarFlora(id);
    }

    @GetMapping("/flora/{nombre_planta}")
    public Flora ObtenerFlora(@PathVariable("nombre_planta")String nomb){
        return new FloraDb().ObtenerFlora(nomb);
    }

    @GetMapping("/cantidadFlora")
    public int obtenerReporteFlora() {
        return new FloraDb().ReporteFlora();
    }

    @GetMapping("/cantidadArboles")
    public int obtenerReporteArboles() {
        return new FloraDb().ReporteArboles();
    }

    @GetMapping("/cantidadPlantas")
    public int obtenerReportePlantas() {
        return new FloraDb().ReportePlantas();
    }

    @GetMapping("/cantidadHierbas")
    public int obtenerReporteHierbas() {
        return new FloraDb().ReporteHierbas();
    }

    @GetMapping("/flora/filtrar")
    public List<Flora> FiltrarFlora(
        @RequestParam(required = true) String busqueda
    ){
        return new FloraDb().FiltrarFlora(busqueda);
    }
}
