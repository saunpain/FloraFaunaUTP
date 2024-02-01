package backend.proyecto1.Models;

public class Biologo {
    private int id_biologo;
    private String nombre_biologo;
    private String correo_biologo;
    private String contraseña_biologo;
    private String perfil_biologo;
    private String estado;

    public Biologo(){
    }

    public Biologo(
        int id_biologo, String nombre_biologo, String correo_biologo,
        String contraseña_biologo, String perfil_biologo, String estado
    ){
        this.id_biologo = id_biologo;
        this.nombre_biologo = nombre_biologo;
        this.correo_biologo = correo_biologo;
        this.contraseña_biologo = contraseña_biologo;
        this.perfil_biologo = perfil_biologo;
        this.estado = estado;
    }

    public int getId_biologo() {
        return id_biologo;
    }

    public void setId_biologo(int id_biologo) {
        this.id_biologo = id_biologo;
    }

    public String getNombre_biologo() {
        return nombre_biologo;
    }

    public void setNombre_biologo(String nombre_biologo) {
        this.nombre_biologo = nombre_biologo;
    }

    public String getCorreo_biologo() {
        return correo_biologo;
    }

    public void setCorreo_biologo(String correo_biologo) {
        this.correo_biologo = correo_biologo;
    }

    public String getContraseña_biologo() {
        return contraseña_biologo;
    }

    public void setContraseña_biologo(String contraseña_biologo) {
        this.contraseña_biologo = contraseña_biologo;
    }

    public String getPerfil_biologo() {
        return perfil_biologo;
    }

    public void setPerfil_biologo(String perfil_biologo) {
        this.perfil_biologo = perfil_biologo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    
}
