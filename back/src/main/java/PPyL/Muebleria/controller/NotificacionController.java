package PPyL.Muebleria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PPyL.Muebleria.model.Notificacion;
import PPyL.Muebleria.service.NotificacionService;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {
    @Autowired
    private NotificacionService notificacionService;

    @GetMapping
    public List<Notificacion> getAllNotificaciones() {
        return notificacionService.getAllNotificaciones();
    }

    @GetMapping("/{id}")
    public Notificacion getNotificacionById(@PathVariable Long id) {
        return notificacionService.getNotificacionById(id);
    }

    @PostMapping
    public Notificacion createNotificacion(@RequestBody Notificacion notificacion) {
        return notificacionService.saveNotificacion(notificacion);
    }

    @DeleteMapping("/{id}")
    public void deleteNotificacion(@PathVariable Long id) {
        notificacionService.deleteNotificacion(id);
    }

    @DeleteMapping
    public void deleteAllNotificaciones() {
        notificacionService.deleteAllNotificaciones();
    }

    @GetMapping("/hayNotificaciones")
    public boolean hayNotificaciones() {
        boolean respuesta = notificacionService.hayNotificaciones();
        System.out.println("Respuesta de hayNotificaciones: " + respuesta); // Log de la respuesta
        return respuesta;
    }
}