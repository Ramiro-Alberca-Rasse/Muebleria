package PPyL.Muebleria.service;

import java.util.List;

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

    public List<Venta> getAllVentas() {
        return ventaRepository.findAll();
    }

    public Venta getVentaById(Long id) {
        return ventaRepository.findById(id).orElse(null);
    }

    public Venta createVenta(VentaDTO ventaDTO) {
        Venta venta = new Venta();
        // Asignar los valores de ventaDTO a venta

        Cliente cliente = clienteRepository.findById(ventaDTO.getIdCliente()).get();

        venta.setCliente(cliente);
        venta.setFecha(ventaDTO.getFecha());
        venta.setPrecioTotal(ventaDTO.getPrecioTotal());

        for(VentaMuebleDTO ventaMuebleDTO : ventaDTO.getVentasMuebles()) {
            VentaMueble ventaMueble = new VentaMueble();
            ventaMueble = ventaMuebleDTO.convertToEntity();
            venta.addVenta(ventaMueble);
        }
        
        cliente.addVenta(venta);
        clienteRepository.save(cliente);

        return ventaRepository.save(venta);
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