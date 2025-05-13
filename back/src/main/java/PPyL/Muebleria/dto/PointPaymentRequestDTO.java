// filepath: /c:/Users/cuent/OneDrive/Documentos/GitHub/Muebleria/back/src/main/java/PPyL/Muebleria/dto/PointPaymentRequestDTO.java
package PPyL.Muebleria.dto;

public class PointPaymentRequestDTO {
    private Long monto;
    private String descripcion;
    private String email;

    // Getters y setters

    public Long getMonto() {
        return monto;
    }

    public void setMonto(Long monto) {
        this.monto = monto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}