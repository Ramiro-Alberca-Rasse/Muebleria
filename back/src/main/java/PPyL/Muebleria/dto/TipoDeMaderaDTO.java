package PPyL.Muebleria.dto;

public class TipoDeMaderaDTO {
    private Long id;
    private String nombre;

    public TipoDeMaderaDTO(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }
}
