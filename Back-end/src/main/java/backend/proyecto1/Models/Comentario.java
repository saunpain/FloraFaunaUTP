package backend.proyecto1.Models;

public class Comentario {
    
    private int id_comentario;
    private String comentario;
    private int id_publicacion;
    private int id_estudiante;
    private String fecha_comentario;
    private String nombre_estudiante;
    public Comentario() {
    }
    public Comentario(int id_comentario, String comentario, int id_publicacion, int id_estudiante,
            String fecha_comentario) {
        this.id_comentario = id_comentario;
        this.comentario = comentario;
        this.id_publicacion = id_publicacion;
        this.id_estudiante = id_estudiante;
        this.fecha_comentario = fecha_comentario;
    }
    public Comentario(int id_comentario, String comentario, int id_publicacion, int id_estudiante,
            String fecha_comentario, String nombre_estudiante) {
        this.id_comentario = id_comentario;
        this.comentario = comentario;
        this.id_publicacion = id_publicacion;
        this.id_estudiante = id_estudiante;
        this.fecha_comentario = fecha_comentario;
        this.nombre_estudiante = nombre_estudiante;
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
    public int getId_publicacion() {
        return id_publicacion;
    }
    public void setId_publicacion(int id_publicacion) {
        this.id_publicacion = id_publicacion;
    }
    public int getId_estudiante() {
        return id_estudiante;
    }
    public void setId_estudiante(int id_estudiante) {
        this.id_estudiante = id_estudiante;
    }
    public String getFecha_comentario() {
        return fecha_comentario;
    }
    public void setFecha_comentario(String fecha_comentario) {
        this.fecha_comentario = fecha_comentario;
    }
    public String getNombre_estudiante() {
        return nombre_estudiante;
    }
    public void setNombre_estudiante(String nombre_estudiante) {
        this.nombre_estudiante = nombre_estudiante;
    }
}
