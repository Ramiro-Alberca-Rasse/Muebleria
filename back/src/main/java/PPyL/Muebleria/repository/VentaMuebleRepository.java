
package PPyL.Muebleria.repository;

import PPyL.Muebleria.model.VentaMueble;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaMuebleRepository extends JpaRepository<VentaMueble, Long> {
}