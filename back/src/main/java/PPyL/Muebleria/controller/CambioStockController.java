package PPyL.Muebleria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import PPyL.Muebleria.dto.CambioStockDTO;
import PPyL.Muebleria.service.CambioStockService;

@RestController
@RequestMapping("/api/cambioStock")
public class CambioStockController {

    @Autowired
    private CambioStockService cambioStockService;

    @GetMapping
    public List<CambioStockDTO> getAllCambioStock() {
        return cambioStockService.getAllCambioStock();
    }

    @PostMapping
    public CambioStockDTO createCambioStock(@RequestParam CambioStockDTO cambioStockDTO) {
        return cambioStockService.createCambioStock(cambioStockDTO);
    }

    @GetMapping("/{id}")
    public CambioStockDTO getCambioStockById(@PathVariable Long id) {
        return cambioStockService.getCambioStockById(id);
    }

    @PutMapping("/{id}")
    public CambioStockDTO updateCambioStock(@PathVariable Long id, @RequestBody CambioStockDTO cambioStockDTO) {
        return cambioStockService.updateCambioStock(id, cambioStockDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteCambioStock(@PathVariable Long id) {
        cambioStockService.deleteCambioStock(id);
    }

    @GetMapping("/mueble/{id}")
    public List<CambioStockDTO> getCambioStockByMuebleId(@PathVariable Long id) {
        return cambioStockService.getCambioStockByMuebleId(id);
    }

    @GetMapping("/cantidad/{id}") 
    public int getCantidadDeCambiosByMuebleId(@PathVariable Long id) {
        return cambioStockService.getCantidadDeCambiosByMuebleId(id);
    } 

    public CambioStockDTO getCambioStockByMuebleIdAndVentaMuebleId(Long muebleId, Long ventaMuebleId) {
        return cambioStockService.getCambioStockByMuebleIdAndVentaMuebleId(muebleId, ventaMuebleId);
    }
}
