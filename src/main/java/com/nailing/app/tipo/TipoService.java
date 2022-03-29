/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.tipo;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nailing.app.decoracion.Decoracion;

/**
 *
 * @author CANDELA
 */
@Service("tipoService")
public class TipoService {
    
    @Autowired
    private TipoRepository tiporepository;
    
    public Tipo addTipo(Tipo tipo){
        return tiporepository.save(tipo);
    }
    
    public Tipo findById(Long id){
        return tiporepository.findById(id).get();
    }
    
    public Iterable<Tipo> findAll(){
        return tiporepository.findAll();
    }
    
    public void removeTipo(Long id){
        Tipo tipo = findById(id);
        if(tipo != null){
            tiporepository.delete(tipo);
        }
    }
    
    public List<Tipo> findByCentro(Long id){
        return tiporepository.findByCentro(id);
    }
    public void removeTiposbyCentro(Long centroId) {
		List<Tipo> tipos = tiporepository.findByCentro(centroId);
		for (Tipo t : tipos) {
			removeTipo(t.getId());
		}
	}
}
