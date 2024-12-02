
package PPyL.Muebleria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PPyL.Muebleria.model.TipoDeMadera;

@Repository
public interface TipoDeMaderaRepository extends JpaRepository<TipoDeMadera, Long> {
    List<TipoDeMadera> findAll();
    TipoDeMadera findByNombre(String nombre);
}