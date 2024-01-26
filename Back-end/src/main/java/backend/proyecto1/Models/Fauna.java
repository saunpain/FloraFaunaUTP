package backend.proyecto1.Models;

public class Fauna {
    
    private int id_fauna;
    private String nombre_animal;
    private String foto_fauna;
    private String nombre_cientifico_fauna;
    private String descripcion_cientifica_fauna;
    private String categoria_fauna;


    public Fauna(int id_fauna, String nombre_animal, String foto_fauna, String nombre_cientifico_fauna,
            String descripcion_cientifica_fauna, String categoria_fauna) {
        this.id_fauna = id_fauna;
        this.nombre_animal = nombre_animal;
        this.foto_fauna = foto_fauna;
        this.nombre_cientifico_fauna = nombre_cientifico_fauna;
        this.descripcion_cientifica_fauna = descripcion_cientifica_fauna;
        this.categoria_fauna = categoria_fauna;
    }

    public Fauna(){
    }

    public int getId_fauna() {
        return id_fauna;
    }

    public void setId_fauna(int id_fauna) {
        this.id_fauna = id_fauna;
    }



    public String getNombre_animal() {
        return nombre_animal;
    }



    public void setNombre_animal(String nombre_animal) {
        this.nombre_animal = nombre_animal;
    }



    public String getNombre_cientifico_fauna() {
        return nombre_cientifico_fauna;
    }



    public void setNombre_cientifico_fauna(String nombre_cientifico_fauna) {
        this.nombre_cientifico_fauna = nombre_cientifico_fauna;
    }



    public String getDescripcion_cientifica_fauna() {
        return descripcion_cientifica_fauna;
    }



    public void setDescripcion_cientifica_fauna(String descripcion_cientifica_fauna) {
        this.descripcion_cientifica_fauna = descripcion_cientifica_fauna;
    }



    public String getCategoria_fauna() {
        return categoria_fauna;
    }



    public void setCategoria_fauna(String categoria_fauna) {
        this.categoria_fauna = categoria_fauna;
    }



    public String getFoto_fauna() {
        return foto_fauna;
    }



    public void setFoto_fauna(String foto_fauna) {
        this.foto_fauna = foto_fauna;
    }
}

