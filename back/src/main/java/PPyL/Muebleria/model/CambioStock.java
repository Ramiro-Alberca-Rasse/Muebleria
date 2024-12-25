package PPyL.Muebleria.model;

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

    // Constructor
    public CambioStock(Mueble mueble, int cantidad, String tipoCambio, int nuevoStock, boolean primerCambio) {
        this.mueble = mueble;
        this.cantidad = cantidad;
        this.tipoCambio = tipoCambio;
        this.NuevoStock = nuevoStock;
        this.primerCambio = primerCambio;
    }
    

    // Constructor with primerCambio defaulting to false
    public CambioStock(Mueble mueble, int cantidad, String tipoCambio, int nuevoStock) {
        this(mueble, cantidad, tipoCambio, nuevoStock, false);
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
}
