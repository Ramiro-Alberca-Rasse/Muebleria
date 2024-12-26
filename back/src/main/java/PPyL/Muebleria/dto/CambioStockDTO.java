package PPyL.Muebleria.dto;

import PPyL.Muebleria.model.CambioStock;

public class CambioStockDTO {

    private Long id;
    private String nombreMueble;
    private String tipoCambio;
    private int nuevoStock;
    private int cantidad;
    private boolean primerCambio = false;

    public CambioStockDTO() {
    }

    public CambioStockDTO(CambioStock cambioStock) {
        this.id = cambioStock.getId();
        this.nombreMueble = cambioStock.getMueble().getNombre();
        this.tipoCambio = cambioStock.getTipoCambio();
        this.nuevoStock = cambioStock.getNuevoStock();
        this.cantidad = cambioStock.getCantidad();
    }

    public CambioStockDTO(MuebleDTO muebleDTO, String tipoCambio, int cantidad) {
        this.nombreMueble = muebleDTO.getNombre();
        this.tipoCambio = tipoCambio;
        this.nuevoStock = muebleDTO.getStock();
        this.cantidad = cantidad;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreMueble() {
        return nombreMueble;
    }

    public void setNombreMueble(String nombreMueble) {
        this.nombreMueble = nombreMueble;
    }

    public String getTipoCambio() {
        return tipoCambio;
    }

    public void setTipoCambio(String tipoCambio) {
        this.tipoCambio = tipoCambio;
    }

    public int getNuevoStock() {
        return nuevoStock;
    }

    public void setNuevoStock(int nuevoStock) {
        this.nuevoStock = nuevoStock;
    }
    
    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public boolean isPrimerCambio() {
        return primerCambio;
    }

    public void setPrimerCambio(boolean primerCambio) {
        this.primerCambio = primerCambio;
    }
    


}
