package PPyL.Muebleria.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PPyL.Muebleria.model.Tipo;

@Repository
public interface TipoRepository extends JpaRepository<Tipo, Long> {

    Optional<Tipo> findByNombreIgnoreCase(String nombre);

    Tipo findByNombre(String nombre);

    Tipo findById(long id);
    
}