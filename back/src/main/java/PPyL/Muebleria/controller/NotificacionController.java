package PPyL.Muebleria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import PPyL.Muebleria.model.Mueble;
import PPyL.Muebleria.service.VentaMuebleService;


@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {

    @Autowired
    private VentaMuebleService ventaMuebleService;

    @GetMapping
    public SseEmitter subscribe() {
        return ventaMuebleService.subscribe();
    }

    @PostMapping("/prueba")
    public ResponseEntity<String> enviarNotificacionPrueba() {
        Mueble mueble = new Mueble();
        mueble.setNombre("Mueble de Prueba");
        mueble.setStock(5); // Stock bajo para la prueba
        ventaMuebleService.notificarStockBajo(mueble);
        return ResponseEntity.ok("Notificación de prueba enviada");
    }
}