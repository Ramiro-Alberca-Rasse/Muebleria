package PPyL.Muebleria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PPyL.Muebleria.model.CambioStock;

@Repository
public interface CambioStockRepository extends JpaRepository<CambioStock, Long> {
    List<CambioStock> findByMuebleId(Long id);
    CambioStock findByMuebleIdAndPrimerCambioTrue(Long id);

    CambioStock findByMuebleIdAndVentaMuebleId(Long muebleId, Long ventaMuebleId);

}
