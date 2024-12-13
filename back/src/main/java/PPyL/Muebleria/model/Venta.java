package PPyL.Muebleria.model;

import java.util.Date;
import java.util.List;

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

    @ManyToOne(cascade = CascadeType.ALL)
    private Cliente cliente;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL)
    private List<VentaMueble> ventas;

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
}
