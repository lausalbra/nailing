/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.centro;

import com.nailing.app.acabado.Acabado;
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
import javax.validation.constraints.Size;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.nailing.app.base.Base;
import com.nailing.app.decoracion.Decoracion;
import java.time.LocalDateTime;
import java.time.LocalTime;

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

	@Column(name = "nombre")
	@Size(max = 1000)
	@NotBlank
	private String nombre;

	@Column(name = "imagen")
	@Size(max = 1000)
	@NotBlank
	private String imagen;

	private String provincia;
        
        private LocalTime horaApertura;
        
        private LocalTime horaCierre;

    public Centro() {
    }

    public Centro(String nombre, String imagen, String provincia, LocalTime horaApertura, LocalTime horaCierre) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.provincia = provincia;
        this.horaApertura = horaApertura;
        this.horaCierre = horaCierre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public LocalTime getHoraApertura() {
        return horaApertura;
    }

    public void setHoraApertura(LocalTime horaApertura) {
        this.horaApertura = horaApertura;
    }

    public LocalTime getHoraCierre() {
        return horaCierre;
    }

    public void setHoraCierre(LocalTime horaCierre) {
        this.horaCierre = horaCierre;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 73 * hash + Objects.hashCode(this.id);
        hash = 73 * hash + Objects.hashCode(this.nombre);
        hash = 73 * hash + Objects.hashCode(this.imagen);
        hash = 73 * hash + Objects.hashCode(this.provincia);
        hash = 73 * hash + Objects.hashCode(this.horaApertura);
        hash = 73 * hash + Objects.hashCode(this.horaCierre);
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
        if (!Objects.equals(this.nombre, other.nombre)) {
            return false;
        }
        if (!Objects.equals(this.imagen, other.imagen)) {
            return false;
        }
        if (!Objects.equals(this.provincia, other.provincia)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.horaApertura, other.horaApertura)) {
            return false;
        }
        return Objects.equals(this.horaCierre, other.horaCierre);
    }

    @Override
    public String toString() {
        return "Centro{" + "id=" + id + ", nombre=" + nombre + ", imagen=" + imagen + ", provincia=" + provincia + ", horaApertura=" + horaApertura + ", horaCierre=" + horaCierre + '}';
    }
        
    
    
}