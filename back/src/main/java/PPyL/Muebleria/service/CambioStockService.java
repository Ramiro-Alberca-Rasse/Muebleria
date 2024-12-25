package PPyL.Muebleria.service;

import PPyL.Muebleria.dto.CambioStockDTO;
import PPyL.Muebleria.model.CambioStock;
import PPyL.Muebleria.repository.CambioStockRepository;
import PPyL.Muebleria.repository.MuebleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CambioStockService {

    @Autowired
    private CambioStockRepository cambioStockRepository;

    @Autowired
    private MuebleRepository muebleRepository;

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
                cambioStockDTO.isPrimerCambio()
        );
        
        cambioStockRepository.save(cambioStock);
        return new CambioStockDTO(cambioStock);
    }

    public CambioStockDTO getCambioStockById(Long id) {
        CambioStock cambioStock = cambioStockRepository.findById(id).orElseThrow();
        return new CambioStockDTO(cambioStock);
    }

    public CambioStockDTO updateCambioStock(Long id, CambioStockDTO cambioStockDTO) {
        CambioStock cambioStock = cambioStockRepository.findById(id).orElseThrow();
        // ...existing code...
        cambioStockRepository.save(cambioStock);
        return new CambioStockDTO(cambioStock);
    }

    public void deleteCambioStock(Long id) {
        cambioStockRepository.deleteById(id);
    }

    public List<CambioStockDTO> getCambioStockByMuebleId(Long id) {
        return cambioStockRepository.findByMuebleId(id).stream()
                .map(CambioStockDTO::new)
                .collect(Collectors.toList());
    }

    public CambioStockDTO getPrimerCambioStockByMuebleId(Long id) {
        CambioStock cambioStock = cambioStockRepository.findByMuebleIdAndPrimerCambioTrue(id);
        return new CambioStockDTO(cambioStock);
    }

    public int getCantidadDeCambiosByMuebleId(Long id) {
        return cambioStockRepository.findByMuebleId(id).size();
    }
}