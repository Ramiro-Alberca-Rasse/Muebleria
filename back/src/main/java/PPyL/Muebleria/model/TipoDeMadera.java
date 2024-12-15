package PPyL.Muebleria.model;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tipoDeMadera")
public class TipoDeMadera {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @OneToMany(mappedBy = "tipoDeMadera", cascade = CascadeType.ALL)
    private List<Mueble> muebles;

    public TipoDeMadera() {
    }

    public TipoDeMadera(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }

    public List<Mueble> getMuebles() {
        return muebles;
    }

    public Long getId() {
        return id;
    }
}
