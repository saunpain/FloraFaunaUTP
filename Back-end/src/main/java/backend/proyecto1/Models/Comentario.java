package backend.proyecto1.Models;

public class Comentario {
    
    private String comentario;
    private int id_publicacion;

    public Comentario(){
    }

    public Comentario(String comentario, int id_publicacion){
        this.comentario = comentario;
        this.id_publicacion = id_publicacion;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public int getId_publicacion() {
        return id_publicacion;
    }

    public void setId_publicacion(int id_publicacion) {
        this.id_publicacion = id_publicacion;
    }
}
