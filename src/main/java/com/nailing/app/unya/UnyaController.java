/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.unya;

import java.util.List;
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
@RequestMapping("/unya")
public class UnyaController {
    
    @Autowired
    UnyaService unyaService;
    
    @GetMapping("/list")
    public ResponseEntity<List<Unya>> listUnyas(){
        List<Unya> unyas = StreamSupport.stream(unyaService.findAll()
                .spliterator(), false).collect(Collectors.toList());
        return new ResponseEntity<List<Unya>>(unyas, HttpStatus.OK);
    }
    
    @GetMapping("/show/{id}")
    public ResponseEntity<Unya> showUnya(@PathVariable Long id){
        try{
            Unya unya = unyaService.findById(id);
            return new ResponseEntity<>(unya, HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>(unyaService.findById(id),HttpStatus.BAD_REQUEST);
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteUnya(@PathVariable Long id){
        unyaService.removeUnya(id);
    }
    
    @PostMapping("/add")
    public ResponseEntity<Unya> addUnya(@RequestBody Unya unya){
        Unya nail = unyaService.addUnya(unya);
        if(nail == null)
            return new ResponseEntity<Unya>(nail, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Unya>(nail, HttpStatus.CREATED);
    }
    
}
