package PPyL.Muebleria.dto;

import PPyL.Muebleria.model.CambioStock;

public class CambioStockDTO {

    private Long id;
    private String nombreMueble;
    private String tipoCambio;
    private int nuevoStock;
    private int cantidad;
    private boolean primerCambio = false;
    private Long ventaMuebleId;

    public CambioStockDTO() {
    }

    public CambioStockDTO(CambioStock cambioStock) {
        this.id = cambioStock.getId();
        this.nombreMueble = cambioStock.getMueble().getNombre();
        this.setTipoCambio(cambioStock.getTipoCambio());
        this.nuevoStock = cambioStock.getNuevoStock();
        this.cantidad = cambioStock.getCantidad();
        this.primerCambio = cambioStock.isPrimerCambio();
        this.ventaMuebleId = cambioStock.getVentaMueble() != null ? cambioStock.getVentaMueble().getId() : null;
    }

    public CambioStockDTO(MuebleDTO muebleDTO, String tipoCambio, int cantidad, Long ventaMuebleId) {
        this.nombreMueble = muebleDTO.getNombre();
        this.setTipoCambio(tipoCambio);
        this.nuevoStock = muebleDTO.getStock();
        this.cantidad = cantidad;
        this.ventaMuebleId = ventaMuebleId;
    }

    public CambioStockDTO(MuebleDTO muebleDTO, String tipoCambio, int cantidad) {
        this.nombreMueble = muebleDTO.getNombre();
        this.setTipoCambio(tipoCambio);
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
        if ("Salida".equals(tipoCambio)) {
            if (this.ventaMuebleId != null) {
                throw new IllegalArgumentException("ventaMueble debe ser nulo cuando tipoCambio es 'Salida'");
            }
        } else if ("Entrada".equals(tipoCambio)) {
            if (this.ventaMuebleId != null) {
                throw new IllegalArgumentException("ventaMueble debe ser nulo cuando tipoCambio es 'Entrada'");
            }
        } else if ("Venta".equals(tipoCambio)) {
            if (this.ventaMuebleId == null) {
                throw new IllegalArgumentException("ventaMueble no puede ser nulo cuando tipoCambio es 'Venta'");
            }
        } else {
            throw new IllegalArgumentException("tipoCambio solo puede ser 'Salida' o 'Entrada' o 'Venta");
        }
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

    public Long getVentaMuebleId() {
        return ventaMuebleId;
    }

    public void setVentaMuebleId(Long ventaMuebleId) {
        this.ventaMuebleId = ventaMuebleId;
    }
    



}
