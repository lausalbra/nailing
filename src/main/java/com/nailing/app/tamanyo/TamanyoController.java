package com.nailing.app.tamanyo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nailing.app.components.Fases;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE })
@RequestMapping("/tamanyos")
public class TamanyoController {

	@Autowired
	TamanyoService tamService;
	
//	Prueba del RestController
//	
	@GetMapping("/check")
	public ResponseEntity<Tamanyo> checkTamanyos(){
		Tamanyo tam = new Tamanyo(0L, NombreTamanyo.XXL, 10, 15.5, Fases.formas, null);
		return new ResponseEntity<Tamanyo>(tam, HttpStatus.OK);
	}
	
//	mostrar todos los tamaños existentes en la base de datos
	@GetMapping()
	public ResponseEntity<List<Tamanyo>> listTamanyos(){
		List<Tamanyo> tams = tamService.findAll();
		return new ResponseEntity<List<Tamanyo>>(tams, HttpStatus.OK);
	}
	
//	borrar un tamaño por su ID
	@DeleteMapping("/{id}")
	public void deleteBase(@PathVariable Long id) {
		tamService.removeTamanyo(id);
	}
	
//	encontrar un tamanyo por su ID
	@GetMapping("/{id}")
	public ResponseEntity<Tamanyo> showTamanyo(@PathVariable Long id){
		return new ResponseEntity<Tamanyo>(tamService.findById(id), HttpStatus.OK);
	}
	
	@GetMapping("/{formaId}/centro/{centroId}")
	public  ResponseEntity<List<Tamanyo>> tamanyosByCentroForma(@PathVariable Long formaId, @PathVariable Long centroId){
		List<Tamanyo> tams = tamService.findTamanyosByCentroForma(formaId, centroId);
		return new ResponseEntity<List<Tamanyo>>(tams, HttpStatus.OK);
	}
}
