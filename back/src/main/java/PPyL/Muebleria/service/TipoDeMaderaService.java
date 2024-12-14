package PPyL.Muebleria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PPyL.Muebleria.model.TipoDeMadera;
import PPyL.Muebleria.repository.TipoDeMaderaRepository;

@Service
public class TipoDeMaderaService {
    @Autowired
    private TipoDeMaderaRepository tipoDeMaderaRepository;

    public void addTipoDeMadera(String nombre) {
        TipoDeMadera tipoDeMadera = new TipoDeMadera(nombre);
        tipoDeMaderaRepository.save(tipoDeMadera);
    }

    public List<TipoDeMadera> getTiposDeMadera() {
        return tipoDeMaderaRepository.findAll();
    }

    public TipoDeMadera getTipoDeMadera(String nombre) {
        return tipoDeMaderaRepository.findByNombre(nombre);
    }

    public TipoDeMadera crearTipoDeMadera(TipoDeMadera tipoDeMadera) {
        return tipoDeMaderaRepository.save(tipoDeMadera);
    }
}