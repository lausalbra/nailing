package com.nailing.APP.service;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
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
import com.nailing.app.tamanyo.NombreTamanyo;
import com.nailing.app.tamanyo.Tamanyo;
import com.nailing.app.tamanyo.TamanyoService;


@SpringBootTest(classes = AppApplication.class)
public class TamayoTestService {

	@Autowired
	private TamanyoService tamanyoSer;
	@Autowired
	private CentroService centroSer;
	private Tamanyo tamanyo;
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
	}
	//Se comprueba que los datos seteados previamente con los datos de la forma una vez añadida a la base de datos
	@Test
	public void addTamanyoTest() {
		tamanyo = new Tamanyo();
		tamanyo.setCentro(centroAnadido);
		tamanyo.setCoste(20.0);
		tamanyo.setNombre(NombreTamanyo.M);
		tamanyo.setSiguienteFase(Fases.disenyos);
		tamanyo.setTiempo(30);
		Tamanyo tamanyoAnadido = tamanyoSer.addTamanyo(tamanyo);
		assertEquals(tamanyo.getCentro(), tamanyoAnadido.getCentro());
		assertEquals(tamanyo.getCoste(), tamanyoAnadido.getCoste());
		assertEquals(tamanyo.getNombre(), tamanyoAnadido.getNombre());
		assertEquals(tamanyo.getSiguienteFase(), tamanyoAnadido.getSiguienteFase());
		assertEquals(tamanyo.getTiempo(), tamanyoAnadido.getTiempo());
	}
	//Se comprueba que los datos del tamanyo que se obtiene son los mismos que los datos del tamanyo recientemente añadida
	@Test
	public void findByIdTest() {
		tamanyo = new Tamanyo();
		tamanyo.setCentro(centroAnadido);
		tamanyo.setCoste(20.0);
		tamanyo.setNombre(NombreTamanyo.M);
		tamanyo.setSiguienteFase(Fases.disenyos);
		tamanyo.setTiempo(30);
		Tamanyo tamanyoAnadido = tamanyoSer.addTamanyo(tamanyo);
		Tamanyo tamanyoObtendio = tamanyoSer.findById(tamanyoAnadido.getId());
		assertEquals(tamanyoObtendio.getId(), tamanyoAnadido.getId());
	
	}
	//Se comprueba que una vez añadida el nuevo tamanyo esta se lista junto con las otras
	@Test
	public void findAllTest() {
		tamanyo = new Tamanyo();
		tamanyo.setCentro(centroAnadido);
		tamanyo.setCoste(20.0);
		tamanyo.setNombre(NombreTamanyo.M);
		tamanyo.setSiguienteFase(Fases.disenyos);
		tamanyo.setTiempo(30);
		Tamanyo tamanyoAnanida = tamanyoSer.addTamanyo(tamanyo);
		List<Tamanyo> tamanyosObtenidas = tamanyoSer.findAll();
		Tamanyo tamanyoUltimo = tamanyosObtenidas.get(tamanyosObtenidas.size()-1);
		assertEquals(tamanyoUltimo.getId(), tamanyoAnanida.getId());
		
	}
	//Se comprueba que el ultimo elemento de la lista no debe ser igual que el elemento eliminado de la lista (y que seria el ultimo)
	@Test
	public void removeTamanyoTest() {
		tamanyo = new Tamanyo();
		tamanyo.setCentro(centroAnadido);
		tamanyo.setCoste(20.0);
		tamanyo.setNombre(NombreTamanyo.S);
		tamanyo.setSiguienteFase(Fases.disenyos);
		tamanyo.setTiempo(30);
		Tamanyo tamanyoAnanido = tamanyoSer.addTamanyo(tamanyo);
		this.tamanyoSer.removeTamanyo(tamanyoAnanido.getId());
		List<Tamanyo> tamanyosObtenidos = tamanyoSer.findAll();
		assertFalse(tamanyoSer.findAll().contains(tamanyoAnanido));
	}
	//Se comprueba que los tamanyos que se introduce con un centro asociado se puede encontrar en base a ese centro
	@Test
	public void findTamanyosbyCentroTest() {
		tamanyo = new Tamanyo();
		tamanyo.setCentro(centroAnadido);
		tamanyo.setCoste(20.0);
		tamanyo.setNombre(NombreTamanyo.S);
		tamanyo.setSiguienteFase(Fases.disenyos);
		tamanyo.setTiempo(30);
		Tamanyo tamanyoAnanido = tamanyoSer.addTamanyo(tamanyo);
		List<Tamanyo> tamanyoCentro = tamanyoSer.findByCentro(centroAnadido.getId());
		assertEquals(tamanyoAnanido.getId(), tamanyoCentro.get(0).getId());
	}
	//Se comprueba que los tamanyos posibles que ofrece el service son las mismas que un array creado a mano
	@Test
	public void listPosiblesTamanyosTest() {
		List<String> tamanyos = new ArrayList<String>();
		tamanyos.add("XXS");
		tamanyos.add("XS");
		tamanyos.add("S");
		tamanyos.add("M");
		tamanyos.add("L");
		tamanyos.add("XL");
		tamanyos.add("XXL");
		tamanyos.add("RELLENO");
		List<String> tamanyosPosibles = tamanyoSer.listPosibleTamanyo();
		assertEquals(tamanyos, tamanyosPosibles);
	}
	@Test
	public void removeTamanyobyCentroTest() {
		forma = new Forma();
		forma.setCentro(centroAnadido);
		forma.setCoste(20.0);
		forma.setNombre(NombreForma.STILETTO);
		forma.setSiguienteFase(Fases.tamanyos);
		forma.setTiempo(30);
		Forma formaAnadida = formaSer.addForma(forma);
		this.formaSer.removeFormabyCentro(centroAnadido.getId());
		assertFalse(formaSer.findAll().contains(formaAnadida));
	}
}
