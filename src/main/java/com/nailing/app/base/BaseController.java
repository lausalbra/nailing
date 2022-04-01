package com.nailing.app.base;

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
@RequestMapping("/bases")
public class BaseController {
	
	@Autowired
	BaseService baseService;
	
//	mostrar todas las bases existentes en la base de datos
	@GetMapping("/list")
	public ResponseEntity<List<Base>> listBases(){
		List<Base> bases = baseService.findAll();
		return new ResponseEntity<>(bases, HttpStatus.OK);
	}
	
//	borrar una base por su ID
	@DeleteMapping("/delete/{id}")
	public void deleteBase(@PathVariable Long id) {
		baseService.removeBase(id);
	}
	
//	encontrar una base por su ID
	@GetMapping("/show/{id}")
	public ResponseEntity<Base> showBase(@PathVariable Long id){
		return new ResponseEntity<>(baseService.findById(id), HttpStatus.OK);
	}
	
	@GetMapping("/{tipoId}/centro/{centroId}")
	public  ResponseEntity<List<Base>> basesByCentroTipo(@PathVariable Long tipoId, @PathVariable Long centroId){
		List<Base> bases = baseService.findBasesByCentroTipo(tipoId, centroId);
		return new ResponseEntity<>(bases, HttpStatus.OK);
	}
	
}
