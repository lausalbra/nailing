package com.nailing.tests;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalTime;
import java.util.List;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import com.nailing.app.AppApplication;
import com.nailing.app.centro.Centro;
import com.nailing.app.centro.CentroRepository;
import com.nailing.app.centro.CentroService;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = AppApplication.class)
@TestPropertySource(
  locations = "classpath:application-test.properties")
class ListarCentrosTest {

	@Autowired
	private CentroService centroSer;
	@Autowired
	private CentroRepository centroRep;
	Centro centro = new Centro();
	long id = (long) 50;
	String name = "Centro estetica";
	String imagen = "url/imagen";
	String provincia = "Tarragona";
	LocalTime horaApertura = LocalTime.parse("09:00:00");
	LocalTime horaCierre = LocalTime.parse("21:00:00");
	
	
	//TEST DE SERVICIO
	@Test
	void listarCentros() {
		assertEquals(centroSer.findAll(), (List) centroRep.findAll());
	}
	@Test
	void findCentroById() {
		assertEquals(centroSer.findById((long) 1), centroRep.findById((long) 1));
	}
	@Test
	void addCentro() {
		centro.setNombre(name);
		centro.setProvincia(provincia);
		centro.setHoraApertura(horaApertura);
		centro.setHoraCierre(horaCierre);
		centro.setImagen(imagen);

		centroSer.addCentro(centro);
		int tamaño = centroSer.findAll().size();
		assertEquals(centro, centroSer.findAll().get(tamaño-1));
	}
	@Test
	void deleteCentro() {
		addCentro();
		if(centroSer.findById(centro.getId()).isPresent()) {
			System.out.println("Se ha borrado el centro: "+ centroSer.findById(centro.getId()).toString());
			centroSer.delete(centro.getId());
			
			assertTrue(!centroSer.findById(centro.getId()).isPresent());
		}
	}
}
