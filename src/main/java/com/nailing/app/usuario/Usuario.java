package com.nailing.app.usuario;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "usuario")
@EntityListeners(AuditingEntityListener.class)
public class Usuario {
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Long id;
	
	@Column(name = "nombre")
	@Size(max = 100)
	@NotNull
	private String nombre;
	
	@Column(name = "contraseña")
	@Size(min=8,max = 100)
	@NotNull
	private String contraseña;
	
	@Column(name = "email")
	@NotNull
	@Email
	private String email;
	
	@Column(name = "telefono")
	private String telefono;

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getContraseña() {
		return contraseña;
	}

	public void setContraseña(String contraseña) {
		this.contraseña = contraseña;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public Usuario(@Size(max = 100) @NotNull String nombre, @Size(min = 8, max = 100) @NotNull String contraseña,
			@NotNull @Email String email, String telefono) {
		super();
		this.nombre = nombre;
		this.contraseña = contraseña;
		this.email = email;
		this.telefono = telefono;
	}
	public Usuario() {
		super();
	}
	

}
