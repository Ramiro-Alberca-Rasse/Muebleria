package PPyL.Muebleria.dto;

import java.util.Date;
import java.util.List;

public class VentaDTO {
    private Long id;
    private Long idCliente;
    private Date fecha;
    private double precioTotal;
    private List<VentaMuebleDTO> ventasMuebles;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public double getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(double precioTotal) {
        this.precioTotal = precioTotal;
    }

    public List<VentaMuebleDTO> getVentasMuebles() {
        return ventasMuebles;
    }

    public void setVentasMuebles(List<VentaMuebleDTO> ventasMuebles) {
        this.ventasMuebles = ventasMuebles;
    }
}
