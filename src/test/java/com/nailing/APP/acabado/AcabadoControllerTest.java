package com.nailing.APP.acabado;

import com.nailing.app.AppApplication;
import com.nailing.app.acabado.AcabadoController;

import org.junit.jupiter.api.BeforeAll;
import org.junit.runner.RunWith;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AcabadoControllerTest {
    @Autowired
    private MockMvc mvc;

    @InjectMocks
    protected AcabadoController acabadoController;

    @BeforeAll
    public void setUp() throws Exception{
        mvc = MockMvcBuilders.standaloneSetup(acabadoController).build();
    }

    @Test
    @WithMockUser(authorities = {"ADMIN"})
    public void prueba() throws Exception{
        mvc.perform(
            MockMvcRequestBuilders.get("/acabados/all")
        ).andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.content().string("[\"BRILLO\",\"MATE\"]"));
    }
}
