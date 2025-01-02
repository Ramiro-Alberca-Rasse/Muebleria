package PPyL.Muebleria.controller;

import java.util.List;
import java.util.stream.Collectors;

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

import PPyL.Muebleria.dto.FabricanteDTO;
import PPyL.Muebleria.model.Fabricante;
import PPyL.Muebleria.repository.FabricanteRepository;

@RestController
@RequestMapping("/api/fabricantes")
public class FabricanteController {

    @Autowired
    private FabricanteRepository fabricanteRepository;

    // Método para agregar un nuevo fabricante
    @PostMapping("/registrar")
    public ResponseEntity<String> addFabricante(@RequestBody String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return new ResponseEntity<>("Nombre no puede estar vacío", HttpStatus.BAD_REQUEST);
        }
        if (fabricanteRepository.findByNombreIgnoreCase(nombre).isPresent()) {
            return new ResponseEntity<>("El fabricante ya existe", HttpStatus.CONFLICT);
        }
        Fabricante fabricante = new Fabricante(nombre);
        fabricanteRepository.save(fabricante);
        return new ResponseEntity<>("Fabricante agregado exitosamente", HttpStatus.CREATED);
    }

    @GetMapping
    public List<FabricanteDTO> getFabricantes() {
        List<Fabricante> fabricantes = fabricanteRepository.findAll();
        return fabricantes.stream()
                .map(fabricante -> new FabricanteDTO(fabricante.getId(), fabricante.getNombre()))
                .collect(Collectors.toList());
    }

    /* @GetMapping("/{nombre}")
    public Fabricante getFabricante(@PathVariable String nombre) {
        return fabricanteRepository.findByNombreIgnoreCase(nombre).orElse(null);
    } */

    @GetMapping("/{id}")
    public ResponseEntity<FabricanteDTO> getFabricante(@PathVariable Long id) {
        return fabricanteRepository.findById(id)
            .map(fabricante -> ResponseEntity.ok(new FabricanteDTO(fabricante.getId(), fabricante.getNombre())))
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFabricante(@PathVariable Long id) {
        if (fabricanteRepository.existsById(id)) {
            fabricanteRepository.deleteById(id);
            return new ResponseEntity<>("Fabricante eliminado exitosamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Fabricante no encontrado", HttpStatus.NOT_FOUND);
        }
    }
    
}