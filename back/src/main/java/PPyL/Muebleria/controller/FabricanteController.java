package PPyL.Muebleria.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public List<Fabricante> getFabricantes() {
        return fabricanteRepository.findAll();
    }

    @GetMapping("/{nombre}")
    public Fabricante getFabricante(@PathVariable String nombre) {
        return fabricanteRepository.findByNombreIgnoreCase(nombre).orElse(null);
    }
}