package backend.proyecto1.Models;

public class Solicitud {
    
    private int id_solicitud;
    private String archivo;
    private int id_biologo;
    private String titulo;
    
    public Solicitud(int id_solicitud, String archivo, int id_biologo, String titulo) {
        this.id_solicitud = id_solicitud;
        this.archivo = archivo;
        this.id_biologo = id_biologo;
        this.titulo = titulo;
    }

    public Solicitud() {
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
    public int getId_biologo() {
        return id_biologo;
    }
    public void setId_biologo(int id_biologo) {
        this.id_biologo = id_biologo;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
}
