package PPyL.Muebleria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PPyL.Muebleria.model.TipoDeMadera;
import PPyL.Muebleria.repository.TipoDeMaderaRepository;

@RestController
@RequestMapping("/api/tiposdemadera")
public class TipoDeMaderaController {

    @Autowired
    private TipoDeMaderaRepository tipoDeMaderaRepository;

    // Método para agregar un nuevo tipo de madera
    @PostMapping("/registrar")
    public ResponseEntity<String> addTipoDeMadera(@RequestBody String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return new ResponseEntity<>("Nombre no puede estar vacío", HttpStatus.BAD_REQUEST);
        }
        if (tipoDeMaderaRepository.findByNombreIgnoreCase(nombre).isPresent()) {
            return new ResponseEntity<>("El tipo de madera ya existe", HttpStatus.CONFLICT);
        }
        TipoDeMadera tipoDeMadera = new TipoDeMadera(nombre);
        tipoDeMaderaRepository.save(tipoDeMadera);
        return new ResponseEntity<>("Tipo de madera agregado exitosamente", HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TipoDeMadera>> getTiposDeMadera() {
        return new ResponseEntity<>(tipoDeMaderaRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{nombre}")
    public ResponseEntity<TipoDeMadera> getTipoDeMadera(@PathVariable String nombre) {
        return tipoDeMaderaRepository.findByNombreIgnoreCase(nombre)
            .map(tipo -> new ResponseEntity<>(tipo, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}