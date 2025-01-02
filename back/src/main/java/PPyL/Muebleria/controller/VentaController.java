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

import PPyL.Muebleria.dto.CambioStockDTO;
import PPyL.Muebleria.dto.MuebleDTO;
import PPyL.Muebleria.dto.VentaDTO;
import PPyL.Muebleria.model.Mueble;
import PPyL.Muebleria.model.Venta;
import PPyL.Muebleria.model.VentaMueble;
import PPyL.Muebleria.service.MuebleService;
import PPyL.Muebleria.service.VentaService;

@RestController
@RequestMapping("/api/ventas")
public class VentaController {

    @Autowired
    private MuebleController muebleController;

    @Autowired
    private VentaService ventaService;

    @Autowired
    private VentaMuebleController ventaMuebleController;

    @Autowired
    private CambioStockController cambioStockController;

    @Autowired
    private MuebleService muebleService;

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
    public ResponseEntity<?> createVenta(@RequestBody VentaDTO ventaDTO) {
        try {
            Venta nuevaVenta = ventaService.createVenta(ventaDTO);
            logger.info("Venta creada con éxito: " + nuevaVenta);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaVenta);
        } catch (Exception e) {
            logger.error("Error al crear la venta", e);
            String errorMessage = e.getMessage() != null ? e.getMessage() : "Error interno del servidor";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    @PutMapping("/{id}")
    public Venta updateVenta(@PathVariable Long id, @RequestBody Venta venta) {
        return ventaService.updateVenta(id, venta);
    }

    @DeleteMapping("/{id}")
    public void deleteVenta(@PathVariable Long id) {
        Venta venta = ventaService.getVentaById(id);

        for(int i = 0 ; i < venta.getVentas().size(); i++) {
            logger.info("VentaMueble: " + venta.getVenta(i));
            VentaMueble subventa = venta.getVenta(i);
            Mueble mueble = subventa.getMueble();
            mueble.setStock(mueble.getStock() - subventa.getCantidad());
            MuebleDTO muebleDTO = new MuebleDTO(mueble);
            CambioStockDTO cambiostockDTO = cambioStockController.getCambioStockByMuebleIdAndVentaMuebleId(mueble.getId(), subventa.getId());
            logger.info("CambioStock: " + cambiostockDTO);
            cambioStockController.deleteCambioStock(cambiostockDTO.getId());
            muebleService.actualizarStock(muebleDTO);
            ventaMuebleController.deleteVentaMueble(subventa.getId());
        }

        
        ventaService.deleteVenta(id);
    }
}