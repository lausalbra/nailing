/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.centro;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nailing.app.acabado.AcabadoService;
import com.nailing.app.base.BaseService;
import com.nailing.app.decoracion.DecoracionService;
import com.nailing.app.disenyo.DisenyoService;
import com.nailing.app.forma.FormaService;
import com.nailing.app.tamanyo.TamanyoService;
import com.nailing.app.tipo.TipoService;

/**
 *
 * @author jaime
 */

@Service
public class CentroService {
    
    @Autowired
    private CentroRepository centroRepository;
    @Autowired
    private AcabadoService acabSer;
    @Autowired
    private BaseService basSer;
    @Autowired
    private DecoracionService decSer;
    @Autowired
    private DisenyoService disSer;
    @Autowired 
    private FormaService forSer;
    @Autowired
    private TamanyoService tamSer;
    @Autowired
    private TipoService tipoSer;
    public Optional<Centro> findById(Long id){
        return centroRepository.findById(id);
    }
    
    public List<Centro> findAll(){
        return (List) centroRepository.findAll();
    }
    
    public void delete(Long id){
        Optional<Centro> centro = findById(id);
        if(centro.isPresent()){
        	acabSer.removeAcabadosbyCentro(id);
        	basSer.removeBasesbyCentro(id);
        	decSer.removeDecoracionesbyCentro(id);
        	disSer.removeDisenyosbyCentro(id);
        	forSer.removeFormabyCentro(id);
        	tamSer.removeTamanyobyCentro(id);
        	tipoSer.removeTiposbyCentro(id);
            centroRepository.delete(centro.get());
        }
    }
    
    public Centro addCentro(Centro centro) {
	return centroRepository.save(centro);
    }

}
