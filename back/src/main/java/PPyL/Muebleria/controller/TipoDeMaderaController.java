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

import PPyL.Muebleria.model.TipoDeMadera;

@RestController
@RequestMapping("/api/tiposDeMadera")
public class TipoDeMaderaController {
    private static List<TipoDeMadera> tiposDeMadera = new ArrayList<>();
    private static TipoDeMaderaController instance;

    // Constructor privado para evitar instanciación
    private TipoDeMaderaController() {}

    // Método para obtener la única instancia de TipoDeMaderaController
    public static TipoDeMaderaController getInstance() {
        if (instance == null) {
            instance = new TipoDeMaderaController();
        }
        return instance;
    }

    // Método para agregar un nuevo tipo de madera
    @PostMapping("/registrar")
    public ResponseEntity<String> addTipoDeMadera(@RequestBody String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return new ResponseEntity<>("Nombre no puede estar vacío", HttpStatus.BAD_REQUEST);
        }
        for (TipoDeMadera tipo : tiposDeMadera) {
            if (tipo.getNombre().equalsIgnoreCase(nombre)) {
                return new ResponseEntity<>("El tipo de madera ya existe", HttpStatus.CONFLICT);
            }
        }
        TipoDeMadera tipoDeMadera = new TipoDeMadera(nombre);
        tiposDeMadera.add(tipoDeMadera);
        return new ResponseEntity<>("Tipo de madera agregado exitosamente", HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TipoDeMadera>> getTiposDeMadera() {
        return new ResponseEntity<>(tiposDeMadera, HttpStatus.OK);
    }

    @GetMapping("/{nombre}")
    public ResponseEntity<TipoDeMadera> getTipoDeMadera(@PathVariable String nombre) {
        for (TipoDeMadera tipo : tiposDeMadera) {
            if (tipo.getNombre().equalsIgnoreCase(nombre)) {
                return new ResponseEntity<>(tipo, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}