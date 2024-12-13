
package PPyL.Muebleria.service;

import PPyL.Muebleria.model.VentaMueble;
import PPyL.Muebleria.repository.VentaMuebleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VentaMuebleService {

    @Autowired
    private VentaMuebleRepository ventaMuebleRepository;

    public List<VentaMueble> getAllVentaMuebles() {
        return ventaMuebleRepository.findAll();
    }

    public VentaMueble getVentaMuebleById(Long id) {
        return ventaMuebleRepository.findById(id).orElse(null);
    }

    public VentaMueble createVentaMueble(VentaMueble ventaMueble) {
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