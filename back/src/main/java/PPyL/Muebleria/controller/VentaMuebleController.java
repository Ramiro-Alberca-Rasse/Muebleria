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
import org.springframework.web.bind.annotation.RestController;

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
    public VentaMueble createVentaMueble(@RequestBody VentaMueble ventaMueble) {
        return ventaMuebleService.createVentaMueble(ventaMueble);
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