package PPyL.Muebleria.dto;

import PPyL.Muebleria.model.Fabricante;
import PPyL.Muebleria.model.Mueble;
import PPyL.Muebleria.model.TipoDeMadera;
import PPyL.Muebleria.model.Tipo;
import lombok.Data;

@Data
public class MuebleDTO {
    private Long id;
    private String nombre;
    private TipoDeMadera tipoMadera;
    private Fabricante fabricante;
    private Tipo tipo;
    private double precio;
    private int stock;

    public MuebleDTO(Mueble mueble) {
        this.id = mueble.getId();
        this.nombre = mueble.getNombre();
        this.tipoMadera = mueble.getTipoMadera();
        this.fabricante = mueble.getFabricante();
        this.tipo = mueble.getTipo();
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
        mueble.setTipo(this.tipo);
        mueble.setPrecio(this.precio);
        mueble.setStock(this.stock);
        return mueble;
    }
}
