package PPyL.Muebleria.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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
    public Venta createVenta(@RequestBody VentaDTO ventaDTO) {

        return ventaService.createVenta(ventaDTO);
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