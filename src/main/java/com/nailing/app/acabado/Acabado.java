/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.acabado;

import com.nailing.app.unya.Unya;
import java.util.Objects;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 *
 * @author Usuario
 */
@Entity
@Table(name="acabado")
@EntityListeners(AuditingEntityListener.class)
public class Acabado {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name = "nombre")
    @NotBlank
    private String nombre;
    
    @Column(name = "tiempo")
    @Positive
    private Integer tiempo;
    
    @Column(name = "coste")
    @Positive
    private Double coste;
    
    @OneToMany(mappedBy = "acabado")
    private Set<Unya> unyas;

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public Integer getTiempo() {
        return tiempo;
    }

    public Double getCoste() {
        return coste;
    }

    public Set<Unya> getUnyas() {
        return unyas;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setTiempo(Integer tiempo) {
        this.tiempo = tiempo;
    }

    public void setCoste(Double coste) {
        this.coste = coste;
    }

    public void setUnyas(Set<Unya> unyas) {
        this.unyas = unyas;
    }

    public Acabado(Long id, String nombre, Integer tiempo, Double coste, Set<Unya> unyas) {
        this.id = id;
        this.nombre = nombre;
        this.tiempo = tiempo;
        this.coste = coste;
        this.unyas = unyas;
    }

    public Acabado() {
        super();
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 53 * hash + Objects.hashCode(this.id);
        hash = 53 * hash + Objects.hashCode(this.nombre);
        hash = 53 * hash + Objects.hashCode(this.tiempo);
        hash = 53 * hash + Objects.hashCode(this.coste);
        hash = 53 * hash + Objects.hashCode(this.unyas);
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
        final Acabado other = (Acabado) obj;
        if (!Objects.equals(this.nombre, other.nombre)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.tiempo, other.tiempo)) {
            return false;
        }
        if (!Objects.equals(this.coste, other.coste)) {
            return false;
        }
        return Objects.equals(this.unyas, other.unyas);
    }

    @Override
    public String toString() {
        return "Acabado{" + "id=" + id + ", nombre=" + nombre + ", tiempo=" + tiempo + ", coste=" + coste + ", unyas=" + unyas + '}';
    }
    
}
