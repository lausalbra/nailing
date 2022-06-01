/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.nailing.app.centro;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author jaime
 */
@Repository
public interface CentroRepository extends CrudRepository<Centro, Serializable>{

    @Override
    @Query("Select c from Centro c order by c.valoracionMedia desc")
    public List<Centro> findAll();
}
