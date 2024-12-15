package PPyL.Muebleria.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PPyL.Muebleria.dto.MuebleDTO;
import PPyL.Muebleria.model.Fabricante;
import PPyL.Muebleria.model.Mueble;
import PPyL.Muebleria.model.Tipo;
import PPyL.Muebleria.model.TipoDeMadera;
import PPyL.Muebleria.repository.FabricanteRepository;
import PPyL.Muebleria.repository.MuebleRepository;
import PPyL.Muebleria.repository.TipoDeMaderaRepository;
import PPyL.Muebleria.repository.TipoRepository;

@Service
public class MuebleService {

    @Autowired
    private MuebleRepository muebleRepository;

    @Autowired
    private TipoRepository tipoRepository;

    @Autowired
    private TipoDeMaderaRepository tipoDeMaderaRepository;

    @Autowired
    private FabricanteRepository fabricanteRepository;

    public List<MuebleDTO> listarMuebles(Tipo Tipo) {
        return muebleRepository.findByTipo(Tipo).stream()
            .map(mueble -> new MuebleDTO(mueble))
            .collect(Collectors.toList());
    }

    public MuebleDTO obtenerMueble(Long id) {
        Mueble mueble = muebleRepository.findById(id).orElseThrow(() -> new RuntimeException("Mueble no encontrado"));
        return new MuebleDTO(mueble);
    }

    public MuebleDTO crearMueble(Mueble mueble) {
        muebleRepository.save(mueble);
        return new MuebleDTO(mueble);
    }

    public MuebleDTO actualizarMueble(Long id, MuebleDTO muebleDTO) {
    // Buscar el mueble por ID
    Mueble mueble = muebleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Mueble no encontrado"));

    // Actualizar los datos del mueble utilizando los repositorios
    Tipo tipo = tipoRepository.findById(muebleDTO.getTipoId())
            .orElseThrow(() -> new RuntimeException("Tipo no encontrado"));
    TipoDeMadera tipoDeMadera = tipoDeMaderaRepository.findById(muebleDTO.getTipoMaderaId())
            .orElseThrow(() -> new RuntimeException("Tipo de madera no encontrado"));
    Fabricante fabricante = fabricanteRepository.findById(muebleDTO.getFabricanteId())
            .orElseThrow(() -> new RuntimeException("Fabricante no encontrado"));

    // Actualizar las propiedades del mueble
    mueble.setNombre(muebleDTO.getNombre());
    mueble.setPrecio(muebleDTO.getPrecio());
    mueble.setStock(muebleDTO.getStock());
    mueble.setTipo(tipo);
    mueble.setTipoMadera(tipoDeMadera);
    mueble.setFabricante(fabricante);

    // Guardar los cambios en el repositorio
    muebleRepository.save(mueble);

    // Retornar un nuevo DTO basado en el mueble actualizado
    return new MuebleDTO(mueble);
    }


    public void eliminarMueble(Long id) {
        muebleRepository.deleteById(id);
    }
    
    public void updateMuebleFromDTO(Mueble mueble, MuebleDTO dto) {
        mueble.setNombre(dto.getNombre());
        mueble.setPrecio(dto.getPrecio());
        mueble.setStock(dto.getStock());
        mueble.setTipo(tipoRepository.findById(dto.getTipoId()).orElseThrow(() -> new RuntimeException("Tipo no encontrado")));
        mueble.setTipoMadera(tipoDeMaderaRepository.findById(dto.getTipoMaderaId()).orElseThrow(() -> new RuntimeException("Tipo de Madera no encontrado")));
        mueble.setFabricante(fabricanteRepository.findById(dto.getFabricanteId()).orElseThrow(() -> new RuntimeException("Fabricante no encontrado")));
        muebleRepository.save(mueble);
    }
}