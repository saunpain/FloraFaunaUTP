package backend.proyecto1.Models;

public class Vista_Pub {
    private String nombre_estudiante;
    private String fecha_estudiante;
    private String lugar;
    private String titulo;
    private String foto_flora;
    private String nombre_cientifico_flora;
    private String nombre_planta;
    private String descripcion_cientifica_flora;
    private int id_publicacion;
    private String foto_fauna;
    private String nombre_cientifico_fauna;
    private String nombre_animal;
    private String descripcion_cientifica_fauna;
    private int id_comentario;
    private String comentario;
    private String fecha_comentario;

    public Vista_Pub(String nombre_estudiante, String fecha_estudiante, String lugar, String titulo, String foto_flora,
            String nombre_cientifico_flora, String nombre_planta, String descripcion_cientifica_flora,
            int id_publicacion, String foto_fauna, String nombre_cientifico_fauna, String nombre_animal,
            String descripcion_cientifica_fauna, int id_comentario, String comentario, String fecha_comentario) {

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
        this.id_comentario = id_comentario;
        this.comentario = comentario;
        this.fecha_comentario = fecha_comentario;
    }
    
    public Vista_Pub() {
        
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
    public String getDescripcion_cientifica_fauna() {
        return descripcion_cientifica_fauna;
    }
    public void setDescripcion_cientifica_fauna(String descripcion_cientifica_fauna) {
        this.descripcion_cientifica_fauna = descripcion_cientifica_fauna;
    }
    public int getId_comentario() {
        return id_comentario;
    }
    public void setId_comentario(int id_comentario) {
        this.id_comentario = id_comentario;
    }
    public String getComentario() {
        return comentario;
    }
    public void setComentario(String comentario) {
        this.comentario = comentario;
    }
    public String getFecha_comentario() {
        return fecha_comentario;
    }
    public void setFecha_comentario(String fecha_comentario) {
        this.fecha_comentario = fecha_comentario;
    }
    
    
    
    
}
