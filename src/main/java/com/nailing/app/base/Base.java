package com.nailing.app.base;

import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

import com.nailing.app.centro.Centro;
import com.nailing.app.unya.Unya;

@Entity
@Table(name = "base")
public class Base {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Long id;

	@Column(name = "nombre")
	@Size(max = 50)
	@NotBlank
	private String nombre;

	@Positive
	@NotNull
	@Column(name = "tiempo")
	private Integer tiempo;

	@PositiveOrZero
	@NotNull
	@Column(name = "coste")
	private Double coste;

	@ManyToOne
	@JoinColumn(name = "centro_id")
	private Centro centro;

	public Base() {
		super();
	}

	public Base(Long id, @Size(max = 50) @NotBlank String nombre, @Positive @NotNull Integer tiempo,
			@PositiveOrZero @NotNull Double coste, Centro centro, Set<Unya> unyas) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.tiempo = tiempo;
		this.coste = coste;
		this.centro = centro;
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

	public Integer getTiempo() {
		return tiempo;
	}

	public void setTiempo(Integer tiempo) {
		this.tiempo = tiempo;
	}

	public Double getCoste() {
		return coste;
	}

	public void setCoste(Double coste) {
		this.coste = coste;
	}

	public Centro getCentro() {
		return centro;
	}

	public void setCentro(Centro centros) {
		this.centro = centros;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(centro, coste, id, nombre, tiempo);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Base other = (Base) obj;
		return Objects.equals(centro, other.centro) && Objects.equals(coste, other.coste)
				&& Objects.equals(id, other.id) && Objects.equals(nombre, other.nombre)
				&& Objects.equals(tiempo, other.tiempo);
	}

	@Override
	public String toString() {
		return "Base [id=" + id + ", nombre=" + nombre + ", tiempo=" + tiempo + ", coste=" + coste + "]";
	}

}
