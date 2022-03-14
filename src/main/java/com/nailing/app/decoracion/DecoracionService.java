/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.decoracion;

import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service("decoracionService")
public class DecoracionService {
    
    @Autowired
    private DecoracionRepository decoracionRepository;
    
    public Decoracion addDecoracion(Decoracion decoracion){
        return decoracionRepository.save(decoracion);
    }
    
    public Decoracion findById(Long id){
        return decoracionRepository.findById(id).get();
    }
    
    public void removeDecoracion(Long id){
        Decoracion decoracion = findById(id);
        if(decoracion != null){
            decoracionRepository.delete(decoracion);
        }
    }
    
    public Collection<Decoracion> findAll(){
        return decoracionRepository.findAll();
    }
}
