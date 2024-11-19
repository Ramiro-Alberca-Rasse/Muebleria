package PPyL.Muebleria.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PPyL.Muebleria.dto.MuebleDTO;
import PPyL.Muebleria.model.Mueble;
import PPyL.Muebleria.repository.MuebleRepository;

@Service
public class MuebleService {

    @Autowired
    private MuebleRepository muebleRepository;

    public List<MuebleDTO> listarMuebles(String categoria) {
        return muebleRepository.findByCategoria(categoria).stream()
            .map(mueble -> new MuebleDTO(mueble))
            .collect(Collectors.toList());
    }

    public MuebleDTO obtenerMueble(Long id) {
        Mueble mueble = muebleRepository.findById(id).orElseThrow(() -> new RuntimeException("Mueble no encontrado"));
        return new MuebleDTO(mueble);
    }

    public MuebleDTO crearMueble(MuebleDTO muebleDTO) {
        Mueble mueble = muebleDTO.toEntity();
        muebleRepository.save(mueble);
        return new MuebleDTO(mueble);
    }

    public MuebleDTO actualizarMueble(Long id, MuebleDTO muebleDTO) {
        Mueble mueble = muebleRepository.findById(id).orElseThrow(() -> new RuntimeException("Mueble no encontrado"));
        mueble.updateFromDTO(muebleDTO);
        muebleRepository.save(mueble);
        return new MuebleDTO(mueble);
    }

    public void eliminarMueble(Long id) {
        muebleRepository.deleteById(id);
    }
}
