package PPyL.Muebleria.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PPyL.Muebleria.model.Tipo;

@RestController
@RequestMapping("/api/tipos")
public class TipoController {
    private static List<Tipo> tipos = new ArrayList<>();
    private static TipoController instance;

    // Constructor privado para evitar instanciación
    private TipoController() {}

    // Método para obtener la única instancia de TipoController
    public static TipoController getInstance() {
        if (instance == null) {
            instance = new TipoController();
        }
        return instance;
    }

    // Método para agregar un nuevo tipo
    @PostMapping("/registrar")
    public ResponseEntity<String> addTipo(@RequestBody String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return new ResponseEntity<>("Nombre no puede estar vacío", HttpStatus.BAD_REQUEST);
        }
        for (Tipo tipo : tipos) {
            if (tipo.getNombre().equalsIgnoreCase(nombre)) {
                return new ResponseEntity<>("El tipo ya existe", HttpStatus.CONFLICT);
            }
        }
        Tipo tipo = new Tipo(nombre);
        tipos.add(tipo);
        return new ResponseEntity<>("Tipo de madera agregado exitosamente", HttpStatus.CREATED);
    }

    @GetMapping
    public List<Tipo> getTipos() {
        return tipos;
    }

    @GetMapping("/{nombre}")
    public Tipo getTipo(@PathVariable String nombre) {
        for (Tipo tipo : tipos) {
            if (tipo.getNombre().equals(nombre)) {
                return tipo;
            }
        }
        return null;
    }

    
}