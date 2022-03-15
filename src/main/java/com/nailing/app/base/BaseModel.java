package com.nailing.app.base;

import java.util.Objects;

public class BaseModel {

	private Long id;
	private String nombre;
	private Integer tiempo;
	private Double coste;
	private Long centroId;

	public BaseModel() {
		super();
	}

	public BaseModel(Long id, String nombre, Integer tiempo, Double coste, Long centroId) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.tiempo = tiempo;
		this.coste = coste;
		this.centroId = centroId;
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

	public Long getCentroId() {
		return centroId;
	}

	public void setCentroId(Long centroId) {
		this.centroId = centroId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(centroId, coste, id, nombre, tiempo);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BaseModel other = (BaseModel) obj;
		return Objects.equals(centroId, other.centroId) && Objects.equals(coste, other.coste)
				&& Objects.equals(id, other.id) && Objects.equals(nombre, other.nombre)
				&& Objects.equals(tiempo, other.tiempo);
	}

	@Override
	public String toString() {
		return "BaseModel [id=" + id + ", nombre=" + nombre + ", tiempo=" + tiempo + ", coste=" + coste + "]";
	}
}
