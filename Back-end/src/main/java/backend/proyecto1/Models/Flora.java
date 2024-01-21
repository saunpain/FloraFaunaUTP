package backend.proyecto1.Models;

public class Flora {
    
    private int id_flora;
    private String nombre_planta;
    private String nombre_cientifico_flora;
    private String descripcion_cientifica_flora;
    private String categoria_flora;
    private String foto_flora;


    public Flora(){
    }

    public Flora(
        int id_flora, String nombre_planta, String nombre_cientifico_planta,
        String descripcion_cientifica_flora, String categoria_flora, String foto_flora
    ){
        this.id_flora = id_flora;
        this.nombre_planta = nombre_planta;
        this.nombre_cientifico_flora = nombre_cientifico_planta;
        this.descripcion_cientifica_flora = descripcion_cientifica_flora;
        this.categoria_flora = categoria_flora;
        this.foto_flora = foto_flora;
    }

    public int getId_flora() {
        return id_flora;
    }

    public void setId_flora(int id_flora) {
        this.id_flora = id_flora;
    }

    public String getNombre_planta() {
        return nombre_planta;
    }

    public void setNombre_planta(String nombre_planta) {
        this.nombre_planta = nombre_planta;
    }

    public String getNombre_cientifico_flora() {
        return nombre_cientifico_flora;
    }

    public void setNombre_cientifico_flora(String nombre_cientifico_flora) {
        this.nombre_cientifico_flora = nombre_cientifico_flora;
    }

    public String getDescripcion_cientifica_flora() {
        return descripcion_cientifica_flora;
    }

    public void setDescripcion_cientifica_flora(String descripcion_cientifica_flora) {
        this.descripcion_cientifica_flora = descripcion_cientifica_flora;
    }

    public String getCategoria_flora() {
        return categoria_flora;
    }

    public void setCategoria_flora(String categoria_flora) {
        this.categoria_flora = categoria_flora;
    }

    public String getFoto_flora() {
        return foto_flora;
    }

    public void setFoto_flora(String foto_flora){
        this.foto_flora = foto_flora;
    }
    
}
