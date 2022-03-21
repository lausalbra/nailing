/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.acabado;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service("acabadoService")
public class AcabadoService {
    
    @Autowired
    private AcabadoRepository acabadoRepository;
    
    public Acabado addAcabado(Acabado acabado){
        return acabadoRepository.save(acabado);
    }
    
    public Acabado findById(Long id){
        return acabadoRepository.findById(id).get();
    }
    
    public Iterable<Acabado> findAll(){
        return acabadoRepository.findAll();
    }
    
    public void removeAcabado(Long id){
        Acabado acabado = findById(id);
        if(acabado != null){
            acabadoRepository.delete(acabado);
        }
    }
    
    public List<Acabado> findAcabadoByCentro( Long centroId){
        return acabadoRepository.findByCentro(centroId);        
    }
}
