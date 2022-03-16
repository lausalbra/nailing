/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.tipo;

import java.util.Objects;
import javax.persistence.EntityListeners;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
/**
 *
 * @author CANDELA
 */
@Entity
@Table(name = "tipo")
@EntityListeners(AuditingEntityListener.class)
public class Tipo {
    
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    @Column (name="id")
    private Long id;
    
    @Column(name = "nombre")
    @Size(max=1000)
    @NotBlank
    private String nombre;
    
    @Column(name = "tiempo")
    @NotBlank
    private Double tiempo;
    
    @Column(name = "coste")
    @NotBlank
    private Double coste;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getTiempo() {
        return tiempo;
    }

    public void setTiempo(Double tiempo) {
        this.tiempo = tiempo;
    }

    public Double getCoste() {
        return coste;
    }

    public void setCoste(Double coste) {
        this.coste = coste;
    }

    public Tipo(Long id, String nombre, Double tiempo, Double coste) {
        this.id = id;
        this.nombre = nombre;
        this.tiempo = tiempo;
        this.coste = coste;
    }

    public Tipo() {
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 97 * hash + Objects.hashCode(this.id);
        hash = 97 * hash + Objects.hashCode(this.nombre);
        hash = 97 * hash + Objects.hashCode(this.tiempo);
        hash = 97 * hash + Objects.hashCode(this.coste);
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
        final Tipo other = (Tipo) obj;
        if (!Objects.equals(this.nombre, other.nombre)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.tiempo, other.tiempo)) {
            return false;
        }
        return Objects.equals(this.coste, other.coste);
    }

    @Override
    public String toString() {
        return "Tipo{" + "id=" + id + ", nombre=" + nombre + ", tiempo=" + tiempo + ", coste=" + coste + '}';
    }
    
    
}
