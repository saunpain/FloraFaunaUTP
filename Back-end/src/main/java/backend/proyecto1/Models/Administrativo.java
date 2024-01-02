package backend.proyecto1.Models;

public class Administrativo {
    
    private int id_admin;
    private String nombre_admin;
    private String correo_admin;
    private String contraseña_admin;
    private String perfil_admin;

    public Administrativo(){
    }

    public Administrativo(
        int id_admin, String nombre_admin, String correo_admin,
        String contraseña_admin, String perfil_admin
    ){
        this.id_admin = id_admin;
        this.nombre_admin = nombre_admin;
        this.correo_admin = correo_admin;
        this.contraseña_admin = contraseña_admin;
        this.perfil_admin = perfil_admin;
    }

    public int getId_admin() {
        return id_admin;
    }

    public void setId_admin(int id_admin) {
        this.id_admin = id_admin;
    }

    public String getNombre_admin() {
        return nombre_admin;
    }

    public void setNombre_admin(String nombre_admin) {
        this.nombre_admin = nombre_admin;
    }

    public String getCorreo_admin() {
        return correo_admin;
    }

    public void setCorreo_admin(String correo_admin) {
        this.correo_admin = correo_admin;
    }

    public String getContraseña_admin() {
        return contraseña_admin;
    }

    public void setContraseña_admin(String contraseña_admin) {
        this.contraseña_admin = contraseña_admin;
    }

    public String getPerfil_admin() {
        return perfil_admin;
    }

    public void setPerfil_admin(String perfil_admin) {
        this.perfil_admin = perfil_admin;
    }

    
}
