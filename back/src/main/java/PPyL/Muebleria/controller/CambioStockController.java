package PPyL.Muebleria.controller;

import PPyL.Muebleria.dto.CambioStockDTO;
import PPyL.Muebleria.service.CambioStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
