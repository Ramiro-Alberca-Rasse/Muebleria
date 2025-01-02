package PPyL.Muebleria.service;

import PPyL.Muebleria.dto.CambioStockDTO;
import PPyL.Muebleria.model.CambioStock;
import PPyL.Muebleria.model.Mueble;
import PPyL.Muebleria.repository.CambioStockRepository;
import PPyL.Muebleria.repository.MuebleRepository;
import PPyL.Muebleria.repository.VentaMuebleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CambioStockService {

    @Autowired
    private CambioStockRepository cambioStockRepository;

    @Autowired
    private MuebleRepository muebleRepository;

    @Autowired
    private VentaMuebleRepository ventaMuebleRepository;

    private static final Logger logger = LoggerFactory.getLogger(CambioStockService.class);

    public List<CambioStockDTO> getAllCambioStock() {
        return cambioStockRepository.findAll().stream()
                .map(CambioStockDTO::new)
                .collect(Collectors.toList());
    }

    public CambioStockDTO createCambioStock(CambioStockDTO cambioStockDTO) {
        CambioStock cambioStock = new CambioStock(
                // ...existing code...
                muebleRepository.findByNombre(cambioStockDTO.getNombreMueble()).get(),
                cambioStockDTO.getCantidad(),
                cambioStockDTO.getTipoCambio(),
                cambioStockDTO.getNuevoStock(),
                cambioStockDTO.isPrimerCambio(),
                ventaMuebleRepository.findById(cambioStockDTO.getVentaMuebleId()).get()

        );
        
        cambioStockRepository.save(cambioStock);
        return new CambioStockDTO(cambioStock);
    }

    public CambioStockDTO getCambioStockById(Long id) {
        CambioStock cambioStock = cambioStockRepository.findById(id).orElseThrow();
        return new CambioStockDTO(cambioStock);
    }

    public CambioStockDTO updateCambioStock(Long id, CambioStockDTO cambioStockDTO) {
        CambioStock cambioStock = cambioStockRepository.findById(id).orElseThrow(() -> new RuntimeException("Cambio de stock no encontrado"));
        
        cambioStock.setMueble(muebleRepository.findByNombre(cambioStockDTO.getNombreMueble()).get());
        cambioStock.setCantidad(cambioStockDTO.getCantidad());
        cambioStock.setTipoCambio(cambioStockDTO.getTipoCambio());
        cambioStock.setNuevoStock(cambioStockDTO.getNuevoStock());
        cambioStock.setPrimerCambio(cambioStockDTO.isPrimerCambio());
        
        cambioStockRepository.save(cambioStock);
        return new CambioStockDTO(cambioStock);
    }

    public void deleteCambioStock(Long id) {
        cambioStockRepository.deleteById(id);
    }

    public List<CambioStockDTO> getCambioStockByMuebleId(Long id) {
        Mueble mueble = muebleRepository.findById(id).orElseThrow(() -> new RuntimeException("Mueble no encontrado"));
        List<CambioStock> cambiosStocks = mueble.getCambiosStock();
        List<CambioStockDTO> cambiosStocksDTO = cambiosStocks.stream()
                .map(CambioStockDTO::new)
                .collect(Collectors.toList());
        return cambiosStocksDTO;
    }

    public CambioStockDTO getPrimerCambioStockByMuebleId(Long id) {
        CambioStock cambioStock = cambioStockRepository.findByMuebleIdAndPrimerCambioTrue(id);
        return new CambioStockDTO(cambioStock);
    }

    public int getCantidadDeCambiosByMuebleId(Long id) {
        return cambioStockRepository.findByMuebleId(id).size();
    }

    public CambioStockDTO getCambioStockByMuebleIdAndVentaMuebleId(Long muebleId, Long ventaMuebleId) {
        CambioStock cambioStock = cambioStockRepository.findByMuebleIdAndVentaMuebleId(muebleId, ventaMuebleId);
        return new CambioStockDTO(cambioStock);
    }


}
