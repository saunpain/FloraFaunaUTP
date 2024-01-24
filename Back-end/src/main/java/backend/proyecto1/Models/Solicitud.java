package backend.proyecto1.Models;

public class Solicitud {
    
    private int id_solicitud;
    private String formulario;
    private String estado;

    public Solicitud(){
    }

    public Solicitud(int id_solicitud, String formulario, String estado){
        this.id_solicitud = id_solicitud;
        this.formulario = formulario;
        this.estado = estado;
    }

    public int getId_solicitud() {
        return id_solicitud;
    }

    public void setId_solicitud(int id_solicitud) {
        this.id_solicitud = id_solicitud;
    }

    public String getFormulario() {
        return formulario;
    }

    public void setFormulario(String formulario) {
        this.formulario = formulario;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
