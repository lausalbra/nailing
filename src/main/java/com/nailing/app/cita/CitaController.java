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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Usuario
 */
@RestController
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
    
    @DeleteMapping("/delete/{id}")
    public void deleteUnya(@PathVariable Long id){
        citaService.removeUnya(id);
    }

    @PostMapping("")
    public ResponseEntity<Cita> addCita(@RequestBody Map<String,String> ids){
        Cita cita = citaService.addCita(ids);
        if(cita == null){
            return new ResponseEntity<Cita>(cita, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Cita>(cita, HttpStatus.CREATED);
    }
}
