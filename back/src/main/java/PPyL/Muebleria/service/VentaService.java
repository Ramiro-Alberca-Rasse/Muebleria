package PPyL.Muebleria.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PPyL.Muebleria.dto.VentaDTO;
import PPyL.Muebleria.dto.VentaMuebleDTO;
import PPyL.Muebleria.model.Cliente;
import PPyL.Muebleria.model.Mueble;
import PPyL.Muebleria.model.Venta;
import PPyL.Muebleria.model.VentaMueble;
import PPyL.Muebleria.repository.ClienteRepository;
import PPyL.Muebleria.repository.MuebleRepository;
import PPyL.Muebleria.repository.VentaRepository;
import jakarta.transaction.Transactional;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private VentaMuebleService ventaMuebleService;

    @Autowired
    private MuebleRepository muebleRepository;

    private static final Logger logger = LoggerFactory.getLogger(VentaService.class);

    public List<Venta> getAllVentas() {
        return ventaRepository.findAll();
    }

    public List<Venta> getVentas(Long idCliente, Long idMueble, Date fechaInicio, Date fechaFin) {
        if (idCliente != 0 && idMueble != 0) {
            return ventaRepository.findByClienteIdAndVentasMuebleIdAndFechaBetween(idCliente, idMueble, fechaInicio, fechaFin);
        } else if (idCliente != 0) {
            return ventaRepository.findByClienteIdAndFechaBetween(idCliente, fechaInicio, fechaFin);
        } else if (idMueble != 0) {
            return ventaRepository.findByVentasMuebleIdAndFechaBetween(idMueble, fechaInicio, fechaFin);
        } else {
            return ventaRepository.findByFechaBetween(fechaInicio, fechaFin);
        }
    }

    public Venta getVentaById(Long id) {
        return ventaRepository.findById(id).orElse(null);
    }

    @Transactional
    public Venta createVenta(VentaDTO ventaDTO) {
        logger.info("Iniciando creación de venta con ID cliente: {}", ventaDTO.getIdCliente());
        logger.info("VentasMuebles en la ventaDTO: {}", ventaDTO.getVentasMuebles());
    // Crear objeto venta
        Venta venta = new Venta();
    
    // Verificar y obtener cliente
        Cliente cliente = clienteRepository.findById(ventaDTO.getIdCliente()).orElseThrow(() -> 
            new IllegalArgumentException("Cliente no encontrado con ID: " + ventaDTO.getIdCliente()));
        logger.info("Cliente encontrado con ID: {}", cliente.getId());

        venta.setCliente(cliente);
        venta.setFecha(ventaDTO.getFecha());
        venta.setPrecioTotal(ventaDTO.getPrecioTotal());
        venta.setMetodoPago(ventaDTO.getMetodoPago());

        if (ventaDTO.getVentasMuebles() == null || ventaDTO.getVentasMuebles().isEmpty()) {
            throw new IllegalArgumentException("La lista de muebles para la venta está vacía o es nula.");
        }
    
        logger.debug("Contenido de ventasMuebles en ventaDTO: {}", ventaDTO.getVentasMuebles());
    
        Set<Mueble> muebles = new HashSet<>();
        List<VentaMueble> ventasMuebles = new ArrayList<>();

        for (VentaMuebleDTO ventaMuebleDTO2 : ventaDTO.getVentasMuebles()) {
            logger.info("Procesando mueble para la venta: {}", ventaMuebleDTO2);
            VentaMueble ventaMueble = ventaMuebleService.createVentaMueble(ventaMuebleDTO2);
            logger.info("VentaMueble creado con ID: {}", ventaMueble.getId());
            ventasMuebles.add(ventaMueble);
            muebles.add(ventaMueble.getMueble());
    }
    logger.info("VentasMuebles creadas: {}", ventasMuebles.size());
    // Asignar ventasMuebles a la venta
    venta.setVentas(ventasMuebles);
    Venta savedVenta = ventaRepository.save(venta);
    logger.info("Venta creada y guardada con ID: {}", savedVenta.getId());

    // Actualizar cliente y muebles
    cliente.addVenta(savedVenta);
    clienteRepository.save(cliente);
    logger.info("Venta asignada al cliente con ID: {}", cliente.getId());

    for (Mueble mueble : muebles) {
        mueble.addVenta(savedVenta);
        muebleRepository.save(mueble);
    }

    // Asignar la venta a cada VentaMueble y actualizar
    for (VentaMueble ventaMueble : ventasMuebles) {
        ventaMueble.setVenta(savedVenta);
        ventaMuebleService.updateVentaMueble(ventaMueble.getId(), ventaMueble);
    }

    return savedVenta;
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