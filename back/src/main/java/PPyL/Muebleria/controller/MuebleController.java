package PPyL.Muebleria.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import PPyL.Muebleria.dto.MuebleDTO;
import PPyL.Muebleria.model.Fabricante;
import PPyL.Muebleria.model.Mueble;
import PPyL.Muebleria.model.Tipo;
import PPyL.Muebleria.model.TipoDeMadera;
import PPyL.Muebleria.repository.FabricanteRepository;
import PPyL.Muebleria.repository.TipoDeMaderaRepository;
import PPyL.Muebleria.repository.TipoRepository;
import PPyL.Muebleria.service.MuebleService;

@RestController
@RequestMapping("/api/muebles")
public class MuebleController {

    private static final Logger logger = LoggerFactory.getLogger(MuebleController.class);

    @Autowired
    private MuebleService muebleService;

    @Autowired
    private FabricanteRepository fabricanteRepository;

    @Autowired
    private TipoRepository tipoRepository;

    @Autowired
    private TipoDeMaderaRepository tipoDeMaderaRepository;

    @GetMapping
    public List<MuebleDTO> listarMuebles(@RequestParam(required = false) Tipo Tipo) {
        if (Tipo == null) {
            return muebleService.listarMuebles();
        }
        return muebleService.listarMuebles(Tipo);
    }

    @GetMapping("/{id}")
    public MuebleDTO obtenerMueble(@PathVariable Long id) {
        return muebleService.obtenerMueble(id);
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> addMueble(@RequestBody MuebleDTO muebleDTO) {
        logger.info("Recibido nuevo mueble: {}", muebleDTO);

        // Validar y buscar las relaciones usando las IDs del DTO
        Fabricante fabricante = fabricanteRepository.findById(muebleDTO.getFabricanteId())
                .orElseThrow(() -> new RuntimeException("El fabricante no existe"));

        Tipo tipo = tipoRepository.findById(muebleDTO.getTipoId())
                .orElseThrow(() -> new RuntimeException("El tipo no existe"));

        TipoDeMadera tipoDeMadera = tipoDeMaderaRepository.findById(muebleDTO.getTipoMaderaId())
                .orElseThrow(() -> new RuntimeException("El tipo de madera no existe"));

        // Crear el objeto Mueble a partir del DTO
        Mueble mueble = new Mueble();
        mueble.setNombre(muebleDTO.getNombre());
        mueble.setPrecio(muebleDTO.getPrecio());
        mueble.setStock(muebleDTO.getStock());
        mueble.setFabricante(fabricante);
        mueble.setTipo(tipo);
        mueble.setTipoMadera(tipoDeMadera);

        // Guardar el mueble en la base de datos
        muebleService.crearMueble(mueble);
        logger.info("Mueble agregado exitosamente: {}", mueble);
        return new ResponseEntity<>("Mueble agregado exitosamente", HttpStatus.CREATED);
    }

    @PutMapping("/actualizar/{id}")
    public MuebleDTO actualizarMueble(@PathVariable Long id, @RequestBody MuebleDTO muebleDTO) {
        return muebleService.actualizarMueble(id, muebleDTO);
    }

    @DeleteMapping("/eliminar/{id}")
    public void eliminarMueble(@PathVariable Long id) {
        muebleService.eliminarMueble(id);
    }
}
