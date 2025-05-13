
package PPyL.Muebleria.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PPyL.Muebleria.model.Venta;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {

    List<Venta> findByClienteIdAndVentasMuebleIdAndFechaBetween(Long idCliente, Long idMueble, Date fechaInicio,
            Date fechaFin);

    List<Venta> findByClienteIdAndFechaBetween(Long idCliente, Date fechaInicio, Date fechaFin);

    List<Venta> findByFechaBetween(Date fechaInicio, Date fechaFin);

    List<Venta> findByVentasMuebleIdAndFechaBetween(Long idMueble, Date fechaInicio, Date fechaFin);

}