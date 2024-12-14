package PPyL.Muebleria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import PPyL.Muebleria.model.Fabricante;

@Repository
public interface FabricanteRepository extends JpaRepository<Fabricante, Long> {
    Optional<Fabricante> findByNombreIgnoreCase(String nombre);

    Optional<Fabricante> findById(Long id);
}
