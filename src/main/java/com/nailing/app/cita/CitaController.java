/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.cita;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Usuario
 */
@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE })
@RequestMapping("/cita")
public class CitaController {
    
    @Autowired
    CitaService citaService;
    
    @GetMapping("/list")
    public ResponseEntity<List<Cita>> listUnyas(){
        List<Cita> unyas = StreamSupport.stream(citaService.findAll()
                .spliterator(), false).collect(Collectors.toList());
        return new ResponseEntity<List<Cita>>(unyas, HttpStatus.OK);
    }
    
    @GetMapping("/show/{id}")
    public ResponseEntity<Cita> showUnya(@PathVariable Long id){
        try{
            Cita unya = citaService.findById(id);
            return new ResponseEntity<>(unya, HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>(citaService.findById(id),HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Cita>> citaByUser(@PathVariable Long userId){
        List<Cita> citas = citaService.findByUsuario(userId);
        return new ResponseEntity<>(citas, HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteUnya(@PathVariable Long id){
        citaService.removeUnya(id);
    }
    
    @DeleteMapping("/user/{userId}/delete/{citaId}")
    public void deleteUnya(@PathVariable Long userId,@PathVariable Long citaId){
        citaService.removeCitaByUser(userId, citaId);
    }

    @PostMapping("/add")
    public ResponseEntity<Cita> addCita(@RequestBody Map<String,String> ids){
       Cita cita = null;
    	try {
        	cita = citaService.addCita(ids);	
        	return new ResponseEntity<>(cita, HttpStatus.CREATED);
		} catch (IllegalArgumentException e) {
			return new ResponseEntity<>(cita, HttpStatus.BAD_REQUEST);
		}
    }
    
//    @GetMapping("/check/{centroId}")
//    public ResponseEntity<List<>>
}
