package PPyL.Muebleria.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import PPyL.Muebleria.dto.MuebleDTO;
import PPyL.Muebleria.service.MuebleService;

@RestController
@RequestMapping("/api/muebles")
public class MuebleController {

    private static final Logger logger = LoggerFactory.getLogger(MuebleController.class);

    @Autowired
    private MuebleService muebleService;

    @GetMapping
    public List<MuebleDTO> listarMuebles(@RequestParam(required = false) String categoria) {
        return muebleService.listarMuebles(categoria);
    }

    @GetMapping("/{id}")
    public MuebleDTO obtenerMueble(@PathVariable Long id) {
        return muebleService.obtenerMueble(id);
    }

    @PostMapping("/crear")
    public MuebleDTO crearMueble(@RequestBody MuebleDTO muebleDTO) {
        logger.info("Mandando a servicio");
        return muebleService.crearMueble(muebleDTO);
    }

    @PutMapping("/{id}")
    public MuebleDTO actualizarMueble(@PathVariable Long id, @RequestBody MuebleDTO muebleDTO) {
        return muebleService.actualizarMueble(id, muebleDTO);
    }

    @DeleteMapping("/{id}")
    public void eliminarMueble(@PathVariable Long id) {
        muebleService.eliminarMueble(id);
    }
}
