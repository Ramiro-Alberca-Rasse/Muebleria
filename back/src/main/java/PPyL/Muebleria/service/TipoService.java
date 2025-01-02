package PPyL.Muebleria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PPyL.Muebleria.model.Tipo;
import PPyL.Muebleria.repository.TipoRepository;

@Service
public class TipoService {
    @Autowired
    private TipoRepository tipoRepository;

    public void addTipo(String nombre) {
        Tipo tipo = new Tipo(nombre);
        tipoRepository.save(tipo);
    }

    public List<Tipo> getTipos() {
        return tipoRepository.findAll();
    }

    public Tipo getTipo(String nombre) {
        return tipoRepository.findByNombre(nombre);
    }

    public Tipo crearTipo(Tipo tipo) {
        return tipoRepository.save(tipo);
    }

    public void deleteTipo(Long id) {
        tipoRepository.deleteById(id);
    }
}