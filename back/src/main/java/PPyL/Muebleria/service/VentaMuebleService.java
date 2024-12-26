package PPyL.Muebleria.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PPyL.Muebleria.dto.VentaMuebleDTO;
import PPyL.Muebleria.model.CambioStock;
import PPyL.Muebleria.model.Mueble;
import PPyL.Muebleria.model.VentaMueble;
import PPyL.Muebleria.repository.CambioStockRepository;
import PPyL.Muebleria.repository.MuebleRepository;
import PPyL.Muebleria.repository.VentaMuebleRepository;
import PPyL.Muebleria.repository.VentaRepository;

@Service
public class VentaMuebleService {

    @Autowired
    private VentaMuebleRepository ventaMuebleRepository;

    @Autowired
    private MuebleRepository muebleRepository;

    @Autowired
    private CambioStockRepository cambioStockRepository;

    @Autowired
    private VentaRepository ventaRepository;

    private static final Logger logger = LoggerFactory.getLogger(VentaService.class);

    public List<VentaMueble> getAllVentaMuebles() {
        return ventaMuebleRepository.findAll();
    }

    public VentaMueble getVentaMuebleById(Long id) {
        return ventaMuebleRepository.findById(id).orElse(null);
    }


    public VentaMueble createVentaMueble(VentaMuebleDTO ventaMuebleDTO) {

    VentaMueble ventaMueble = new VentaMueble();
    
    // Obtener el mueble
    Mueble mueble = muebleRepository.findById(ventaMuebleDTO.getIdMueble()).orElse(null);
    if (mueble == null) {
        throw new IllegalArgumentException("Mueble not found");
    }
    

    // Validar stock disponible
    if (mueble.getStock() < ventaMuebleDTO.getCantidad()) {
        throw new IllegalArgumentException("Not enough stock available");
    }

    logger.info("Creating ventaMueble with mueble: {}", mueble.getNombre());
    // Asignar los valores
    ventaMueble.setMueble(mueble);
    ventaMueble.setCantidad(ventaMuebleDTO.getCantidad());
    ventaMueble.setSubTotal(ventaMuebleDTO.getSubTotal());

    

    // Actualizar el stock
    mueble.setStock(mueble.getStock() - ventaMuebleDTO.getCantidad());
    muebleRepository.save(mueble);

    logger.info("Stock updated for mueble: {}", mueble.getNombre());

    // Registrar el cambio de stock
    String tipoCambio = "Salida";
    CambioStock cambioStock = new CambioStock(mueble, ventaMueble.getCantidad(), tipoCambio, mueble.getStock());
    cambioStockRepository.save(cambioStock);
    
    logger.info("Stock change registered for mueble: {}", mueble.getNombre());
    // Guardar la venta de mueble
    return ventaMuebleRepository.save(ventaMueble);
    }


    public VentaMueble updateVentaMueble(Long id, VentaMueble ventaMuebleDetails) {
        VentaMueble ventaMueble = ventaMuebleRepository.findById(id).orElse(null);
        if (ventaMueble != null) {
            ventaMueble.setMueble(ventaMuebleDetails.getMueble());
            ventaMueble.setCantidad(ventaMuebleDetails.getCantidad());
            ventaMueble.setVenta(ventaMuebleDetails.getVenta());
            return ventaMuebleRepository.save(ventaMueble);
        }
        return null;
    }

    public void deleteVentaMueble(Long id) {
        ventaMuebleRepository.deleteById(id);
    }
}