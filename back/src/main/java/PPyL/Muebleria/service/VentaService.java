package PPyL.Muebleria.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PPyL.Muebleria.dto.VentaDTO;
import PPyL.Muebleria.dto.VentaMuebleDTO;
import PPyL.Muebleria.model.Cliente;
import PPyL.Muebleria.model.Venta;
import PPyL.Muebleria.model.VentaMueble;
import PPyL.Muebleria.repository.ClienteRepository;
import PPyL.Muebleria.repository.VentaRepository;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private VentaMuebleService ventaMuebleService;

    private static final Logger logger = LoggerFactory.getLogger(VentaService.class);

    public List<Venta> getAllVentas() {
        return ventaRepository.findAll();
    }

    public Venta getVentaById(Long id) {
        return ventaRepository.findById(id).orElse(null);
    }

    public Venta createVenta(VentaDTO ventaDTO) {
        logger.info("Iniciando creación de venta con ID cliente: {}", ventaDTO.getIdCliente());
        
        Venta venta = new Venta();
        // Asignar los valores de ventaDTO a venta
        logger.debug("Creando objeto venta y asignando los valores.");

        try {
            Cliente cliente = clienteRepository.findById(ventaDTO.getIdCliente()).get();
            logger.info("Cliente encontrado con ID: {}", cliente.getId());
            venta.setCliente(cliente);
            venta.setFecha(ventaDTO.getFecha());
            venta.setPrecioTotal(ventaDTO.getPrecioTotal());
            logger.info("Contenido de ventasMuebles en ventaDTO: {}", ventaDTO.getVentasMuebles());
            VentaMueble ventaMueble = new VentaMueble();

            
            for (int i = 0; i < ventaDTO.getVentasMuebles().size(); i++) {
                VentaMuebleDTO ventaMuebleDTO2 = ventaDTO.getVentasMuebles().get(i);
                logger.info("Procesando mueble para la venta: {}", ventaMuebleDTO2);
                ventaMueble = ventaMuebleService.createVentaMueble(ventaMuebleDTO2);
            }

            cliente.addVenta(venta);
            clienteRepository.save(cliente);
            logger.info("Cliente con ID: {} actualizado con nueva venta.", cliente.getId());

            Venta savedVenta = ventaRepository.save(venta);
            logger.info("Venta creada y guardada con ID: {}", savedVenta.getId());

            return savedVenta;

        } catch (Exception e) {
            logger.error("Error al crear la venta para el cliente con ID: {}", ventaDTO.getIdCliente(), e);
            throw e; // Re-lanzamos la excepción para que el controlador maneje el error adecuadamente
        }
    }


    public Venta updateVenta(Long id, Venta venta) {
        if (ventaRepository.existsById(id)) {
            venta.setId(id);
            return ventaRepository.save(venta);
        }
        return null;
    }

    public void deleteVenta(Long id) {
        ventaRepository.deleteById(id);
    }
}