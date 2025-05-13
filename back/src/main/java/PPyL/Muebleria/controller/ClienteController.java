package PPyL.Muebleria.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PPyL.Muebleria.dto.ClienteDTO;
import PPyL.Muebleria.dto.ClienteSimpleDTO;
import PPyL.Muebleria.dto.VentaDTO;
import PPyL.Muebleria.dto.VentaMuebleDTO;
import PPyL.Muebleria.model.Cliente;
import PPyL.Muebleria.repository.ClienteRepository;
import PPyL.Muebleria.service.ClienteService;

@RestController
@RequestMapping("api/clientes")
public class ClienteController {

    private static final Logger logger = LoggerFactory.getLogger(ClienteController.class);

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<ClienteSimpleDTO> getAllClientes() {
        return clienteService.getAllClientes().stream()
                .map(cliente -> {
                    ClienteSimpleDTO dto = new ClienteSimpleDTO();
                    dto.setId(cliente.getId());
                    dto.setNombre(cliente.getNombre());
                    dto.setApellido(cliente.getApellido());
                    dto.setCUIT(cliente.getCUIT());
                    dto.setDireccion(cliente.getDireccion());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/info")
public List<ClienteDTO> getAllClientesInfo() {
    return clienteService.getAllClientes().stream()
            .map(cliente -> {
                ClienteDTO dto = new ClienteDTO();
                dto.setId(cliente.getId());
                dto.setNombreCompleto(cliente.getNombre() + " " + cliente.getApellido());
                dto.setNombre(cliente.getNombre());
                dto.setApellido(cliente.getApellido());
                dto.setCUIT(cliente.getCUIT());
                dto.setDireccion(cliente.getDireccion());
                dto.setTelefono(cliente.getTelefono());
                dto.setEmail(cliente.getEmail());
                dto.setVentas(cliente.getVentas().stream().map(venta -> {
                    VentaDTO ventaDTO = new VentaDTO();
                    ventaDTO.setId(venta.getId());
                    ventaDTO.setIdCliente(cliente.getId());
                    ventaDTO.setNombreCliente(cliente.getNombre());
                    ventaDTO.setApellidoCliente(cliente.getApellido());
                    ventaDTO.setFecha(venta.getFecha());
                    ventaDTO.setPrecioTotal(venta.getPrecioTotal());
                    ventaDTO.setVentasMuebles(venta.getVentas().stream()
                            .map(ventaMueble -> new VentaMuebleDTO(ventaMueble))
                            .collect(Collectors.toList()));
                    // No incluir referencias circulares
                    return ventaDTO;
                }).collect(Collectors.toList()));
                return dto;
            })
            .collect(Collectors.toList());
}
    

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Long id) {
        Cliente cliente = clienteService.getClienteById(id);
        if (cliente != null) {
            return ResponseEntity.ok(cliente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Cliente createCliente(@RequestBody ClienteDTO cliente) {
        return clienteService.createCliente(cliente);
    }

    @PutMapping(value = "/update/{id}/{CUIT}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Cliente updateCliente(@PathVariable Long id, @RequestBody Cliente clienteDetails, @PathVariable String CUIT) {
        System.out.println("Updating cliente with id: " + id);
        logger.info(CUIT);
        return clienteRepository.findById(id).map(cliente -> {
            cliente.setNombre(clienteDetails.getNombre());
            cliente.setApellido(clienteDetails.getApellido());
            cliente.setDireccion(clienteDetails.getDireccion());
            cliente.setTelefono(clienteDetails.getTelefono());
            cliente.setEmail(clienteDetails.getEmail());
            cliente.setCUIT(CUIT);
            logger.info("Cliente updated successfully" + CUIT);
            return clienteRepository.save(cliente);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        if (clienteService.deleteCliente(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
