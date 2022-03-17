/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.reserva;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jaime
 */

@Service
public class ReservaService {
    
    @Autowired
    private ReservaRepository reservaRepository;
    
    public Optional<Reserva> findById(Long id){
        return reservaRepository.findById(id);
    }
    
    public Iterable<Reserva> findAll(){
        return reservaRepository.findAll();
    }
    
    public void nuevaReserva(){
        
    }
    
    public void cancelaReserva(Long id){
        reservaRepository.deleteById(id);
    }
    
}
