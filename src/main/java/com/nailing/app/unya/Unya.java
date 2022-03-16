/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.unya;

import com.nailing.app.acabado.Acabado;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 *
 * @author Jacgarvel
 */
@Entity
@Table(name = "unya")
@EntityListeners(AuditingEntityListener.class)
public class Unya {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name = "dedo")
    private Dedo dedo;
    
    @Column(name = "tiempo")
    private Double tiempo;
    
    @Column(name = "coste")
    private Double coste;
    
    @ManyToOne
    @JoinColumn(name = "acabado_id")
    private Acabado acabado;

    public Long getId() {
        return id;
    }

    public Dedo getDedo() {
        return dedo;
    }

    public Double getTiempo() {
        return tiempo;
    }

    public Double getCoste() {
        return coste;
    }
    
    public Acabado getAcabado() {
        return acabado;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDedo(Dedo dedo) {
        this.dedo = dedo;
    }

    public void setTiempo(Double tiempo) {
        this.tiempo = tiempo;
    }

    public void setCoste(Double coste) {
        this.coste = coste;
    }

    public void setAcabado(Acabado acabado) {
        this.acabado = acabado;
    }
    
}
