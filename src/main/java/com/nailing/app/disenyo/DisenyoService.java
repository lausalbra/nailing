/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.disenyo;

import com.nailing.app.base.Base;
import com.nailing.app.base.BaseRepository;
import com.nailing.app.tamanyo.Tamanyo;
import com.nailing.app.tamanyo.TamanyoRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author CANDELA
 */
@Service("disenyoService")
public class DisenyoService {
    @Autowired
    private DisenyoRepository disenyorepository;
    @Autowired
    private TamanyoRepository tamanyorepository;
    @Autowired
    private BaseRepository baserepository;

    public Disenyo addDisenyo(Disenyo disenyo){
        return disenyorepository.save(disenyo);
    }

    public Disenyo findById(Long id){
        return disenyorepository.findById(id).get();
    }

    public Iterable<Disenyo> findAll(){
        return disenyorepository.findAll();
    }

    public void removeDisenyo(Long id){
        Disenyo disenyo = findById(id);
        if(disenyo != null){
            disenyorepository.delete(disenyo);
        }
    }
    
    public List<Disenyo> findDisenyosByCentroTamanyo(Long tamanyoId, Long centroId){
        Tamanyo tamanyo = tamanyorepository.findById(tamanyoId);
        List<Disenyo> result = new ArrayList<>();
        List<NombreDisenyo> disenyos;
        List<Disenyo> disenyosCentro;
        
        switch(tamanyo.getNombre()){
            case XXS: case XS: case S: case M: case L: case XL: case XXL: case RELLENO:
                disenyos = Arrays.asList(NombreDisenyo.BABY_BOOMER,NombreDisenyo.DEGRADADO_COLOR,NombreDisenyo.ENCAPSULADO,NombreDisenyo.FRANCESA_REVERSA, NombreDisenyo.LISAS);
                disenyosCentro = disenyorepository.findByCentro(centroId);
                for(Disenyo d: disenyosCentro){
                    if(disenyos.contains(d.getNombre()))
                        result.add(d);
                }
                break;
        }
        return result;
    }
    
        public List<Disenyo> findDisenyosByCentroBase(Long BaseId, Long centroId){
        Base base = baserepository.findById(BaseId);
        List<Disenyo> result = new ArrayList<>();
        List<NombreDisenyo> disenyos;
        List<Disenyo> disenyosCentro;
        
        switch(base.getNombre()){
            case SEMIPERMANENTE: case SEMIPERMANENTE_REFUERZO: 
                disenyos = Arrays.asList(NombreDisenyo.LISAS);
                disenyosCentro = disenyorepository.findByCentro(centroId);
                for(Disenyo d: disenyosCentro){
                    if(disenyos.contains(d.getNombre()))
                        result.add(d);
                }
                break;
        }
        return result;
    }
}
