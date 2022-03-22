/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.acabado;

import java.util.NoSuchElementException;
import java.util.List;
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
@RequestMapping("/acabados")
public class AcabadoController {
    
    @Autowired
    AcabadoService acabadoService;
    
    @PostMapping("/add")
    public ResponseEntity<Acabado> addAcabado(@RequestBody Acabado acabado){
        Acabado acab = acabadoService.addAcabado(acabado);
        if(acab == null)
            return new ResponseEntity<Acabado>(acab, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Acabado>(acab, HttpStatus.CREATED);
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteAcabado(@PathVariable Long id){
        acabadoService.removeAcabado(id);
    }
    
    @GetMapping("/show/{id}")
    public ResponseEntity<Acabado> showAcabado(@PathVariable Long id){
        try{
            Acabado acab = acabadoService.findById(id);
            return new ResponseEntity<Acabado>(acab,HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<Acabado>(acabadoService.findById(id),HttpStatus.BAD_REQUEST);
        }       
    }
    
    @GetMapping("/list")
    public ResponseEntity<List<Acabado>> listAcabado(){
        List<Acabado> acabados = StreamSupport.stream(acabadoService.findAll().spliterator(), false).collect(Collectors.toList());
        return new ResponseEntity<List<Acabado>>(acabados,HttpStatus.OK);
    }
    
    @GetMapping("{decoracionId}/centro/{centroId}")
    public ResponseEntity<List<Acabado>> acabadosByCentro(@PathVariable Long centroId){
        List<Acabado> acabados = acabadoService.findAcabadoByCentro(centroId);
        return new ResponseEntity<List<Acabado>>(acabados, HttpStatus.OK);
    }
}
