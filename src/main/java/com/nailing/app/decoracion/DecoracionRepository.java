/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nailing.app.decoracion;

import java.util.Collection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Usuario
 */
public interface DecoracionRepository extends CrudRepository<Decoracion, Long>{
    
    @Query("SELECT * FROM decoracion")
    public Collection<Decoracion> findAll();
    
}
