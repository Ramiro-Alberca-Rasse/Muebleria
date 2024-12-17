package PPyL.Muebleria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PPyL.Muebleria.dto.VentaMuebleDTO;
import PPyL.Muebleria.model.Mueble;
import PPyL.Muebleria.model.Venta;
import PPyL.Muebleria.model.VentaMueble;
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
    private VentaRepository ventaRepository;

    public List<VentaMueble> getAllVentaMuebles() {
        return ventaMuebleRepository.findAll();
    }

    public VentaMueble getVentaMuebleById(Long id) {
        return ventaMuebleRepository.findById(id).orElse(null);
    }

    public VentaMueble createVentaMueble(VentaMuebleDTO ventaMuebleDTO) {
        VentaMueble ventaMueble = new VentaMueble();
        Mueble mueble = muebleRepository.findById(ventaMuebleDTO.getIdMueble()).orElse(null);
        Venta venta = ventaRepository.findById(ventaMuebleDTO.getIdVenta()).orElse(null);
        if (mueble != null && venta != null) {
            ventaMueble.setMueble(mueble);
            ventaMueble.setCantidad(ventaMuebleDTO.getCantidad());
            ventaMueble.setSubTotal(ventaMuebleDTO.getSubTotal());
            ventaMueble.setVenta(venta);
            return ventaMuebleRepository.save(ventaMueble);
        }
        return null;
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