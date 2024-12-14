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

import PPyL.Muebleria.model.Tipo;
import PPyL.Muebleria.repository.TipoRepository;

@RestController
@RequestMapping("/api/tipos")
public class TipoController {

    @Autowired
    private TipoRepository tipoRepository;

    // Método para agregar un nuevo tipo
    @PostMapping("/registrar")
    public ResponseEntity<String> addTipo(@RequestBody String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return new ResponseEntity<>("Nombre no puede estar vacío", HttpStatus.BAD_REQUEST);
        }
        if (tipoRepository.findByNombreIgnoreCase(nombre).isPresent()) {
            return new ResponseEntity<>("El tipo ya existe", HttpStatus.CONFLICT);
        }
        Tipo tipo = new Tipo(nombre);
        tipoRepository.save(tipo);
        return new ResponseEntity<>("Tipo agregado exitosamente", HttpStatus.CREATED);
    }

    @GetMapping
    public List<Tipo> getTipos() {
        return tipoRepository.findAll();
    }

    @GetMapping("/{nombre}")
    public Tipo getTipo(@PathVariable String nombre) {
        return tipoRepository.findByNombreIgnoreCase(nombre).orElse(null);
    }
}