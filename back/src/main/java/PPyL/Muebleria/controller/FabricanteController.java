
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

import PPyL.Muebleria.model.Fabricante;

@RestController
@RequestMapping("/api/fabricantes")
public class FabricanteController {
    private static List<Fabricante> fabricantes = new ArrayList<>();
    private static FabricanteController instance;

    // Constructor privado para evitar instanciación
    private FabricanteController() {}

    // Método para obtener la única instancia de FabricanteController
    public static FabricanteController getInstance() {
        if (instance == null) {
            instance = new FabricanteController();
        }
        return instance;
    }

    // Método para agregar un nuevo fabricante
    @PostMapping("/registrar")
    public ResponseEntity<String> addFabricante(@RequestBody String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return new ResponseEntity<>("Nombre no puede estar vacío", HttpStatus.BAD_REQUEST);
        }
        for (Fabricante fabricante : fabricantes) {
            if (fabricante.getNombre().equalsIgnoreCase(nombre)) {
                return new ResponseEntity<>("El fabricante ya existe", HttpStatus.CONFLICT);
            }
        }
        Fabricante fabricante = new Fabricante(nombre);
        fabricantes.add(fabricante);
        return new ResponseEntity<>("Fabricante agregado exitosamente", HttpStatus.CREATED);
    }

    @GetMapping
    public List<Fabricante> getFabricantes() {
        return fabricantes;
    }

    @GetMapping("/{nombre}")
    public Fabricante getFabricante(@PathVariable String nombre) {
        for (Fabricante fabricante : fabricantes) {
            if (fabricante.getNombre().equals(nombre)) {
                return fabricante;
            }
        }
        return null;
    }
}