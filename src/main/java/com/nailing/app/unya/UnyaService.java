/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.unya;

import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service("unyaService")
public class UnyaService {
    
    @Autowired
    private UnyaRepository unyaRepository;
    
    public Unya addUnya(Unya unya){
        return unyaRepository.save(unya);
    }
    
    public Unya findById(Long id){
        return unyaRepository.findById(id).get();
    }
    
    public Collection<Unya> findAll(){
        return unyaRepository.findAll();
    }
    
    public void removeUnya(Long id){
        Unya unya = findById(id);
        if(unya != null){
            unyaRepository.delete(unya);
        }
    }
}
