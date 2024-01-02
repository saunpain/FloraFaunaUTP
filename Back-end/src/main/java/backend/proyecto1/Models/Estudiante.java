package backend.proyecto1.Models;

public class Estudiante {
    
    private int id_estudiante;
    private String nombre_estudiante;
    private String correo_estudiante;
    private String contraseña_estudiante;
    private String perfil_estudiante;

    public Estudiante(){
    }

    public Estudiante(
        int id_estudiante, String nombre_estudiante, String correo_estudiante,
        String contraseña_estudiante, String perfil_estudiante
    ){
        this.id_estudiante = id_estudiante;
        this.nombre_estudiante = nombre_estudiante;
        this.correo_estudiante = correo_estudiante;
        this.contraseña_estudiante = contraseña_estudiante;
        this.perfil_estudiante = perfil_estudiante;
    }

    public int getId_estudiante() {
        return id_estudiante;
    }

    public void setId_estudiante(int id_estudiante) {
        this.id_estudiante = id_estudiante;
    }

    public String getNombre_estudiante() {
        return nombre_estudiante;
    }

    public void setNombre_estudiante(String nombre_estudiante) {
        this.nombre_estudiante = nombre_estudiante;
    }

    public String getCorreo_estudiante() {
        return correo_estudiante;
    }

    public void setCorreo_estudiante(String correo_estudiante) {
        this.correo_estudiante = correo_estudiante;
    }

    public String getContraseña_estudiante() {
        return contraseña_estudiante;
    }

    public void setContraseña_estudiante(String contraseña_estudiante) {
        this.contraseña_estudiante = contraseña_estudiante;
    }

    public String getPerfil_estudiante() {
        return perfil_estudiante;
    }

    public void setPerfil_estudiante(String perfil_estudiante) {
        this.perfil_estudiante = perfil_estudiante;
    }
}
