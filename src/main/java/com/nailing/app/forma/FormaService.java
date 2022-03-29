/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.forma;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nailing.app.decoracion.Decoracion;

/**
 *
 * @author jaime
 */

@Service
public class FormaService {
    @Autowired
    private FormaRepository formaRepository;

    public Forma addForma(Forma forma) {
		
    	return formaRepository.save(forma);
    }
	
//	encontrar base por su ID
    public Forma findById(Long id) {
	return formaRepository.findById(id).get();
    }
	
//	todas las bases
    public List<Forma> findAll(){
	return (List) formaRepository.findAll();
    }
	
//	borrar una base por su ID
    public void removeBase(Long id) {
	Forma forma = findById(id);
	if(forma!=null){
            formaRepository.delete(forma);
        }
    }
    public void removeFormabyCentro(Long centroId) {
		List<Forma> formas = formaRepository.findByCentro(centroId);
		for (Forma f : formas) {
			removeBase(f.getId());
		}
	}
//	encontrar las bases que posee el centro dado según el tipo seleccionado
    public List<Forma> findFormasByCentroBase(Long centroId) {	
        return formaRepository.findByCentro(centroId);
    }
}
