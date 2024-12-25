package PPyL.Muebleria.dto;


public class ActualizarMuebleDTO {
    private MuebleDTO muebleDTO;
    private Boolean checkbox;

    // Getters y setters
    public MuebleDTO getMuebleDTO() {
        return muebleDTO;
    }

    public void setMuebleDTO(MuebleDTO muebleDTO) {
        this.muebleDTO = muebleDTO;
    }

    public Boolean getCheckbox() {
        return checkbox;
    }

    public void setCheckbox(Boolean checkbox) {
        this.checkbox = checkbox;
    }
}