package PPyL.Muebleria.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import PPyL.Muebleria.dto.VentaDTO;
import PPyL.Muebleria.model.Venta;
import PPyL.Muebleria.model.VentaMueble;
import PPyL.Muebleria.service.VentaService;

@RestController
@RequestMapping("/api/ventas")
public class VentaController {
/* 
    @Autowired
    private ClienteController clienteController;

    @Autowired
    private MuebleController muebleController; */

    @Autowired
    private VentaService ventaService;

    @Autowired
    private VentaMuebleController ventaMuebleController;

    private static final Logger logger = LoggerFactory.getLogger(VentaController.class);

    @GetMapping
    public List<VentaDTO> getAllVentas() {
        return ventaService.getAllVentas().stream()
                .map(venta -> new VentaDTO(venta))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public VentaDTO getVentaById(@PathVariable Long id) {
        Venta venta = ventaService.getVentaById(id);
        return new VentaDTO(venta);
    }

   @PostMapping
    public ResponseEntity<Venta> createVenta(@RequestBody VentaDTO ventaDTO) {
        try {
            Venta nuevaVenta = ventaService.createVenta(ventaDTO);
            logger.info("Venta creada con éxito: " + nuevaVenta);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaVenta);
        } catch (Exception e) {
            logger.error("Error al crear la venta", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public Venta updateVenta(@PathVariable Long id, @RequestBody Venta venta) {
        return ventaService.updateVenta(id, venta);
    }

    @DeleteMapping("/{id}")
    public void deleteVenta(@PathVariable Long id) {
        Venta venta = ventaService.getVentaById(id);

        for(VentaMueble subventa : venta.getVentas()) {
            ventaMuebleController.deleteVentaMueble(subventa.getId());
        }
        
        ventaService.deleteVenta(id);
    }
}