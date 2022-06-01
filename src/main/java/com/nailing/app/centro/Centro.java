/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.centro;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.DayOfWeek;
import java.time.LocalDate;
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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nombre")
	@Size(max = 1000)
	@NotBlank
	private String nombre;

	@Column(name = "imagen")
	@Size(max = 1000)
	@NotBlank
	private String imagen;
	@Column(name = "provincia")
	@Size(max = 50)
	@NotBlank
	private String provincia;
        
        @Column(name = "localidad")
	@Size(max = 50)
	@NotBlank
	private String localidad;
        
        @Column(name = "direccion")
	@Size(max = 50)
	@NotBlank
	private String direccion;

	@Column(name="apertura_am")
	private LocalTime aperturaAM;

	@Column(name="cierre_am")
	private LocalTime cierreAM;

	@Column(name="apertura_pm")
	private LocalTime aperturaPM;

	@Column(name="cierre_pm")
	private LocalTime cierrePM;

	@Column(name="dias_disponible")
	@NotEmpty
	private String diasDisponible;
	
	@Column(name = "suscripcion")
	@NotNull
	private Suscripcion suscripcion;
	
	@Column(name = "ultimasuscripcion")
	@NotNull
	private LocalDate ultimaSuscripcion;
	
	@Column(name = "creditosrestantes")
	@NotNull
	private Integer creditosrestantes;
	
	@Column(name = "pagado")
	@NotNull
	private Boolean pagado;
        
        @Column(name = "valoracionmedia")
	@NotNull
	private Double valoracionMedia;

	@Column(name = "valoraciontotal")
	@NotNull
	private Integer valoracionTotal;

        @Column(name = "numvaloraciones")
	@NotNull
	private Integer numValoraciones;

    public Centro(Long id, String nombre, String imagen, String provincia, @NotBlank String localidad,@NotBlank String direccion,LocalTime aperturaAM, LocalTime cierreAM, LocalTime aperturaPM, LocalTime cierrePM, String diasDisponible, Suscripcion suscripcion, LocalDate ultimaSuscripcion, Integer creditosrestantes, Boolean pagado, Double valoracionMedia, Integer valoracionTotal, Integer numValoraciones) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.provincia = provincia;
        this.localidad = localidad;
        this.direccion = direccion;
        this.aperturaAM = aperturaAM;
        this.cierreAM = cierreAM;
        this.aperturaPM = aperturaPM;
        this.cierrePM = cierrePM;
        this.diasDisponible = diasDisponible;
        this.suscripcion = suscripcion;
        this.ultimaSuscripcion = ultimaSuscripcion;
        this.creditosrestantes = creditosrestantes;
        this.pagado = pagado;
        this.valoracionMedia = valoracionMedia;
        this.valoracionTotal = valoracionTotal;
        this.numValoraciones = numValoraciones;
    }
    
        public Centro(@Size(max = 1000) @NotBlank String nombre, @Size(max = 1000) @NotBlank String imagen,
			@Size(max = 50) @NotBlank String provincia,@NotBlank String localidad,@NotBlank String direccion, LocalTime aperturaAM, LocalTime cierreAM, LocalTime aperturaPM,
			LocalTime cierrePM, @NotNull Suscripcion suscripcion, @NotNull LocalDate ultimaSuscripcion,
			@NotNull Integer creditosrestantes, @NotNull Boolean pagado, @NotEmpty String diasDisponible,
                        Double valoracionMedia, Integer valoracionTotal, Integer numValoraciones) {
		super();
		this.nombre = nombre;
		this.imagen = imagen;
		this.provincia = provincia;
                this.localidad = localidad;
                this.direccion = direccion;
		this.aperturaAM = aperturaAM;
		this.cierreAM = cierreAM;
		this.aperturaPM = aperturaPM;
		this.cierrePM = cierrePM;
		this.suscripcion = suscripcion;
		this.ultimaSuscripcion = ultimaSuscripcion;
		this.creditosrestantes = creditosrestantes;
		this.pagado = pagado;
		this.diasDisponible = diasDisponible;
                this.valoracionMedia = valoracionMedia;
                this.valoracionTotal = valoracionTotal;
                this.numValoraciones = numValoraciones;
	}
        
        public Centro() {
	}

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

	public Boolean getPagado() {
		return pagado;
	}

	public void setPagado(Boolean pagado) {
		this.pagado = pagado;
	}

	public LocalDate getUltimaSuscripcion() {
		return ultimaSuscripcion;
	}

	public void setUltimaSuscripcion(LocalDate ultimaSuscripcion) {
		this.ultimaSuscripcion = ultimaSuscripcion;
	}

	public Integer getCreditosrestantes() {
		return creditosrestantes;
	}

	public void setCreditosrestantes(Integer creditosrestantes) {
		this.creditosrestantes = creditosrestantes;
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

	public LocalTime getAperturaAM() {
		return aperturaAM;
	}

	public void setAperturaAM(LocalTime aperturaAM) {
		this.aperturaAM = aperturaAM;
	}

	public LocalTime getCierreAM() {
		return cierreAM;
	}

	public void setCierreAM(LocalTime cierreAM) {
		this.cierreAM = cierreAM;
	}

	public LocalTime getAperturaPM() {
		return aperturaPM;
	}

	public void setAperturaPM(LocalTime aperturaPM) {
		this.aperturaPM = aperturaPM;
	}

	public LocalTime getCierrePM() {
		return cierrePM;
	}

	public void setCierrePM(LocalTime cierrePM) {
		this.cierrePM = cierrePM;
	}

	public Suscripcion getSuscripcion() {
		return suscripcion;
	}

	public void setSuscripcion(Suscripcion suscripcion) {
		this.suscripcion = suscripcion;
	}

	public String getDiasDisponible(){
		return diasDisponible;
	}

        public Double getValoracionMedia() {
            return valoracionMedia;
        }

        public void setValoracionMedia(Double valoracionMedia) {
            this.valoracionMedia = valoracionMedia;
        }

        public Integer getValoracionTotal() {
            return valoracionTotal;
        }

        public void setValoracionTotal(Integer valoracionTotal) {
            this.valoracionTotal = valoracionTotal;
        }

        public Integer getNumValoraciones() {
            return numValoraciones;
        }

        public void setNumValoraciones(Integer numValoraciones) {
            this.numValoraciones = numValoraciones;
        }
	
        
        
	@JsonIgnore
	public List<DayOfWeek> getListadoDiasDisponible(){
		List<DayOfWeek> result = new ArrayList<>();
		for(String dia: diasDisponible.trim().split(","))
		{
			result.add(DayOfWeek.valueOf(dia));
		}
		return result;
	}
	
	public void setDiasDisponible(String diasDisponible) {
		this.diasDisponible = diasDisponible;
	}

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 97 * hash + Objects.hashCode(this.id);
        hash = 97 * hash + Objects.hashCode(this.nombre);
        hash = 97 * hash + Objects.hashCode(this.imagen);
        hash = 97 * hash + Objects.hashCode(this.provincia);
        hash = 97 * hash + Objects.hashCode(this.localidad);
        hash = 97 * hash + Objects.hashCode(this.direccion);
        hash = 97 * hash + Objects.hashCode(this.aperturaAM);
        hash = 97 * hash + Objects.hashCode(this.cierreAM);
        hash = 97 * hash + Objects.hashCode(this.aperturaPM);
        hash = 97 * hash + Objects.hashCode(this.cierrePM);
        hash = 97 * hash + Objects.hashCode(this.diasDisponible);
        hash = 97 * hash + Objects.hashCode(this.suscripcion);
        hash = 97 * hash + Objects.hashCode(this.ultimaSuscripcion);
        hash = 97 * hash + Objects.hashCode(this.creditosrestantes);
        hash = 97 * hash + Objects.hashCode(this.pagado);
        hash = 97 * hash + Objects.hashCode(this.valoracionMedia);
        hash = 97 * hash + Objects.hashCode(this.valoracionTotal);
        hash = 97 * hash + Objects.hashCode(this.numValoraciones);
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
        if (!Objects.equals(this.localidad, other.localidad)) {
            return false;
        }
        if (!Objects.equals(this.direccion, other.direccion)) {
            return false;
        }
        if (!Objects.equals(this.diasDisponible, other.diasDisponible)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.aperturaAM, other.aperturaAM)) {
            return false;
        }
        if (!Objects.equals(this.cierreAM, other.cierreAM)) {
            return false;
        }
        if (!Objects.equals(this.aperturaPM, other.aperturaPM)) {
            return false;
        }
        if (!Objects.equals(this.cierrePM, other.cierrePM)) {
            return false;
        }
        if (this.suscripcion != other.suscripcion) {
            return false;
        }
        if (!Objects.equals(this.ultimaSuscripcion, other.ultimaSuscripcion)) {
            return false;
        }
        if (!Objects.equals(this.creditosrestantes, other.creditosrestantes)) {
            return false;
        }
        if (!Objects.equals(this.pagado, other.pagado)) {
            return false;
        }
        if (!Objects.equals(this.valoracionMedia, other.valoracionMedia)) {
            return false;
        }
        if (!Objects.equals(this.valoracionTotal, other.valoracionTotal)) {
            return false;
        }
        return Objects.equals(this.numValoraciones, other.numValoraciones);
    }

    @Override
    public String toString() {
        return "Centro{" + "id=" + id + ", nombre=" + nombre + ", imagen=" + imagen + ", provincia=" + provincia + ", localidad=" + localidad + ", direccion=" + direccion + ", aperturaAM=" + aperturaAM + ", cierreAM=" + cierreAM + ", aperturaPM=" + aperturaPM + ", cierrePM=" + cierrePM + ", diasDisponible=" + diasDisponible + ", suscripcion=" + suscripcion + ", ultimaSuscripcion=" + ultimaSuscripcion + ", creditosrestantes=" + creditosrestantes + ", pagado=" + pagado + ", valoracionMedia=" + valoracionMedia + ", valoracionTotal=" + valoracionTotal + ", numValoraciones=" + numValoraciones + '}';
    }
	
	

}