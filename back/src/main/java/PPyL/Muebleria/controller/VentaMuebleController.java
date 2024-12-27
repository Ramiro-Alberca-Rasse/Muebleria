package PPyL.Muebleria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PPyL.Muebleria.dto.VentaMuebleDTO;
import PPyL.Muebleria.model.VentaMueble;
import PPyL.Muebleria.service.VentaMuebleService;

@RestController
@RequestMapping("/api/ventaMuebles")
public class VentaMuebleController {

    @Autowired
    private VentaMuebleService ventaMuebleService;

    @GetMapping
    public List<VentaMueble> getAllVentaMuebles() {
        return ventaMuebleService.getAllVentaMuebles();
    }

    @GetMapping("/{id}")
    public VentaMueble getVentaMuebleById(@PathVariable Long id) {
        return ventaMuebleService.getVentaMuebleById(id);
    }

    @PostMapping
    public ResponseEntity<?> createVenta(@RequestBody VentaMuebleDTO ventaMuebleDTO) {
        try {
            VentaMueble ventaMueble = ventaMuebleService.createVentaMueble(ventaMuebleDTO);
            return ResponseEntity.ok(ventaMueble);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            // Loggear el error para más detalles
            e.printStackTrace(); // O usar un logger como SLF4J para registrar el error
            String errorMessage = e.getMessage() != null ? e.getMessage() : "Error interno del servidor";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor: " + errorMessage);
        }
    }

    @PutMapping("/{id}")
    public VentaMueble updateVentaMueble(@PathVariable Long id, @RequestBody VentaMueble ventaMuebleDetails) {
        return ventaMuebleService.updateVentaMueble(id, ventaMuebleDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteVentaMueble(@PathVariable Long id) {
        ventaMuebleService.deleteVentaMueble(id);
    }
}
