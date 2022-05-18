/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.APP.cita;

import com.nailing.app.cita.CitaService;

import com.nailing.app.AppApplication;
import com.nailing.app.cita.Cita;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author jaime
 */

@SpringBootTest(classes = AppApplication.class)
public class CitaServiceTest {
    
    @Autowired
    private CitaService citaService;
    
    @Test
    public void shouldFindById(){
        assertEquals(1L,citaService.findById(1L).getId());
    }
    
    @Test
    public void shouldFindByUsuario(){
        assertNotNull(citaService.findByUsuario(1L));
    }
    
    @Test
    public void ShouldAddCita(){
        Integer nc = 0;
        for (Iterator<Cita> it = citaService.findAll().iterator(); it.hasNext();) {
            it.next();
            nc++;
        }
        
        Map<String,String> cita = new HashMap<>();
        cita.put("usuario", "1");
        cita.put("centro", "1");
        cita.put("precio", "50.2");
        cita.put("tiempo", "25");
        cita.put("tipo", "1");
        cita.put("base", "1");
        cita.put("forma", "1");
        cita.put("tamanyo", "1");
        cita.put("disenyo", "1");
        cita.put("decoracion", "1");
        cita.put("acabado", "1");
        cita.put("fecha", "2032-05-22 10:30");
        cita.put("disenyo", "1");
        
        citaService.addCita(cita);
        
        Integer ncn = 0;
        for (Iterator<Cita> it = citaService.findAll().iterator(); it.hasNext();) {
            it.next();
            ncn++;
        }
        
        assertEquals(ncn,nc+1);   
    }
    
    @Test
    public void ShouldNotAddCita(){
        Integer nc = 0;
        for (Iterator<Cita> it = citaService.findAll().iterator(); it.hasNext();) {
            it.next();
            nc++;
        }
        
        Map<String,String> cita = new HashMap<>();
        cita.put("usuario", null);
        cita.put("centro", "1");
        cita.put("precio", "50.2");
        cita.put("tiempo", "25");
        cita.put("tipo", "1");
        cita.put("base", "1");
        cita.put("forma", "1");
        cita.put("tamanyo", "1");
        cita.put("disenyo", "1");
        cita.put("decoracion", "1");
        cita.put("acabado", "1");
        cita.put("fecha", "2032-05-22 10:30");
        cita.put("disenyo", "1");
        
        
        assertThrows(IllegalArgumentException.class, () -> citaService.addCita(cita));
    }

    @Test
    public void shouldFindAll(){
        assertNotNull(citaService.findAll());
    }
    
    @Test
    public void shouldCitasPendientes(){
        assertNotNull(citaService.findCitasPendientes(1L, LocalDateTime.now().plusNanos(12L)));
    }
    
    @Test
    public void shouldremoveCita(){
        Integer nc = 0;
        for (Iterator<Cita> it = citaService.findAll().iterator(); it.hasNext();) {
            it.next();
            nc++;
        }
        citaService.removeCita(3L);
        
        Integer ncn = 0;
        for (Iterator<Cita> it = citaService.findAll().iterator(); it.hasNext();) {
            it.next();
            ncn++;
        }
        assertEquals(ncn,nc-1); 
    }
    
    @Test
    public void shouldremoveCitaUsuario(){
        Integer nc = citaService.findByUsuario(1L).size();
        citaService.removeCita(citaService.findByUsuario(1L).get(0).getId());
        
        Integer ncn = citaService.findByUsuario(1L).size();
        assertEquals(ncn,nc-1); 
    }
    
    @Test
    public void findByCentroUsuarioTest(){
        Integer citas = citaService.findByCentro(1L,3L).size();
        
        Map<String,String> cita = new HashMap<>();
        cita.put("usuario", "3");
        cita.put("centro", "1");
        cita.put("precio", "50.2");
        cita.put("tiempo", "25");
        cita.put("tipo", "1");
        cita.put("base", "1");
        cita.put("forma", "1");
        cita.put("tamanyo", "1");
        cita.put("disenyo", "1");
        cita.put("decoracion", "1");
        cita.put("acabado", "1");
        cita.put("fecha", "2032-05-22 10:30");
        cita.put("disenyo", "1");
        
        citaService.addCita(cita);
        
        Integer citas1 = citaService.findByCentro(1L,3L).size();
        
        assertTrue(citas1==citas+1);
    }
    
    @Test
    public void findDisponiblesTest(){
            List<String> disponibles = citaService.findDisponibles("2022-12-12 12",30,4L);
            assertTrue(disponibles!=null);
            assertTrue(!disponibles.isEmpty());
    }

    @Test
    public void shouldRemoveCitaByUser(){
        Map<String,String> cita = new HashMap<>();
        cita.put("usuario", "1");
        cita.put("centro", "1");
        cita.put("precio", "50.2");
        cita.put("tiempo", "25");
        cita.put("tipo", "1");
        cita.put("base", "1");
        cita.put("forma", "1");
        cita.put("tamanyo", "1");
        cita.put("disenyo", "1");
        cita.put("decoracion", "1");
        cita.put("acabado", "1");
        cita.put("fecha", "2032-05-22 10:30");
        cita.put("disenyo", "1");
        
        Cita citaResult = citaService.addCita(cita);

        List<Cita> listaCon = citaService.findByUsuario(1L);
        citaService.removeCitaByUser(1L, citaResult.getId());
        List<Cita> listaSin = citaService.findByUsuario(1L);
        assertNotEquals(listaCon, listaSin);
    }
    
}
