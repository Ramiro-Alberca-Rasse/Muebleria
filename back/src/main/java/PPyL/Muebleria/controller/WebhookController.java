package PPyL.Muebleria.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/webhook")
public class WebhookController {

    @PostMapping
    public ResponseEntity<?> receiveNotification(@RequestBody Map<String, Object> notification) {
        System.out.println("Webhook recibido: " + notification);

        // Aquí puedes procesar el estado del pago y actualizar tu base de datos
        return ResponseEntity.ok("Webhook recibido");
    }
}
