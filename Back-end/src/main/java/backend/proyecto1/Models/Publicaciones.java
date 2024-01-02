package backend.proyecto1.Models;

public class Publicaciones {
    
    private int id_publicaciones;
    private String titulo;
    private String lugar;
    private String fecha_publicacion;
    private int id_flora;
    private int id_fauna;

    public Publicaciones(){
    }

    public Publicaciones(
        int id_publicaciones, String titulo, String lugar,
        String fecha_publicacion, int id_flora, int id_fauna
    ){
        this.id_publicaciones = id_publicaciones;
        this.titulo = titulo;
        this.lugar = lugar;
        this.fecha_publicacion = fecha_publicacion;
        this.id_flora = id_flora;
        this.id_fauna = id_fauna;
    }

    public int getId_publicaciones() {
        return id_publicaciones;
    }

    public void setId_publicaciones(int id_publicaciones) {
        this.id_publicaciones = id_publicaciones;
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

    public String getFecha_publicacion() {
        return fecha_publicacion;
    }

    public void setFecha_publicacion(String fecha_publicacion) {
        this.fecha_publicacion = fecha_publicacion;
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
}
