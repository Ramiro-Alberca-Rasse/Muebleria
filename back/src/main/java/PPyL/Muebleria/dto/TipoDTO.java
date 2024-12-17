package PPyL.Muebleria.dto;

public class TipoDTO {
    private Long id;
    private String nombre;

    public TipoDTO(Long id, String nombre) {
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
