/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.acabado;

import java.util.NoSuchElementException;
import java.util.List;
import java.util.Map;
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
@RequestMapping("/acabados")
public class AcabadoController {
    
    @Autowired
    AcabadoService acabadoService;
    
    @PostMapping("/add")
    public ResponseEntity<Acabado> addAcabado(@RequestBody Acabado acabado){
        Acabado acab = acabadoService.addAcabado(acabado);
        if(acab == null)
            return new ResponseEntity<>(acab, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(acab, HttpStatus.CREATED);
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteAcabado(@PathVariable Long id){
        acabadoService.removeAcabado(id);
    }
    
    @GetMapping("/show/{id}")
    public ResponseEntity<Acabado> showAcabado(@PathVariable Long id){
        try{
            Acabado acab = acabadoService.findById(id);
            return new ResponseEntity<>(acab,HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>(acabadoService.findById(id),HttpStatus.BAD_REQUEST);
        }       
    }
    
    @GetMapping("/list")
    public ResponseEntity<List<Acabado>> listAcabado(){
        List<Acabado> acabados = StreamSupport.stream(acabadoService.findAll().spliterator(), false).collect(Collectors.toList());
        return new ResponseEntity<>(acabados,HttpStatus.OK);
    }
    
    @GetMapping("/{decoracionId}/centro/{centroId}")
    public ResponseEntity<List<Acabado>> acabadosByCentro(@PathVariable Long centroId){
        List<Acabado> acabados = acabadoService.findAcabadoByCentro(centroId);
        return new ResponseEntity<>(acabados, HttpStatus.OK);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<String>> listPosibleAcabado(){
        List<String> acabados = acabadoService.listPosibleAcabado();
        return new ResponseEntity<>(acabados,HttpStatus.OK);
    }

    @GetMapping("/centro/{centroId}/list")
    public ResponseEntity<List<Acabado>> listByCentro(@PathVariable Long centroId){
        List<Acabado> acabados = acabadoService.findByCentro(centroId);
        return new ResponseEntity<>(acabados, HttpStatus.OK);
    }
    
    @PostMapping("/add/centro")
    public ResponseEntity<List<Acabado>> addAcabadoCentro(@RequestBody Map<String,List<String>> acabids){
        try{
            List<Acabado> acabados = acabadoService.addAcabadoCentro(acabids);
            return new ResponseEntity<>(acabados, HttpStatus.CREATED);
        }catch(IllegalArgumentException e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
