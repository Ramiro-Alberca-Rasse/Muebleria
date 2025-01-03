package PPyL.Muebleria.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity 
@Table(name = "venta")
public class Venta {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date fecha;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonBackReference(value = "cliente-venta") // Nombre único que coincide con Cliente
    private Cliente cliente;


    private double precioTotal;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "venta-mueble") // Otro nombre único
    private List<VentaMueble> ventas;


    private String metodoPago;

    public Venta() {
        ventas = new ArrayList<>();
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<VentaMueble> getVentas() {
        return ventas;
    }

    public void setVentas(List<VentaMueble> ventas) {
        this.ventas = ventas;
    }

    public void addVenta(VentaMueble ventaMueble) {
        this.ventas.add(ventaMueble);
    }

    public double getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(double precioTotal) {
        this.precioTotal = precioTotal;
    }

    public VentaMueble getVenta(int i) {
        return ventas.get(i);
    }

    public void setVenta(int i, VentaMueble venta) {
        ventas.set(i, venta);
    }

    public void removeVenta(int i) {
        ventas.remove(i);
    }

    public void removeVenta(VentaMueble venta) {
        ventas.remove(venta);
    }

    public void clearVentas() {
        ventas.clear();
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }
    
    @Override
    public String toString() {
        return "Venta{" +
                "id=" + id +
                ", fecha=" + fecha +
                ", cliente=" + cliente +
                ", precioTotal=" + precioTotal +
                ", ventas=" + ventas +
                '}';
    }


}
