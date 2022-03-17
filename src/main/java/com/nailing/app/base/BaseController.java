package com.nailing.app.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bases")
public class BaseController {
	
	@Autowired
	BaseService baseService;
	
//	Prueba del RestController
//	
//	@GetMapping("/check")
//	public ResponseEntity<Base> checkBases(){
//		Base base = new Base(0L, "BaseCheck", 10.12, 15.5, null);
//		return new ResponseEntity<Base>(base, HttpStatus.OK);
//	}
	
//	añadir una nueva base (No hace falta indicar el ID)
	@PostMapping()
	public ResponseEntity<Base> addBase(@RequestBody Base base){
		Base result = baseService.addBase(base);
		if(result != null)
			return new ResponseEntity<Base>(result, HttpStatus.CREATED);
		return new ResponseEntity<Base>(result, HttpStatus.BAD_REQUEST);
	}
	
//	mostrar todas las bases existentes en la base de datos
	@GetMapping()
	public ResponseEntity<List<Base>> listBases(){
		List<Base> bases = baseService.findAll();
		return new ResponseEntity<List<Base>>(bases, HttpStatus.OK);
	}
	
//	borrar una base por su ID
	@DeleteMapping("/{id}")
	public void deleteBase(@PathVariable Long id) {
		baseService.removeBase(id);
	}
	
//	encontrar una base por su ID
	@GetMapping("/{id}")
	public ResponseEntity<Base> showBase(@PathVariable Long id){
		return new ResponseEntity<Base>(baseService.findById(id), HttpStatus.OK);
	}
	
	
}
