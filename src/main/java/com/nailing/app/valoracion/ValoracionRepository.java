/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nailing.app.valoracion;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author CANDELA
 */
public interface ValoracionRepository  extends CrudRepository<Valoracion, Serializable>{
       @Query("SELECT valoracion from Valoracion valoracion where valoracion.usuario.id = ?1")
        public List<Integer> findByUsuario(Long id);
        
         @Query("SELECT valoracion from Valoracion valoracion where valoracion.centro.id = :id")
        public List<Integer> findValoracionesByCentro(Long id);
}
