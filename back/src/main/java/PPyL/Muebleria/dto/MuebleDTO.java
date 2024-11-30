package PPyL.Muebleria.dto;

import PPyL.Muebleria.model.Mueble;
import lombok.Data;

@Data
public class MuebleDTO {
    private Long id;
    private String nombre;
    private String tipoMadera;
    private String fabricante;
    private double precio;
    private int stock;

    public MuebleDTO(Mueble mueble) {
        this.id = mueble.getId();
        this.nombre = mueble.getNombre();
        this.tipoMadera = mueble.getTipoMadera();
        this.fabricante = mueble.getFabricante();
        this.precio = mueble.getPrecio();
        this.stock = mueble.getStock();
    }

    public MuebleDTO() {
    }

    public Mueble toEntity() {
        Mueble mueble = new Mueble();
        mueble.setNombre(this.nombre);
        mueble.setTipoMadera(this.tipoMadera);
        mueble.setFabricante(this.fabricante);
        mueble.setPrecio(this.precio);
        mueble.setStock(this.stock);
        return mueble;
    }
}
