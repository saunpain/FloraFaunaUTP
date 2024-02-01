package backend.proyecto1.Models;

public class Publicaciones {
    
    private int id_publicacion;
    private String titulo;
    private String lugar;
    private String fecha_estudiante;
    private int id_flora;
    private int id_fauna;
    private int id_estudiante;
    
    public Publicaciones (int id_publicacion, String titulo, String lugar,int id_flora){
        this.id_publicacion = id_publicacion;
        this.titulo = titulo;
        this.lugar = lugar;
        this.id_flora = id_flora;
    }

    public Publicaciones(int id_publicacion, String titulo, String lugar, String fecha_estudiante, int id_flora, int id_fauna, int id_estudiante) {
        this.id_publicacion = id_publicacion;
        this.titulo = titulo;
        this.lugar = lugar;
        this.fecha_estudiante = fecha_estudiante;
        this.id_flora = id_flora;
        this.id_fauna = id_fauna;
        this.id_estudiante = id_estudiante;
    }

    public int getId_publicacion() {
        return id_publicacion;
    }

    public void setId_publicacion(int id_publicacion) {
        this.id_publicacion = id_publicacion;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getLugar() {
        return lugar;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }

    public String getfecha_estudiante() {
        return fecha_estudiante;
    }

    public void setfecha_estudiante(String fecha_estudiante) {
        this.fecha_estudiante = fecha_estudiante;
    }

    public int getId_flora() {
        return id_flora;
    }

    public void setId_flora(int id_flora) {
        this.id_flora = id_flora;
    }

    public int getId_fauna() {
        return id_fauna;
    }

    public void setId_fauna(int id_fauna) {
        this.id_fauna = id_fauna;
    }

    public int getId_estudiante() {
        return id_estudiante;
    }

    public void setId_estudiante(int id_estudiante) {
        this.id_estudiante = id_estudiante;
    }

    public Publicaciones() {
    }

}
