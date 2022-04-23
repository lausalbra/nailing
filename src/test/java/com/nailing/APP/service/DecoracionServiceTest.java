package com.nailing.APP.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;

import com.nailing.app.AppApplication;
import com.nailing.app.centro.Centro;
import com.nailing.app.centro.CentroService;
import com.nailing.app.centro.Suscripcion;
import com.nailing.app.decoracion.Decoracion;
import com.nailing.app.decoracion.DecoracionService;
import com.nailing.app.decoracion.NombreDecoracion;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = AppApplication.class)
public class DecoracionServiceTest {
    
    @Autowired
    private DecoracionService decoracionService;
    @Autowired
    private CentroService centroService;

    @Test
    public void shouldInsertDecoracion(){
        Centro centro = new Centro();
        centro.setNombre("nombre");
        centro.setImagen("imagen");
        centro.setSuscripcion(Suscripcion.BASIC);
        centro.setProvincia("Sevilla");
        centro.setDiasDisponible("MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY");
        centro.setUltimaSuscripcion(LocalDate.now());
        centro.setCreditosrestantes(100);
        centro.setPagado(true);
        this.centroService.addCentro(centro);

        Decoracion deco = new Decoracion();
        deco.setId(1L);
        deco.setNombre(NombreDecoracion.BURBUJAS);
        deco.setTiempo(23);
        deco.setCoste(12.);
        deco.setCentro(centro);
        decoracionService.addDecoracion(deco);
        assertNotNull(decoracionService.findById(1L));

        
    }
}
