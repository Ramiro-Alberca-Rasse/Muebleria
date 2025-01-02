package PPyL.Muebleria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PPyL.Muebleria.dto.TipoDTO;
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
    public List<TipoDTO> getTipos() {
        return tipoRepository.findAll().stream()
            .map(tipo -> new TipoDTO(tipo.getId(), tipo.getNombre()))
            .toList();
    }

    /* @GetMapping("/{nombre}")
    public Tipo getTipo(@PathVariable String nombre) {
        return tipoRepository.findByNombreIgnoreCase(nombre).orElse(null);
    } */

    @GetMapping("/{id}")
    public ResponseEntity<?> getTipoById(@PathVariable Long id) {
        return tipoRepository.findById(id)
            .map(tipo -> ResponseEntity.ok(new TipoDTO(tipo.getId(), tipo.getNombre())))
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTipo(@PathVariable Long id) {
        if (tipoRepository.existsById(id)) {
            tipoRepository.deleteById(id);
            return new ResponseEntity<>("Tipo eliminado exitosamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Tipo no encontrado", HttpStatus.NOT_FOUND);
        }
    }
}