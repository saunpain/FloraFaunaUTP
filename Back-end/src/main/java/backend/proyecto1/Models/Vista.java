package backend.proyecto1.Models;

public class Vista {
    private String nombre_estudiante;
    private String fecha_estudiante;
    private String lugar;
    private String titulo;
    private String foto_fauna;
    private String nombre_cientifico_fauna;
    private String nombre_animal;

    public Vista() {
    }

    public Vista(String nombre_estudiante, String fecha_estudiante, String lugar, String titulo, String foto_fauna,
            String nombre_cientifico_fauna, String nombre_animal) {
        this.nombre_estudiante = nombre_estudiante;
        this.fecha_estudiante = fecha_estudiante;
        this.lugar = lugar;
        this.titulo = titulo;
        this.foto_fauna = foto_fauna;
        this.nombre_cientifico_fauna = nombre_cientifico_fauna;
        this.nombre_animal = nombre_animal;
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


}
