package PPyL.Muebleria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "PPyL.Muebleria.model")
public class MuebleriaApplication {
    public static void main(String[] args) {
        SpringApplication.run(MuebleriaApplication.class, args);
    }
}
