package PPyL.Muebleria.model;


import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    @JsonBackReference(value = "mueble-tipoDeMadera")
    private TipoDeMadera tipoDeMadera;
    
    
    @ManyToOne
    @JoinColumn(name = "tipo_id")
    @JsonBackReference(value = "mueble-tipo")
    private Tipo tipo;

    
    @ManyToOne
    @JoinColumn(name = "fabricante_id")
    @JsonBackReference(value = "mueble-fabricante")
    private Fabricante fabricante;

    private double precio;

    private int stock;

    @OneToMany
    private Set<Venta> ventas;

    
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

        public void addVenta(Venta venta) {
            this.ventas.add(venta);
        }



        @Override
        public String toString() {
            return "Mueble{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", precio=" + precio +
                ", stock=" + stock +
                ", fabricante=" + (fabricante != null ? fabricante.getNombre() : "null") +
                ", tipoMadera=" + (tipoDeMadera != null ? tipoDeMadera.getNombre() : "null") +
                ", tipo=" + (tipo != null ? tipo.getNombre() : "null") +
                '}';
        }
    }