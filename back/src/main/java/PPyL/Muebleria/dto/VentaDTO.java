package PPyL.Muebleria.dto;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import PPyL.Muebleria.model.Venta;

public class VentaDTO {
    private Long id;
    private Long idCliente;
    private String nombreCliente;
    private String apellidoCliente;
    private Date fecha;
    private double precioTotal;
    private List<VentaMuebleDTO> ventasMuebles;
    private String metodoPago;

    public VentaDTO() {
    }

    public VentaDTO(Venta venta) {
        this.id = venta.getId();
        this.idCliente = venta.getCliente().getId();
        this.nombreCliente = venta.getCliente().getNombre();
        this.apellidoCliente = venta.getCliente().getApellido();
        this.fecha = venta.getFecha();
        this.precioTotal = venta.getPrecioTotal();
        this.ventasMuebles = venta.getVentas().stream()
                .map(ventaMueble -> new VentaMuebleDTO(ventaMueble))
                .collect(Collectors.toList());
        this.metodoPago = venta.getMetodoPago();
    }
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

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getApellidoCliente() {
        return apellidoCliente;
    }

    public void setApellidoCliente(String apellidoCliente) {
        this.apellidoCliente = apellidoCliente;
    }


    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }
}
