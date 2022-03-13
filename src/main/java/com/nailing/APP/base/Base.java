package com.nailing.APP.base;

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
	@Column(name="tiempo")
	@NotNull
	@PositiveOrZero
	private Double tiempo;
	@Column(name="coste")
	@PositiveOrZero
	private Double coste;
}
