package com.nailing.app.base;

import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

import com.nailing.app.centro.Centro;

@Entity
@Table(name = "contacts")
public class Base {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private int id;
	@Column(name = "nombre")
	@Size(max = 50)
	@NotBlank
	private String nombre;
	@Positive
	@NotNull
	@Column(name = "tiempo")
	private Double tiempo;
	@PositiveOrZero
	@NotNull
	@Column(name = "coste")
	private Double coste;
	@ManyToMany(mappedBy = "bases")
	private Set<Centro> centros;

	public Base() {
		super();
	}

	public Base(int id, @Size(max = 50) @NotBlank String nombre, @Positive @NotNull Double tiempo,
			@PositiveOrZero @NotNull Double coste, Set<Centro> centros) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.tiempo = tiempo;
		this.coste = coste;
		this.centros = centros;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
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

	public Set<Centro> getCentros() {
		return centros;
	}

	public void setCentros(Set<Centro> centros) {
		this.centros = centros;
	}

	@Override
	public int hashCode() {
		return Objects.hash(centros, coste, id, nombre, tiempo);
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
		return Objects.equals(centros, other.centros) && Objects.equals(coste, other.coste) && id == other.id
				&& Objects.equals(nombre, other.nombre) && Objects.equals(tiempo, other.tiempo);
	}

	@Override
	public String toString() {
		return "Base [id=" + id + ", nombre=" + nombre + ", tiempo=" + tiempo + ", coste=" + coste + "]";
	}

}
