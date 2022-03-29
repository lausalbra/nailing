/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.decoracion;

import com.nailing.app.base.Base;
import com.nailing.app.disenyo.Disenyo;
import com.nailing.app.disenyo.DisenyoRepository;
import com.nailing.app.disenyo.NombreDisenyo;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
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
    
    @Autowired
    private DisenyoRepository disenyoRepository;
    
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
    
    public Iterable<Decoracion> findAll(){
        return decoracionRepository.findAll();
    }
    public void removeDecoracionesbyCentro(Long centroId) {
		List<Decoracion> decoraciones = decoracionRepository.findByCentro(centroId);
		for (Decoracion d : decoraciones) {
			removeDecoracion(d.getId());
		}
	}
    public List<Decoracion> findDecoracionByCentroDisenyo(Long disenyoId, Long centroId){
        Optional<Disenyo> disenyo = disenyoRepository.findById(disenyoId);
        List<Decoracion> result = new ArrayList<>();
        List<NombreDecoracion> decoraciones;
        List<Decoracion> decoracionesCentro;
        
        if(disenyo.get().getNombre().equals(NombreDisenyo.LISAS)){
            result = decoracionRepository.findByCentro(centroId);
            return result;
        }else{
            decoraciones = Arrays.asList(NombreDecoracion.DIBUJO,NombreDecoracion.DISNEY_COLOR,
                    NombreDecoracion.DISNEY_BOCETO,NombreDecoracion.TRANSFER_FOIL,NombreDecoracion.PIEDRAS,
                    NombreDecoracion.PIERCING,NombreDecoracion.PEGATINAS,NombreDecoracion.STANPING,NombreDecoracion.PAN_DE_ANGEL);
            decoracionesCentro = decoracionRepository.findByCentro(centroId);
            for(Decoracion d: decoracionesCentro){
                if(decoraciones.contains(d.getNombre())){
                    result.add(d);
                }
            }
        }
        return result;
    }
}
