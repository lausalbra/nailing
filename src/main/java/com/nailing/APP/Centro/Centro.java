/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.APP.Centro;

import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Entity;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 *
 * @author jaime
 */

@Entity
@Table(name = "centro")
@EntityListeners(AuditingEntityListener.class)
public class Centro {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name = "nombre", nullable = false, length = 1000)
    private String nombre;
    
    @Column(name = "ubicacion", nullable = false, length = 1000)
    private String ubicacion;
    
    @Column(name = "imagen", nullable = true, length = 1000)
    private String imagen;

    public Centro() {
    }

    public Centro(long id, String nombre, String ubicacion, String imagen) {
        this.id = id;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.imagen = imagen;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 31 * hash + (int) (this.id ^ (this.id >>> 32));
        hash = 31 * hash + Objects.hashCode(this.nombre);
        hash = 31 * hash + Objects.hashCode(this.ubicacion);
        hash = 31 * hash + Objects.hashCode(this.imagen);
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
        final Centro other = (Centro) obj;
        if (this.id != other.id) {
            return false;
        }
        if (!Objects.equals(this.nombre, other.nombre)) {
            return false;
        }
        if (!Objects.equals(this.ubicacion, other.ubicacion)) {
            return false;
        }
        return Objects.equals(this.imagen, other.imagen);
    }

    @Override
    public String toString() {
        return "Centro{" + "id=" + id + ", nombre=" + nombre + ", ubicacion=" + ubicacion + ", imagen=" + imagen + '}';
    }
    
    
    
}