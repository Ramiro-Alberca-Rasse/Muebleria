
package PPyL.Muebleria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PPyL.Muebleria.model.Venta;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {
}