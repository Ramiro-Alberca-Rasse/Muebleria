package PPyL.Muebleria.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PPyL.Muebleria.model.Mueble;
import PPyL.Muebleria.model.Tipo;

@Repository
public interface MuebleRepository extends JpaRepository<Mueble, Long> {
    List<Mueble> findByTipo(Tipo Tipo);

    Optional<Mueble> findByNombre(String Nombre);

}
