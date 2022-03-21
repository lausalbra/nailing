/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.cita;

import com.nailing.app.acabado.Acabado;
import com.nailing.app.base.Base;
import com.nailing.app.decoracion.Decoracion;
import com.nailing.app.decoracion.DecoracionService;
import com.nailing.app.disenyo.Disenyo;
import com.nailing.app.disenyo.DisenyoService;
import java.util.Collection;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service("citaService")
public class CitaService {
    
    @Autowired
    private CitaRepository citaRepository;
    
    @Autowired
    private DecoracionService decoracionService;
    
    @Autowired
    private DisenyoService disenyoService;
    
    public Cita addCita(Map<String,String> ids){
        Decoracion deco = decoracionService.findById(Long.parseLong(ids.get("decoracion_id")));
        Disenyo dis = disenyoService.findById(Long.parseLong(ids.get("disenyo_id")));
        Base base = decoracionService.findById(Long.parseLong(ids.get("decoracion_id")));
        Acabado acabado = decoracionService.findById(Long.parseLong(ids.get("decoracion_id")));
        Decoracion centro = decoracionService.findById(Long.parseLong(ids.get("decoracion_id")));
        Decoracion tamanyo = decoracionService.findById(Long.parseLong(ids.get("decoracion_id")));
        Decoracion forma = decoracionService.findById(Long.parseLong(ids.get("decoracion_id")));
        Decoracion tipo = decoracionService.findById(Long.parseLong(ids.get("decoracion_id")));
    }
    
    public Cita findById(Long id){
        return citaRepository.findById(id).get();
    }
    
    public Iterable<Cita> findAll(){
        return citaRepository.findAll();
    }
    
    public void removeUnya(Long id){
        Cita unya = findById(id);
        if(unya != null){
            citaRepository.delete(unya);
        }
    }
}
