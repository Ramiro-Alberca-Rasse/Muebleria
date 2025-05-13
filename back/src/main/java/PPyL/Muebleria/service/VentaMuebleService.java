package PPyL.Muebleria.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PPyL.Muebleria.controller.NotificacionController;
import PPyL.Muebleria.dto.VentaMuebleDTO;
import PPyL.Muebleria.model.CambioStock;
import PPyL.Muebleria.model.Mueble;
import PPyL.Muebleria.model.Notificacion;
import PPyL.Muebleria.model.VentaMueble;
import PPyL.Muebleria.repository.CambioStockRepository;
import PPyL.Muebleria.repository.MuebleRepository;
import PPyL.Muebleria.repository.VentaMuebleRepository;

@Service
public class VentaMuebleService {

    @Autowired
    private VentaMuebleRepository ventaMuebleRepository;

    @Autowired
    private MuebleRepository muebleRepository;

    @Autowired
    private CambioStockRepository cambioStockRepository;

    @Autowired
    private NotificacionController notificacionController;

    private int notificacion = 2;

    private static final Logger logger = LoggerFactory.getLogger(VentaService.class);


    //getters
    public int getNotificacion() {
        return notificacion;
    }

    public void setNotificacion(int notificacion) {
        this.notificacion = notificacion;
    }

    //metodos
    public List<VentaMueble> getAllVentaMuebles() {
        return ventaMuebleRepository.findAll();
    }

    public VentaMueble getVentaMuebleById(Long id) {
        return ventaMuebleRepository.findById(id).orElse(null);
    }

    public void notificarStockBajo(Mueble mueble) {
        String mensaje = "Stock de " + mueble.getNombre() + " llegó a " +  mueble.getStock();
        Notificacion notificacion = new Notificacion(mensaje, mueble);
        notificacionController.createNotificacion(notificacion);
    } 

    public VentaMueble createVentaMueble(VentaMuebleDTO ventaMuebleDTO) {
        VentaMueble ventaMueble = new VentaMueble();
        
        // Obtener el mueble
        Mueble mueble = muebleRepository.findById(ventaMuebleDTO.getIdMueble()).orElse(null);
        if (mueble == null) {
            throw new IllegalArgumentException("Mueble no encontrado");
        }
        
        // Validar stock disponible
        if (mueble.getStock() < ventaMuebleDTO.getCantidad()) {
            throw new IllegalArgumentException("No hay suficiente stock disponible");
        }
        
        logger.info("Creating ventaMueble with mueble: {}", mueble.getNombre());
        
        // Asignar los valores
        ventaMueble.setMueble(mueble);
        ventaMueble.setCantidad(ventaMuebleDTO.getCantidad());
        ventaMueble.setSubTotal(ventaMuebleDTO.getSubTotal());
        
        // Actualizar el stock
        mueble.setStock(mueble.getStock() - ventaMuebleDTO.getCantidad());
        muebleRepository.save(mueble);
        
        
        // Registrar el cambio de stock

        
        // Guardar la venta de mueble
        VentaMueble ventaMuebleCreada = ventaMuebleRepository.save(ventaMueble);

        String tipoCambio = "Venta";
        CambioStock cambioStock = new CambioStock(mueble, ventaMueble.getCantidad(), tipoCambio, mueble.getStock(), false, ventaMuebleCreada);
        cambioStockRepository.save(cambioStock);

        if (mueble.getStock() <= notificacion) {
            notificarStockBajo(mueble);
    }
        
        return ventaMuebleCreada;
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