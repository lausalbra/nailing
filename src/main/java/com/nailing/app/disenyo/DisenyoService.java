/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.disenyo;

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
}
