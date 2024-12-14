package PPyL.Muebleria.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PPyL.Muebleria.model.Fabricante;
import PPyL.Muebleria.repository.FabricanteRepository;

@Service
public class FabricanteService {

    @Autowired
    private FabricanteRepository fabricanteRepository;

    public Fabricante crearFabricante(Fabricante fabricante) {
        return fabricanteRepository.save(fabricante);
    }
}
