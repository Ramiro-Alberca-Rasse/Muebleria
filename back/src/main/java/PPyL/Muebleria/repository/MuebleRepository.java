package PPyL.Muebleria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PPyL.Muebleria.model.Mueble;

@Repository
public interface MuebleRepository extends JpaRepository<Mueble, Long> {
    List<Mueble> findByTipo(String Tipo);
}
