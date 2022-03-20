/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.forma;

import com.nailing.app.base.Base;
import com.nailing.app.base.BaseService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jaime
 */

@Service
public class FormaService {
    @Autowired
    private FormaRepository formaRepository;
    @Autowired
    private BaseService baseService;
	
//	guardar/editar
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
	
//	encontrar las bases que posee el centro dado según el tipo seleccionado
    public List<Forma> findFormasByCentroBase(Long baseId, Long centroId) {	
        List<Forma> result = formaRepository.findByCentro(centroId);
	return result;
    }
}
