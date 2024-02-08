package backend.proyecto1.Models;

public class Solicitud {
    
    private int id_solicitud;
    private String archivo;
    private String usuario;
    private String correo;
    private String titulo;
    private int id_biologo;


    public Solicitud(String archivo, String usuario, String correo, String titulo, int id_biologo) {
        this.archivo = archivo;
        this.usuario = usuario;
        this.correo = correo;
        this.titulo = titulo;
        this.id_biologo = id_biologo;
    }


    public Solicitud(int id_solicitud, String archivo, String usuario, String correo, String titulo, int id_biologo) {
        this.id_solicitud = id_solicitud;
        this.archivo = archivo;
        this.usuario = usuario;
        this.correo = correo;
        this.titulo = titulo;
        this.id_biologo = id_biologo;
    }




    public int getId_solicitud() {
        return id_solicitud;
    }




    public void setId_solicitud(int id_solicitud) {
        this.id_solicitud = id_solicitud;
    }




    public String getArchivo() {
        return archivo;
    }




    public void setArchivo(String archivo) {
        this.archivo = archivo;
    }




    public String getUsuario() {
        return usuario;
    }




    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }




    public String getCorreo() {
        return correo;
    }




    public void setCorreo(String correo) {
        this.correo = correo;
    }




    public String getTitulo() {
        return titulo;
    }




    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }




    public int getId_biologo() {
        return id_biologo;
    }




    public void setId_biologo(int id_biologo) {
        this.id_biologo = id_biologo;
    }




    public Solicitud() {
    }

}
