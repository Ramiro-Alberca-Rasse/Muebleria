package PPyL.Muebleria.model;

import org.springframework.lang.Nullable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "CambioStock")
public class CambioStock {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "muebleId", nullable = false)
    private Mueble mueble;
    
    private int cantidad;
    private String tipoCambio;
    private int NuevoStock;
    private boolean primerCambio = false;

    @ManyToOne
    @JoinColumn(name = "ventaMuebleId", nullable = true)
    @Nullable
    private VentaMueble ventaMueble;

    // Constructor
    public CambioStock(Mueble mueble, int cantidad, String tipoCambio, int nuevoStock, boolean primerCambio, VentaMueble ventaMueble) {
        this.mueble = mueble;
        
        this.cantidad = cantidad;
        this.setTipoCambio(tipoCambio);
        this.NuevoStock = nuevoStock;
        this.primerCambio = primerCambio;
        this.ventaMueble = ventaMueble;
    }

    public CambioStock(Mueble mueble, int cantidad, String tipoCambio, int nuevoStock, boolean primerCambio) {
        this.mueble = mueble;
        this.cantidad = cantidad;
        this.setTipoCambio(tipoCambio);
        this.NuevoStock = nuevoStock;
        this.primerCambio = primerCambio;

    }
    

    // Constructor with primerCambio defaulting to false
    public CambioStock(Mueble mueble, int cantidad, String tipoCambio, int nuevoStock, VentaMueble ventaMueble) {
        this(mueble, cantidad, tipoCambio, nuevoStock, false, ventaMueble);
    }

    public CambioStock() {
    }

    // Getters y Setters
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

    public String getTipoCambio() {
        return tipoCambio;
    }

    public void setTipoCambio(String tipoCambio) {
        if ("Salida".equals(tipoCambio)) {
            if (this.ventaMueble != null) {
                throw new IllegalArgumentException("ventaMueble debe ser nulo cuando tipoCambio es 'Salida'");
            }
        } else if ("Entrada".equals(tipoCambio)) {
            if (this.ventaMueble != null) {
                throw new IllegalArgumentException("ventaMueble debe ser nulo cuando tipoCambio es 'Entrada'");
            }
        } else if ("Venta".equals(tipoCambio)) {
            if (this.ventaMueble == null) {
                throw new IllegalArgumentException("ventaMueble no puede ser nulo cuando tipoCambio es 'Venta'");
            }
        } else {
            throw new IllegalArgumentException("tipoCambio solo puede ser 'Salida' o 'Entrada' o 'Venta");
        }
        this.tipoCambio = tipoCambio;
    }

    public int getNuevoStock() {
        return NuevoStock;
    }

    public void setNuevoStock(int nuevoStock) {
        this.NuevoStock = nuevoStock;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isPrimerCambio() {
        return primerCambio;
    }

    public void setPrimerCambio(boolean primerCambio) {
        this.primerCambio = primerCambio;
    }

    public VentaMueble getVentaMueble() {
        return ventaMueble;
    }

    public void setVentaMueble(VentaMueble ventaMueble) {
        this.ventaMueble = ventaMueble;
    }

}
