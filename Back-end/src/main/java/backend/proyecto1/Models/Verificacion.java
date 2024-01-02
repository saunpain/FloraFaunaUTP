package backend.proyecto1.Models;

public class Verificacion {
    
    private int id_admin;
    private int id_solicitud;
    private int id_biologo;

    public Verificacion(){
    }

    public Verificacion(int id_admin, int id_soliciutd, int id_biologo){
        this.id_admin = id_admin;
        this.id_solicitud = id_soliciutd;
        this.id_biologo = id_biologo;
    }

    public int getId_admin() {
        return id_admin;
    }

    public void setId_admin(int id_admin) {
        this.id_admin = id_admin;
    }

    public int getId_solicitud() {
        return id_solicitud;
    }

    public void setId_solicitud(int id_solicitud) {
        this.id_solicitud = id_solicitud;
    }

    public int getId_biologo() {
        return id_biologo;
    }

    public void setId_biologo(int id_biologo) {
        this.id_biologo = id_biologo;
    }
}
