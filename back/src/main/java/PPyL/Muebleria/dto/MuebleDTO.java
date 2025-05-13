package PPyL.Muebleria.dto;

import java.util.ArrayList;
import java.util.List;

import PPyL.Muebleria.model.CambioStock;
import PPyL.Muebleria.model.Mueble;

public class MuebleDTO {
    private Long id;
    private String nombre;
    private Long tipoMaderaId;
    private Long fabricanteId;
    private Long tipoId;
    private String tipoMadera;
    private String fabricante;
    private String tipo;
    private double precio;
    private int stock;
    private List<CambioStockDTO> cambiosStock;

    public MuebleDTO(Mueble mueble) {
        this.id = mueble.getId();
        this.nombre = mueble.getNombre();
        this.tipoMaderaId = mueble.getTipoMadera() != null ? mueble.getTipoMadera().getId() : null;
        this.fabricanteId = mueble.getFabricante() != null ? mueble.getFabricante().getId() : null;
        this.tipoId = mueble.getTipo() != null ? mueble.getTipo().getId() : null;
        this.precio = mueble.getPrecio();
        this.stock = mueble.getStock();
        this.tipoMadera = mueble.getTipoMadera() != null ? mueble.getTipoMadera().getNombre() : null;
        this.fabricante = mueble.getFabricante() != null ? mueble.getFabricante().getNombre() : null;
        this.tipo = mueble.getTipo() != null ? mueble.getTipo().getNombre() : null;
        if (mueble.getCambiosStock() != null) {
            this.cambiosStock = new ArrayList<>();
            for (CambioStock cambioStock : mueble.getCambiosStock()) {
                this.cambiosStock.add(new CambioStockDTO(cambioStock));
            }
        } else {
            this.cambiosStock = new ArrayList<>();
        }
    }

    public MuebleDTO() {
    }


    public Mueble toEntity() {
        Mueble mueble = new Mueble();
        mueble.setNombre(this.nombre);
        // Las relaciones deben ser manejadas en el controlador o servicio
        mueble.setPrecio(this.precio);
        mueble.setStock(this.stock);
        return mueble;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getTipoMaderaId() {
        return tipoMaderaId;
    }

    public void setTipoMaderaId(Long tipoMaderaId) {
        this.tipoMaderaId = tipoMaderaId;
    }

    public Long getFabricanteId() {
        return fabricanteId;
    }

    public void setFabricanteId(Long fabricanteId) {
        this.fabricanteId = fabricanteId;
    }

    public Long getTipoId() {
        return tipoId;
    }

    public void setTipoId(Long tipoId) {
        this.tipoId = tipoId;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public List<CambioStockDTO> getCambiosStock() {
        return cambiosStock;
    }

    public void addCambioStock(CambioStockDTO cambioStock) {
        if (this.cambiosStock == null) {
            this.cambiosStock = new ArrayList<>();
        } else {
            this.cambiosStock.add(cambioStock); 
        }
    }

    public void removeCambioStock(CambioStockDTO cambioStock) {
        this.cambiosStock.remove(cambioStock);
    }

    public void setCambiosStock(List<CambioStockDTO> cambiosStock) {
        this.cambiosStock = cambiosStock;
    }

    public String getTipoMadera() {
        return tipoMadera;
    }

    public void setTipoMadera(String tipoMadera) {
        this.tipoMadera = tipoMadera;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }


    // toString

    @Override
    public String toString() {
        return "MuebleDTO{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", tipoMaderaId=" + tipoMaderaId +
                ", fabricanteId=" + fabricanteId +
                ", tipoId=" + tipoId +
                ", precio=" + precio +
                ", stock=" + stock +
                '}';
    }
}