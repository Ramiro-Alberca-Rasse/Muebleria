package PPyL.Muebleria.dto;

import PPyL.Muebleria.model.Mueble;

public class MuebleDTO {
    private Long id;
    private String nombre;
    private Long tipoMaderaId;
    private Long fabricanteId;
    private Long tipoId;
    private double precio;
    private int stock;

    public MuebleDTO(Mueble mueble) {
        this.id = mueble.getId();
        this.nombre = mueble.getNombre();
        this.tipoMaderaId = mueble.getTipoMadera() != null ? mueble.getTipoMadera().getId() : null;
        this.fabricanteId = mueble.getFabricante() != null ? mueble.getFabricante().getId() : null;
        this.tipoId = mueble.getTipo() != null ? mueble.getTipo().getId() : null;
        this.precio = mueble.getPrecio();
        this.stock = mueble.getStock();
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