package PPyL.Muebleria.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PPyL.Muebleria.model.TipoDeMadera;


@Repository
public interface TipoDeMaderaRepository extends JpaRepository<TipoDeMadera, Long> {

    Optional<TipoDeMadera> findByNombreIgnoreCase(String nombre);

    TipoDeMadera findByNombre(String nombre);

    // Optional

    
}