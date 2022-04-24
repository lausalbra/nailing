package com.nailing.APP.service;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.nailing.app.AppApplication;
import com.nailing.app.centro.Centro;
import com.nailing.app.centro.CentroService;
import com.nailing.app.centro.Suscripcion;
import com.nailing.app.components.Fases;
import com.nailing.app.forma.Forma;
import com.nailing.app.forma.FormaService;
import com.nailing.app.forma.NombreForma;


@SpringBootTest(classes = AppApplication.class)
public class FormaTestService {

	@Autowired
	private FormaService formaSer;
	@Autowired
	private CentroService centroSer;
	private Forma forma;
	private Centro centro;
	private Centro centroAnadido;
	@BeforeEach
	public void setUp() {
		centro = new Centro();
		centro.setId((long)6000);
		centro.setNombre("PaquitoElUnyas");
		centro.setPagado(true);
		centro.setCreditosrestantes(150);
		centro.setUltimaSuscripcion(LocalDate.now());
		centro.setSuscripcion(Suscripcion.BASIC);
		centro.setProvincia("Sevilla");
		centro.setDiasDisponible("MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY");
		centro.setImagen("urlimagen");
		centro.setAperturaAM(LocalTime.of(8, 30));
		centro.setCierreAM(LocalTime.of(14, 0));
		centro.setAperturaPM(LocalTime.of(17, 0));
		centro.setCierrePM(LocalTime.of(21, 0));
		centroAnadido = centroSer.addCentro(centro);
		System.out.println(centroAnadido);
	}
	//Se comprueba que los datos seteados previamente con los datos de la forma una vez añadida a la base de datos
	@Test
	public void addFormaTest() {
		forma = new Forma();
		forma.setCentro(centroAnadido);
		forma.setCoste(20.0);
		forma.setNombre(NombreForma.STILETTO);
		forma.setSiguienteFase(Fases.tamanyos);
		forma.setTiempo(30);
		Forma formaAnadida = formaSer.addForma(forma);
		assertEquals(forma.getCentro(), formaAnadida.getCentro());
		assertEquals(forma.getCoste(), formaAnadida.getCoste());
		assertEquals(forma.getNombre(), formaAnadida.getNombre());
		assertEquals(forma.getSiguienteFase(), formaAnadida.getSiguienteFase());
		assertEquals(forma.getTiempo(), formaAnadida.getTiempo());
	}
	//Se comprueba que los datos de la forma que se obtiene son los mismos que los datos de la forma recientemente añadida
	@Test
	public void findByIdTest() {
		forma = new Forma();
		forma.setCentro(centroAnadido);
		forma.setCoste(20.0);
		forma.setNombre(NombreForma.STILETTO);
		forma.setSiguienteFase(Fases.tamanyos);
		forma.setTiempo(30);
		Forma formaAnadida = formaSer.addForma(forma);
		Forma formaObtenida = formaSer.findById(formaAnadida.getId());
		assertEquals(formaObtenida.getCentro(), formaAnadida.getCentro());
		assertEquals(formaObtenida.getCoste(), formaAnadida.getCoste());
		assertEquals(formaObtenida.getNombre(), formaAnadida.getNombre());
		assertEquals(formaObtenida.getSiguienteFase(), formaAnadida.getSiguienteFase());
		assertEquals(formaObtenida.getTiempo(), formaAnadida.getTiempo());
	}
	@Test
	public void findAllTest() {
		forma = new Forma();
		forma.setCentro(centroAnadido);
		forma.setCoste(20.0);
		forma.setNombre(NombreForma.STILETTO);
		forma.setSiguienteFase(Fases.tamanyos);
		forma.setTiempo(30);
		Forma formaAnadida = formaSer.addForma(forma);
		List<Forma> formasObtenidas = formaSer.findAll();
		System.out.println(formasObtenidas.toString());
	}
}
