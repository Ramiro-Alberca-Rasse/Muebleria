
package PPyL.Muebleria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PPyL.Muebleria.model.Tipo;

@Repository
public interface TipoRepository extends JpaRepository<Tipo, Long> {
    List<Tipo> findAll();
    Tipo findByNombre(String nombre);
}