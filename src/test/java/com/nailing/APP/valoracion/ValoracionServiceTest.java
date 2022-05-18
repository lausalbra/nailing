/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.APP.valoracion;

import com.nailing.app.valoracion.ValoracionService;
import com.nailing.app.valoracion.Valoracion;

import com.nailing.app.AppApplication;
import com.nailing.app.centro.CentroService;
import com.nailing.app.usuario.UsuarioService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
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
public class ValoracionServiceTest {
    
    @Autowired
    private ValoracionService valoracionService;
    
    @Autowired
    private CentroService centroService;
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Test
    public void shouldFindById(){
        assertEquals(1L,valoracionService.findById(1L).getId());
    }
    
    @Test
    public void shouldAddValoracion(){
        Map<String,String> valoracion = new HashMap();
        valoracion.put("valoracionUsuario", "3");
        valoracion.put("centro", "1");
        valoracion.put("usuario", "1");
        Valoracion valoracionO = valoracionService.addValoracion(valoracion);
        assertEquals(valoracionO,valoracionService.findById(valoracionO.getId()));
    }
    
    @Test
    public void shouldFindAll(){
        Map<String,String> valoracion = new HashMap();
        valoracion.put("valoracionUsuario", "3");
        valoracion.put("centro", "1");
        valoracion.put("usuario", "1");
        Valoracion valoracionO = valoracionService.addValoracion(valoracion);
        
        List<Valoracion> nv = new ArrayList();
        for (Iterator<Valoracion> it = valoracionService.findAll().iterator(); it.hasNext();) {
            nv.add(it.next());
        }
        assertTrue(nv.size()>1);
        assertTrue(nv.contains(valoracionO));
    }
    
    @Test
    public void shouldUpdate(){
        Valoracion valoracion = valoracionService.findById(1L);
        valoracion.setValoracionUsuario(1);
        Valoracion valoracionO = valoracionService.updateValoracion(valoracion);
        
        assertEquals(valoracionO.getValoracionUsuario(),valoracion.getValoracionUsuario());
    }
    
    @Test
    public void shouldDelete(){
        Map<String,String> valoracion = new HashMap();
        valoracion.put("valoracionUsuario", "3");
        valoracion.put("centro", "1");
        valoracion.put("usuario", "1");
        Valoracion valoracionO = valoracionService.addValoracion(valoracion);
        
        Integer nv = 0;
        for (Iterator<Valoracion> it = valoracionService.findAll().iterator(); it.hasNext();) {
            it.next();
            nv++;
        }
        
        valoracionService.delete(valoracionO);
        
        Integer nvn = 0;
        List<Valoracion> lv = new ArrayList();
        for (Iterator<Valoracion> it = valoracionService.findAll().iterator(); it.hasNext();) {
            lv.add(it.next());
            nvn++;
        }
        assertTrue(nv==nvn+1);
        assertTrue(!lv.contains(valoracionO));
    }
    
}
