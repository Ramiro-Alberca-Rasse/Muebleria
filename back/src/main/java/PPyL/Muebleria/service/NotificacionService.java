package PPyL.Muebleria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PPyL.Muebleria.model.Notificacion;
import PPyL.Muebleria.repository.NotificacionRepository;

@Service
public class NotificacionService {
    
    @Autowired
    private NotificacionRepository notificacionRepository;

    public List<Notificacion> getAllNotificaciones() {
        return notificacionRepository.findAll();
    }

    public Notificacion getNotificacionById(Long id) {
        return notificacionRepository.findById(id).orElse(null);
    }

    public Notificacion saveNotificacion(Notificacion notificacion) {
        return notificacionRepository.save(notificacion);
    }

    public void deleteNotificacion(Long id) {
        notificacionRepository.deleteById(id);
    }

    public void deleteAllNotificaciones() {
        notificacionRepository.deleteAll();
    }

    public boolean hayNotificaciones() {
        return notificacionRepository.count() > 0;
    }
}