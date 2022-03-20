/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.unya;

import com.nailing.app.decoracion.Decoracion;
import com.nailing.app.acabado.Acabado;
import com.nailing.app.disenyo.Disenyo;
import com.nailing.app.tipo.Tipo;
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

import com.nailing.app.base.Base;
import java.util.Objects;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

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
    
    @Column(name = "tiempo")
    @Positive
    private Integer tiempo;
    
    @Column(name = "coste")
    @PositiveOrZero
    private Double coste;
    
    @ManyToOne
    @JoinColumn(name = "decoracion_id")
    private Decoracion decoracion;

    @ManyToOne
    @JoinColumn(name = "acabado_id")
    private Acabado acabado;

    @ManyToOne
    @JoinColumn(name="base_id")
    private Base base;

    @ManyToOne
    @JoinColumn(name = "tipo_id")
    private Tipo tipo;

    @ManyToOne
    @JoinColumn(name = "disenyo_id")
    private Disenyo disenyo;

    public Long getId() {
        return id;
    }

    public Integer getTiempo() {
        return tiempo;
    }

    public Double getCoste() {
        return coste;
    }

    public Decoracion getDecoracion() {
        return decoracion;
    }

    public Acabado getAcabado() {
        return acabado;
    }

    public Base getBase() {
        return base;
    }

    public Tipo getTipo() {
        return tipo;
    }

    public Disenyo getDisenyo() {
        return disenyo;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTiempo(Integer tiempo) {
        this.tiempo = tiempo;
    }

    public void setCoste(Double coste) {
        this.coste = coste;
    }

    public void setDecoracion(Decoracion decoracion) {
        this.decoracion = decoracion;
    }

    public void setAcabado(Acabado acabado) {
        this.acabado = acabado;
    }

    public void setBase(Base base) {
        this.base = base;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }

    public void setDisenyo(Disenyo disenyo) {
        this.disenyo = disenyo;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 61 * hash + Objects.hashCode(this.id);
        hash = 61 * hash + Objects.hashCode(this.tiempo);
        hash = 61 * hash + Objects.hashCode(this.coste);
        hash = 61 * hash + Objects.hashCode(this.decoracion);
        hash = 61 * hash + Objects.hashCode(this.acabado);
        hash = 61 * hash + Objects.hashCode(this.base);
        hash = 61 * hash + Objects.hashCode(this.tipo);
        hash = 61 * hash + Objects.hashCode(this.disenyo);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Unya other = (Unya) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.tiempo, other.tiempo)) {
            return false;
        }
        if (!Objects.equals(this.coste, other.coste)) {
            return false;
        }
        if (!Objects.equals(this.decoracion, other.decoracion)) {
            return false;
        }
        if (!Objects.equals(this.acabado, other.acabado)) {
            return false;
        }
        if (!Objects.equals(this.base, other.base)) {
            return false;
        }
        if (!Objects.equals(this.tipo, other.tipo)) {
            return false;
        }
        return Objects.equals(this.disenyo, other.disenyo);
    }

    @Override
    public String toString() {
        return "Unya{" + "id=" + id + ", tiempo=" + tiempo + ", coste=" + coste + ", decoracion=" + decoracion + ", acabado=" + acabado + ", base=" + base + ", tipo=" + tipo + ", disenyo=" + disenyo + '}';
    }

}