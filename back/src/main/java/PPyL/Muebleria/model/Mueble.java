package PPyL.Muebleria.model;


import PPyL.Muebleria.dto.MuebleDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "mueble")
public class Mueble {
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    
    @ManyToOne
    @JoinColumn(name = "tipoDeMadera_id")
    private TipoDeMadera tipoDeMadera;
    
    
    @ManyToOne
    @JoinColumn(name = "tipo_id")
    private Tipo tipo;

    
    @ManyToOne
    @JoinColumn(name = "fabricante_id")
    private Fabricante fabricante;

    private double precio;

    private int stock;
    
        // Constructor
    public Mueble(String nombre, TipoDeMadera tipoMadera, Fabricante fabricante, double precio, int stock, Tipo tipo) {
        this.nombre = nombre;
        this.tipoDeMadera = tipoMadera;
        this.fabricante = fabricante;
        this.precio = precio;
        this.stock = stock;
        this.tipo = tipo;
    }

    public Mueble() {}
    
        // Getters


        public Long getId() {
            return id;
        }


        public String getNombre() {
            return nombre;
        }
    
        public TipoDeMadera getTipoMadera() {
            return tipoDeMadera;
        }

        public Tipo getTipo() {
            return tipo;
        }
    
        public Fabricante getFabricante() {
            return fabricante;
        }
    
        public double getPrecio() {
            return precio;
        }
    
        public int getStock() {
            return stock;
        }
    
        // Setters

        public void setId(Long id) {
            this.id = id;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }
    
        public void setTipoMadera(TipoDeMadera tipoMadera) {
            this.tipoDeMadera = tipoMadera;
        }

        public void setTipo(Tipo tipo) {
            this.tipo = tipo;
        }
    
        public void setFabricante(Fabricante fabricante) {
            this.fabricante = fabricante;
        }
    
        public void setPrecio(double precio) {
            this.precio = precio;
        }
    
        public void setStock(int stock) {
            this.stock = stock;
        }
    
        // Método para actualizar datos desde un DTO
        public void updateFromDTO(MuebleDTO dto) {
            this.nombre = dto.getNombre();
            this.tipoDeMadera = dto.getTipoMadera();
            this.fabricante = dto.getFabricante();
            this.precio = dto.getPrecio();
        }
    }