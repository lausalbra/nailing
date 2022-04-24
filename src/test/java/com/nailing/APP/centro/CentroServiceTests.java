/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.APP.centro;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.nailing.app.centro.CentroService;

import java.time.LocalDate;

import com.nailing.app.AppApplication;
import com.nailing.app.centro.Centro;
import com.nailing.app.centro.Suscripcion;
import com.nailing.app.usuario.UsuarioService;
import org.junit.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 *
 * @author jaime
 */

@RunWith(SpringRunner.class)
@SpringBootTest(classes = AppApplication.class)
public class CentroServiceTests {
    
    @Autowired
    private CentroService centroService;
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Test
    public void shouldFindById(){
        assertNotNull(centroService.findById(1L).get());
    }
    
    @Test
    public void shouldFindAll(){
        assertEquals(centroService.findAll().size(),3);
    }
    
    @Test
    public void ShouldDeleteCentro(){
        centroService.delete(3L);
        assertEquals(centroService.findAll().size(),2);
    }
    
    @Test
    public void ShouldAddCentro(){
        
        Centro centro = new Centro("Nails by Claudia","https://i.ibb.co/qkFKLsm/F253-E9-DA-6780-4-A9-D-9-EAB-804784-BBEE21.jpg","Málaga",null,null,null,null,Suscripcion.BASIC,LocalDate.now(),150,true,"MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY");
        centroService.addCentro(centro);
        assertEquals(centroService.findAll().size(),4);
    }
    
    @Test
    public void ShouldAsociarCentroUsuario(){
        centroService.asociarCentroUsuario(usuarioService.findByUsuario("usuario1"), centroService.findById(1L).get());
        assertEquals(usuarioService.findByUsuario("usuario1").getCentro(),centroService.findById(1L).get());
    }
    
    @Test
    public void ShouldUpdateImage(){
        centroService.updateCentroImage(1L, "https://uridetest.com");
        assertEquals(centroService.findById(1L).get().getImagen(),"https://uridetest.com");
    }
    
}
