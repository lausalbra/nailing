/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.decoracion;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 *
 * @author Usuario
 */
@Entity
@Table(name = "decoracion")
@EntityListeners(AuditingEntityListener.class)
public class Decoracion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name = "nombre")
    @NotBlank
    private String nombre;
    
    @Column(name = "tiempo")
    @Positive
    private Double tiempo;
    
    @Column(name = "coste")
    @Positive
    private Double coste;

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public Double getTiempo() {
        return tiempo;
    }

    public Double getCoste() {
        return coste;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setTiempo(Double tiempo) {
        this.tiempo = tiempo;
    }

    public void setCoste(Double coste) {
        this.coste = coste;
    }
    
    
    
    

    
}
