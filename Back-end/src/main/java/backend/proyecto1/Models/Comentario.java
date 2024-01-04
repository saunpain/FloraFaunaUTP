package backend.proyecto1.Models;

public class Comentario {
    
    private int id_comentario;
    private String comentario;
    private int id_publicacion;

    public Comentario(){
    }

    public Comentario(int id_comentario, String comentario, int id_publicacion){
        this.id_comentario = id_comentario;
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

    public int getId_comentario() {
        return id_comentario;
    }

    public void setId_comentario(int id_comentario) {
        this.id_comentario = id_comentario;
    }
}
