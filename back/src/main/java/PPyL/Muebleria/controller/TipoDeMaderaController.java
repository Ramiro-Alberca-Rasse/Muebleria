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

import PPyL.Muebleria.dto.TipoDeMaderaDTO;
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
    public ResponseEntity<List<TipoDeMaderaDTO>> getTiposDeMadera() {
        List<TipoDeMaderaDTO> dtos = tipoDeMaderaRepository.findAll().stream()
            .map(tipo -> new TipoDeMaderaDTO(tipo.getId(), tipo.getNombre()))
            .toList();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    /* @GetMapping("/{nombre}")
    public ResponseEntity<TipoDeMadera> getTipoDeMadera(@PathVariable String nombre) {
        return tipoDeMaderaRepository.findByNombreIgnoreCase(nombre)
            .map(tipo -> new ResponseEntity<>(tipo, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    } */

    @GetMapping("/{id}")
    public ResponseEntity<TipoDeMaderaDTO> getTipoDeMadera(@PathVariable Long id) {
        return tipoDeMaderaRepository.findById(id)
            .map(madera -> ResponseEntity.ok(new TipoDeMaderaDTO(madera.getId(), madera.getNombre())))
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTipoDeMadera(@PathVariable Long id) {
        if (tipoDeMaderaRepository.existsById(id)) {
            tipoDeMaderaRepository.deleteById(id);
            return new ResponseEntity<>("Tipo de madera eliminado exitosamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Tipo de madera no encontrado", HttpStatus.NOT_FOUND);
        }
    }
}