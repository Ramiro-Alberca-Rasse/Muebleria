package PPyL.Muebleria.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PPyL.Muebleria.model.Fabricante;

@Repository
public interface FabricanteRepository extends JpaRepository<Fabricante, Long> {
    Optional<Fabricante> findByNombreIgnoreCase(String nombre);

    @SuppressWarnings("null")
    @Override
    Optional<Fabricante> findById(Long id);
}
