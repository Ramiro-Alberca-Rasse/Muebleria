package PPyL.Muebleria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PPyL.Muebleria.model.Notificacion;

@Repository

public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {
    
}
