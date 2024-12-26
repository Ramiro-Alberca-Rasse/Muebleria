package PPyL.Muebleria.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "venta_mueble")
public class VentaMueble {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mueble_id", unique = false)
    private Mueble mueble;

    private int cantidad;

    private double subTotal;

    @ManyToOne
    @JoinColumn(name = "venta_id")
    @JsonBackReference(value = "venta-mueble") // Nombre único que coincide con Venta
    @Nullable
    private Venta venta;

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Mueble getMueble() {
        return mueble;
    }

    public void setMueble(Mueble mueble) {
        this.mueble = mueble;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(double subTotal) {
        this.subTotal = subTotal;
    }

    @Override
    public String toString() {
        return "VentaMueble{" +
                "id=" + id +
                ", mueble=" + mueble +
                ", cantidad=" + cantidad +
                ", subTotal=" + subTotal +
                '}';
    }
    
}
