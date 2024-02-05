package backend.proyecto1.Models;

public class VistaPubGlobal {
    private String nombre_estudiante;
    private String fecha_estudiante;
    private String lugar;
    private String titulo;
    private String foto_flora;
    private String nombre_cientifico_flora;
    private String nombre_planta;
    private String categoria_flora;
    private String descripcion_cientifica_flora;
    private int id_publicacion;
    private String foto_fauna;
    private String nombre_cientifico_fauna;
    private String nombre_animal;
    private String categoria_fauna;
    private String descripcion_cientifica_fauna;

    
    public VistaPubGlobal() {
    }

    public VistaPubGlobal(int id_publicacion, String nombre_estudiante, String fecha_estudiante, String lugar, String titulo,
            String foto_flora, String nombre_cientifico_flora, String nombre_planta) {
        this.id_publicacion = id_publicacion;
        this.nombre_estudiante = nombre_estudiante;
        this.fecha_estudiante = fecha_estudiante;
        this.lugar = lugar;
        this.titulo = titulo;
        this.foto_flora = foto_flora;
        this.nombre_cientifico_flora = nombre_cientifico_flora;
        this.nombre_planta = nombre_planta;
    }
    public VistaPubGlobal(int id_publicacion, String nombre_estudiante, String fecha_estudiante, String lugar, String titulo,
            String foto_flora, String nombre_cientifico_flora, String nombre_planta, String categoria_flora) {
        this.id_publicacion = id_publicacion;
        this.nombre_estudiante = nombre_estudiante;
        this.fecha_estudiante = fecha_estudiante;
        this.lugar = lugar;
        this.titulo = titulo;
        this.foto_flora = foto_flora;
        this.nombre_cientifico_flora = nombre_cientifico_flora;
        this.nombre_planta = nombre_planta;
        this.categoria_flora = categoria_flora;
    }
    
    public VistaPubGlobal(String nombre_estudiante, String fecha_estudiante, String lugar, String titulo,
            String foto_flora, String nombre_cientifico_flora, String nombre_planta, int id_publicacion,
            String foto_fauna, String nombre_cientifico_fauna, String nombre_animal) {
        this.nombre_estudiante = nombre_estudiante;
        this.fecha_estudiante = fecha_estudiante;
        this.lugar = lugar;
        this.titulo = titulo;
        this.foto_flora = foto_flora;
        this.nombre_cientifico_flora = nombre_cientifico_flora;
        this.nombre_planta = nombre_planta;
        this.id_publicacion = id_publicacion;
        this.foto_fauna = foto_fauna;
        this.nombre_cientifico_fauna = nombre_cientifico_fauna;
        this.nombre_animal = nombre_animal;
    }
    public VistaPubGlobal(String nombre_estudiante, String fecha_estudiante, String lugar, String titulo,
            String foto_flora, String nombre_cientifico_flora, String nombre_planta, String descripcion_cientifica_flora, int id_publicacion,
            String foto_fauna, String nombre_cientifico_fauna, String nombre_animal, String descripcion_cientifica_fauna) {
        this.nombre_estudiante = nombre_estudiante;
        this.fecha_estudiante = fecha_estudiante;
        this.lugar = lugar;
        this.titulo = titulo;
        this.foto_flora = foto_flora;
        this.nombre_cientifico_flora = nombre_cientifico_flora;
        this.nombre_planta = nombre_planta;
        this.descripcion_cientifica_flora = descripcion_cientifica_flora;
        this.id_publicacion = id_publicacion;
        this.foto_fauna = foto_fauna;
        this.nombre_cientifico_fauna = nombre_cientifico_fauna;
        this.nombre_animal = nombre_animal;
        this.descripcion_cientifica_fauna = descripcion_cientifica_fauna;
    }

    public String getNombre_estudiante() {
        return nombre_estudiante;
    }
    public void setNombre_estudiante(String nombre_estudiante) {
        this.nombre_estudiante = nombre_estudiante;
    }
    public String getFecha_estudiante() {
        return fecha_estudiante;
    }
    public void setFecha_estudiante(String fecha_estudiante) {
        this.fecha_estudiante = fecha_estudiante;
    }
    public String getLugar() {
        return lugar;
    }
    public void setLugar(String lugar) {
        this.lugar = lugar;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public String getFoto_flora() {
        return foto_flora;
    }
    public void setFoto_flora(String foto_flora) {
        this.foto_flora = foto_flora;
    }
    public String getNombre_cientifico_flora() {
        return nombre_cientifico_flora;
    }
    public void setNombre_cientifico_flora(String nombre_cientifico_flora) {
        this.nombre_cientifico_flora = nombre_cientifico_flora;
    }
    public String getNombre_planta() {
        return nombre_planta;
    }
    public void setNombre_planta(String nombre_planta) {
        this.nombre_planta = nombre_planta;
    }
    public String getCategoria_flora() {
        return categoria_flora;
    }
    public void setCategoria_flora(String categoria_flora) {
        this.categoria_flora = categoria_flora;
    }
    public String getDescripcion_cientifica_flora() {
        return descripcion_cientifica_flora;
    }
    public void setDescripcion_cientifica_flora(String descripcion_cientifica_flora) {
        this.descripcion_cientifica_flora = descripcion_cientifica_flora;
    }
    public int getId_publicacion() {
        return id_publicacion;
    }
    public void setId_publicacion(int id_publicacion) {
        this.id_publicacion = id_publicacion;
    }
    public String getFoto_fauna() {
        return foto_fauna;
    }
    public void setFoto_fauna(String foto_fauna) {
        this.foto_fauna = foto_fauna;
    }
    public String getNombre_cientifico_fauna() {
        return nombre_cientifico_fauna;
    }
    public void setNombre_cientifico_fauna(String nombre_cientifico_fauna) {
        this.nombre_cientifico_fauna = nombre_cientifico_fauna;
    }
    public String getNombre_animal() {
        return nombre_animal;
    }
    public void setNombre_animal(String nombre_animal) {
        this.nombre_animal = nombre_animal;
    }
    public String getCategoria_fauna() {
        return categoria_fauna;
    }
    public void setCategoria_fauna(String categoria_fauna) {
        this.categoria_fauna = categoria_fauna;
    }
    public String getDescripcion_cientifica_fauna() {
        return descripcion_cientifica_fauna;
    }
    public void setDescripcion_cientifica_fauna(String descripcion_cientifica_fauna) {
        this.descripcion_cientifica_fauna = descripcion_cientifica_fauna;
    }
}
