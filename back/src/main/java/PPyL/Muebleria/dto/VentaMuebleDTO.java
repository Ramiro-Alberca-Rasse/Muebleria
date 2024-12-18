package PPyL.Muebleria.dto;

import PPyL.Muebleria.model.VentaMueble;

public class VentaMuebleDTO {
    private Long id;
    private Long idMueble;
    private String nombreMueble;
    private Long idVenta;
    private int cantidad;
    private double subTotal;

    public VentaMuebleDTO() {
    }

    public VentaMuebleDTO(VentaMueble ventaMueble) {
        this.id = ventaMueble.getId();
        this.idMueble = ventaMueble.getMueble().getId();
        this.idVenta = ventaMueble.getVenta().getId();
        this.cantidad = ventaMueble.getCantidad();
        this.subTotal = ventaMueble.getSubTotal();
        this.nombreMueble = ventaMueble.getMueble().getNombre();
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdMueble() {
        return idMueble;
    }

    public void setIdMueble(Long idMueble) {
        this.idMueble = idMueble;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(double subTotal) {
        this.subTotal = subTotal;
    }

    public Long getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(Long idVenta) {
        this.idVenta = idVenta;
    }

    public String getNombreMueble() {
        return nombreMueble;
    }

    public void setNombreMueble(String nombreMueble) {
        this.nombreMueble = nombreMueble;
    }
}
