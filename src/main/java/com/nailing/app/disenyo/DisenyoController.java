/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.disenyo;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author CANDELA
 */
@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE })
public class DisenyoController {
    @Autowired
	DisenyoService disenyoService;
    
	@GetMapping("/disenyos/list")
	public ResponseEntity<List<Disenyo>> listDisenyos(){
		List<Disenyo> disenyos = (List<Disenyo>) disenyoService.findAll();
		return new ResponseEntity<>(disenyos, HttpStatus.OK);
	}
	
	@DeleteMapping("/disenyos/delete/{id}")
	public void deleteDisenyo(@PathVariable Long id) {
		disenyoService.removeDisenyo(id);
	}
	
	@GetMapping("/disenyos/show/{id}")
	public ResponseEntity<Disenyo> showDisenyo(@PathVariable Long id){
		return new ResponseEntity<>(disenyoService.findById(id), HttpStatus.OK);
	}    
        
    @GetMapping("/disenyos/{tamanyoId}/centro/{centroId}")
	public  ResponseEntity<List<Disenyo>> findDisenyosByCentroTamanyo(@PathVariable Long tamanyoId, @PathVariable Long centroId){
		List<Disenyo> disenyos = disenyoService.findDisenyosByCentroTamanyo(tamanyoId, centroId);
		return new ResponseEntity<>(disenyos, HttpStatus.OK);
	}

    @GetMapping("/disenyosNaturales/{baseId}/centro/{centroId}")
	public  ResponseEntity<List<Disenyo>> findDisenyosByCentroBase(@PathVariable Long baseId, @PathVariable Long centroId){
		List<Disenyo> disenyos = disenyoService.findDisenyosByCentroBase(baseId, centroId);
		return new ResponseEntity<>(disenyos, HttpStatus.OK);
	}
        
        
        
}
