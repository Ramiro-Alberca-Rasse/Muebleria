package PPyL.Muebleria;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import PPyL.Muebleria.repository.MuebleRepository;

@SpringBootTest
public class MuebleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private MuebleRepository muebleRepository;

    @Test
    public void testGetAllMuebles() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/muebles"))
               .andExpect(MockMvcResultMatchers.status().isOk());
    }

    // Agrega más pruebas según sea necesario
}
