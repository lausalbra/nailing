/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.APP.acabado;

import com.nailing.app.AppApplication;
import com.nailing.app.acabado.Acabado;
import com.nailing.app.acabado.AcabadoService;
import com.nailing.app.acabado.NombreAcabado;
import com.nailing.app.centro.Centro;
import com.nailing.app.centro.CentroService;
import com.nailing.app.centro.Suscripcion;
import com.nailing.app.components.Fases;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.StreamSupport;

import javax.validation.ConstraintViolationException;

import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertThrowsExactly;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.validation.Validator;

@SpringBootTest(classes = AppApplication.class)
public class AcabadoServiceTest {
    
    @Autowired
	private AcabadoService acabadoService;
	@Autowired
	private CentroService centroService;
	private Acabado acabado;
	private Centro centro;
	private Centro centroCreado;
	@Autowired
	Validator validator;
	@BeforeEach
	public void setUp() {
		centro = new Centro();
		centro.setId((long)7000);
		centro.setNombre("UnyasLoli");
		centro.setPagado(true);
		centro.setCreditosrestantes(150);
		centro.setUltimaSuscripcion(LocalDate.now());
		centro.setSuscripcion(Suscripcion.BASIC);
		centro.setProvincia("Sevilla");
        centro.setLocalidad("Sevilla");
        centro.setDireccion("direccion");
		centro.setDiasDisponible("MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY");
		centro.setImagen("urlimagen");
		centro.setAperturaAM(LocalTime.of(10, 0));
		centro.setCierreAM(LocalTime.of(14, 0));
		centro.setAperturaPM(LocalTime.of(16, 0));
		centro.setCierrePM(LocalTime.of(20, 0));
		centro.setValoracionMedia(2.);
		centro.setValoracionTotal(2);
		centro.setNumValoraciones(1);
		centroCreado = centroService.addCentro(centro);
	}    
    
	@Test
	public void addAcabadoTest() {
		acabado = new Acabado();
		acabado.setCentro(centroCreado);
		acabado.setCoste(10.0);
		acabado.setNombre(NombreAcabado.BRILLO);
		acabado.setSiguienteFase(Fases.fin);
		acabado.setTiempo(10);
		Acabado acabadoAnyadido = acabadoService.addAcabado(acabado);
		assertEquals(acabado.getCentro(), acabadoAnyadido.getCentro());
		assertEquals(acabado.getCoste(), acabadoAnyadido.getCoste());
		assertEquals(acabado.getNombre(), acabadoAnyadido.getNombre());
		assertEquals(acabado.getSiguienteFase(), acabadoAnyadido.getSiguienteFase());
		assertEquals(acabado.getTiempo(), acabadoAnyadido.getTiempo());
	}
	@Test
	public void shouldNotAddAcabadoTest() {
		acabado = new Acabado();
		acabado.setCentro(centroCreado);
		acabado.setCoste(-10.0);
		acabado.setNombre(null);
		acabado.setSiguienteFase(null);
		acabado.setTiempo(-10);
		assertThrows(ConstraintViolationException.class, () -> acabadoService.addAcabado(acabado));
	}

	@ParameterizedTest
	@CsvSource(value = {"10,MATE,10,1", "20,BRILLO,20,1"})
	public void shouldAddAcabadoByCentro(String tiempo, String personalizaciones, String coste, String centroId){
		List<String> tiempoList = new ArrayList<>();
		tiempoList.add(tiempo);
		List<String> personalizacionesList = new ArrayList<>();
		personalizacionesList.add(personalizaciones);
		List<String> costeList = new ArrayList<>();
		costeList.add(coste);
		List<String> centroIdList = new ArrayList<>();
		centroIdList.add(centroId);
		Map<String,List<String>> entrada = new HashMap<>();
		entrada.put("tiempo", tiempoList);
        entrada.put("personalizaciones", personalizacionesList);
        entrada.put("centro", centroIdList);
        entrada.put("coste", costeList);
		List<Acabado> list1 = acabadoService.addAcabadoCentro(entrada);
		List<Acabado> list2 = acabadoService.findByCentro(Long.valueOf(centroId));
		assertTrue(list2.contains(list1.get(0)));
	}
	@ParameterizedTest
	@CsvSource(value = {"10,MATE,10,", "10,MATE,,1","10,,10,1",",MATE,10,1"})
	public void shouldNotAddAcabadoByCentro(String tiempo, String personalizaciones, String coste, String centroId){
		List<String> tiempoList = new ArrayList<>();
		tiempoList.add(tiempo);
		List<String> personalizacionesList = new ArrayList<>();
		personalizacionesList.add(personalizaciones);
		List<String> costeList = new ArrayList<>();
		costeList.add(coste);
		List<String> centroIdList = new ArrayList<>();
		centroIdList.add(centroId);
		Map<String,List<String>> entrada = new HashMap<>();
		entrada.put("tiempo", tiempoList);
        entrada.put("personalizaciones", personalizacionesList);
        entrada.put("centro", centroIdList);
        entrada.put("coste", costeList);
		assertThrowsExactly(IllegalArgumentException.class, () -> acabadoService.addAcabadoCentro(entrada));
	}
        
    @Test
	public void findByIdTest() {
		acabado = new Acabado();
		acabado.setCentro(centroCreado);
		acabado.setCoste(10.0);
		acabado.setNombre(NombreAcabado.BRILLO);
		acabado.setSiguienteFase(Fases.fin);
		acabado.setTiempo(10);
		Acabado acabadoAnyadido = acabadoService.addAcabado(acabado);
		Acabado acabadoBuscado = acabadoService.findById(acabadoAnyadido.getId());
		assertEquals(acabadoBuscado.getId(), acabadoAnyadido.getId());
	}
	
	@Test
	public void notFindByIdTest() {
		acabado = new Acabado();
		acabado.setCentro(centroCreado);
		acabado.setCoste(10.0);
		acabado.setNombre(NombreAcabado.BRILLO);
		acabado.setSiguienteFase(Fases.fin);
		acabado.setTiempo(10);
		Acabado acabadoAnyadido = acabadoService.addAcabado(acabado);
		assertThrows(NoSuchElementException.class, new Executable() {
            
            public void execute() throws Throwable {
            	acabadoService.findById(acabadoAnyadido.getId()+1);
            }
        });    
        }
        
	@Test
	public void findAllTest() {
		acabado = new Acabado();
		acabado.setCentro(centroCreado);
		acabado.setCoste(10.0);
		acabado.setNombre(NombreAcabado.BRILLO);
		acabado.setSiguienteFase(Fases.fin);
		acabado.setTiempo(10);
		Acabado acabadoAnyadido = acabadoService.addAcabado(acabado);
		assertTrue(StreamSupport.stream(acabadoService.findAll().spliterator(), false)
                    .anyMatch(acabadoAnyadido::equals));
	}
	
	@Test
	public void removeAcabadoTest() {
		acabado = new Acabado();
		acabado.setCentro(centroCreado);
		acabado.setCoste(10.0);
		acabado.setNombre(NombreAcabado.BRILLO);
		acabado.setSiguienteFase(Fases.fin);
		acabado.setTiempo(10);
		Acabado acabadoAnyadido = acabadoService.addAcabado(acabado);
		this.acabadoService.removeAcabado(acabadoAnyadido.getId());
		assertFalse(StreamSupport.stream(acabadoService.findAll().spliterator(), false)
                    .anyMatch(acabadoAnyadido::equals));
	}

	@Test
    public void shouldNotDeleteAcabados(){
        assertThrows(NoSuchElementException.class, () -> acabadoService.removeAcabado(9999999999999999L));
    }

    @Test
	public void removeAcabadobyCentroTest() {
		acabado = new Acabado();
		acabado.setCentro(centroCreado);
		acabado.setCoste(10.0);
		acabado.setNombre(NombreAcabado.BRILLO);
		acabado.setSiguienteFase(Fases.fin);
		acabado.setTiempo(10);
		Acabado acabadoAnyadido = acabadoService.addAcabado(acabado);
		this.acabadoService.removeAcabadosbyCentro(centroCreado.getId());
		assertFalse(StreamSupport.stream(acabadoService.findAll().spliterator(), false)
                    .anyMatch(acabadoAnyadido::equals));
	}
        
    @Test
	public void findAcabadosbyCentroTest() {
		acabado = new Acabado();
		acabado.setCentro(centroCreado);
		acabado.setCoste(10.0);
		acabado.setNombre(NombreAcabado.BRILLO);
		acabado.setSiguienteFase(Fases.fin);
		acabado.setTiempo(10);
		Acabado acabadoAnyadido = acabadoService.addAcabado(acabado);
		List<Acabado> acabados = acabadoService.findAcabadoByCentro(centroCreado.getId());
		assertEquals(acabadoAnyadido.getId(), acabados.get(0).getId());
	}

	@Test
	public void shouldNotListByCentro(){
		acabado = new Acabado();
		acabado.setCentro(centroCreado);
		acabado.setCoste(10.0);
		acabado.setNombre(NombreAcabado.BRILLO);
		acabado.setSiguienteFase(Fases.fin);
		acabado.setTiempo(10);
		acabadoService.addAcabado(acabado);
		List<Acabado> listAcabadosCentros = acabadoService.findByCentro(1L);
		assertFalse(listAcabadosCentros.contains(acabado));
	}

	@Test
	public void shouldListAllPossibleAcabados(){
		assertTrue(!acabadoService.listPosibleAcabado().isEmpty());
	}
        
        
    @AfterEach
	public void deleteData() {
		centroService.delete(centroCreado.getId());
	}
}
