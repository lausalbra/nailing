/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.centro;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jaime
 */

@Service
public class CentroService {
    
    @Autowired
    private CentroRepository centroRepository;
    
    public Optional<Centro> findById(Long id){
        return centroRepository.findById(id);
    }
    
    public List<Centro> findAll(){
        return (List) centroRepository.findAll();
    }
    
    public void delete(Long id){
        Optional<Centro> centro = findById(id);
        if(centro.isPresent()){
            centroRepository.delete(centro.get());
        }
    }
    
    public Centro addCentro(Centro centro) {
	return centroRepository.save(centro);
    }
}
