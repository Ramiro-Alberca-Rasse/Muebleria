package PPyL.Muebleria.model;


import PPyL.Muebleria.dto.MuebleDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "mueble")
public class Mueble {
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "tipo_madera")
    private String tipoMadera;
    
    private String tipo;

    private String fabricante;

    private double precio;

    private int stock;
    
        // Constructor
    public Mueble(String nombre, String tipoMadera, String fabricante, double precio, int stock, String tipo) {
        this.nombre = nombre;
        this.tipoMadera = tipoMadera;
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
    
        public String getTipoMadera() {
            return tipoMadera;
        }

        public String getTipo() {
            return tipo;
        }
    
        public String getFabricante() {
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
    
        public void setTipoMadera(String tipoMadera) {
            this.tipoMadera = tipoMadera;
        }

        public void setTipo(String tipo) {
            this.tipo = this.tipo;
        }
    
        public void setFabricante(String fabricante) {
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
            this.tipoMadera = dto.getTipoMadera();
            this.fabricante = dto.getFabricante();
            this.precio = dto.getPrecio();
        }
    }