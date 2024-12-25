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

import PPyL.Muebleria.dto.ActualizarMuebleDTO;
import PPyL.Muebleria.dto.CambioStockDTO;
import PPyL.Muebleria.dto.MuebleDTO;
import PPyL.Muebleria.model.Fabricante;
import PPyL.Muebleria.model.Mueble;
import PPyL.Muebleria.model.Tipo;
import PPyL.Muebleria.model.TipoDeMadera;
import PPyL.Muebleria.repository.FabricanteRepository;
import PPyL.Muebleria.repository.TipoDeMaderaRepository;
import PPyL.Muebleria.repository.TipoRepository;
import PPyL.Muebleria.service.CambioStockService;
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

    @Autowired
    private CambioStockController cambioStockController;

    @Autowired
    private CambioStockService cambioStockService;

    @GetMapping
    public List<MuebleDTO> listarMuebles(@RequestParam(required = false) Tipo Tipo) {
        if (Tipo == null) {
            return muebleService.listarMuebles();
        }
        return muebleService.listarMuebles(Tipo);
    }

    @GetMapping("/todos")
    public List<MuebleDTO> obtenerTodosLosMuebles() {
        return muebleService.listarMuebles();
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
        String tipoCambio = "Entrada";
        CambioStockDTO cambioStockDTO = new CambioStockDTO(muebleDTO, tipoCambio, muebleDTO.getStock());
        cambioStockDTO.setPrimerCambio(true);
        cambioStockController.createCambioStock(cambioStockDTO);

        return new ResponseEntity<>("Mueble agregado exitosamente", HttpStatus.CREATED);
    }

    @PutMapping("/actualizar/{id}")
    public MuebleDTO actualizarMueble(@PathVariable Long id, @RequestBody ActualizarMuebleDTO actualizarMuebleDTO) {
        boolean checkbox = actualizarMuebleDTO.getCheckbox();
        MuebleDTO muebleDTO = actualizarMuebleDTO.getMuebleDTO();
        MuebleDTO muebleDTO2 = muebleService.obtenerMueble(id);

        if (muebleDTO.getStock() != muebleDTO2.getStock()) {
            if (checkbox == false) {

                if (muebleDTO2.getStock() != muebleDTO.getStock()) {
                    String tipoCambio;
                    if (muebleDTO2.getStock() > muebleDTO.getStock()) {
                        tipoCambio = "Salida";
                    } else {
                        tipoCambio = "Entrada";
                    }
                    int cantidad = Math.abs(muebleDTO2.getStock() - muebleDTO.getStock());
                    CambioStockDTO cambioStockDTO = new CambioStockDTO(muebleDTO, tipoCambio, cantidad);
                    cambioStockController.createCambioStock(cambioStockDTO);   
                }
            } else {

                if (cambioStockController.getCantidadDeCambiosByMuebleId(id) > 1) {
                    throw new RuntimeException("No se puede modificar el stock inicial después de haber realizado otros cambios de stock, desmarque la casilla para continuar");
                }

                CambioStockDTO cambioStockDTO = cambioStockService.getPrimerCambioStockByMuebleId(id);
                cambioStockDTO.setCantidad(muebleDTO.getStock());
                cambioStockDTO.setNuevoStock(muebleDTO.getStock());
                cambioStockController.updateCambioStock(cambioStockDTO.getId(), cambioStockDTO);
            }
        }
        
        return muebleService.actualizarMueble(id, muebleDTO);
    }

    @DeleteMapping("/eliminar/{id}")
    public void eliminarMueble(@PathVariable Long id) {
        muebleService.eliminarMueble(id);
    }

    @PutMapping("/stock/{id}")
    public void actualizarStock(@PathVariable Long id, @RequestBody Integer cantidad) {
        MuebleDTO muebleDTO2 = muebleService.obtenerMueble(id);
        muebleDTO2.setStock(muebleDTO2.getStock() + cantidad);
        String tipoCambio = "Entrada";
        CambioStockDTO cambioStockDTO = new CambioStockDTO(muebleDTO2, tipoCambio, cantidad);
        cambioStockController.createCambioStock(cambioStockDTO);

        muebleService.actualizarStock(id, cantidad);
    }

    @GetMapping("/stock/actual")
    public List<MuebleDTO> listarMueblesStockActual() {
        return muebleService.listarMueblesStockActual();
    }

}
