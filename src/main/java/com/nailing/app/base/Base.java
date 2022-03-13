package com.nailing.app.base;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

@Entity
@Table(name="contacts")
public class Base {

	@Id
	@GeneratedValue
	@Column(name="id")
	private int id;
	@Column(name="nombre")
	@Size(max=50)
	@NotBlank
	private String nombre;
	
	public Base() {
		super();
	}
	public Base(int id, @Size(max = 50) @NotBlank String nombre) {
		super();
		this.id = id;
		this.nombre = nombre;
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
	
	@Override
	public int hashCode() {
		return Objects.hash(id, nombre);
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
		return id == other.id && Objects.equals(nombre, other.nombre);
	}
	@Override
	public String toString() {
		return "Base [id=" + id + ", nombre=" + nombre + "]";
	}
}
