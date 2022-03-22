/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nailing.app.acabado;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Usuario
 */
public interface AcabadoRepository extends CrudRepository<Acabado, Long>{
    
    @Query("SELECT acabado from Acabado acabado where acabado.centro.id = ?1")
    public List<Acabado> findByCentro(Long id);
    
}
