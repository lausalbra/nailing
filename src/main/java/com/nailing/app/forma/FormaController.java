/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.forma;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author jaime
 */

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE })
@RequestMapping("/formas")
public class FormaController {
    @Autowired
    FormaService formaService;
	
//	mostrar todas las formas existentes en la base de datos
    @GetMapping()
    public ResponseEntity<List<Forma>> listFormas(){
    	List<Forma> formas = formaService.findAll();
	return new ResponseEntity<>(formas, HttpStatus.OK);
    }
	
//	borrar una forma por su ID
    @DeleteMapping("/{id}")
    public void deleteForma(@PathVariable Long id) {
	formaService.removeBase(id);
    }
	
//	encontrar una forma por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Forma> showBase(@PathVariable Long id){
	return new ResponseEntity<>(formaService.findById(id), HttpStatus.OK);
    }
	
    @GetMapping("/{baseId}/centro/{centroId}")
    public  ResponseEntity<List<Forma>> basesByCentroTipo( @PathVariable Long centroId){
    	List<Forma> formas = formaService.findFormasByCentroBase(centroId);
	return new ResponseEntity<>(formas, HttpStatus.OK);
    }
}
