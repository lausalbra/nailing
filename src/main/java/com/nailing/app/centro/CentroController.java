/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.centro;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.nailing.app.usuario.AuthoritiesConstants;
import com.nailing.app.usuario.Usuario;
import com.nailing.app.usuario.UsuarioService;

/**
 *
 * @author jaime
 */

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE })
@RequestMapping("/centros")
public class CentroController {
    
    @Autowired
    private CentroService centroService;
    @Autowired
    private UsuarioService usuarioService;
    @PostMapping("/add/{idUser}")
    public ResponseEntity<Centro> addCentro(@RequestBody Centro centro, @PathVariable int idUser){
        centroService.asociarCentroUsuario(usuarioService.findById((long) idUser).get(), centro);
        if(centro == null)
            return new ResponseEntity<Centro>(centro, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Centro>(centro, HttpStatus.CREATED);
    }

    
   
    @PreAuthorize("hasAuthority('"+AuthoritiesConstants.ADMIN+"')")
    @GetMapping("/list")
    public ResponseEntity<List<Centro>> findAll(){
	List<Centro> centros = centroService.findAll();
	return new ResponseEntity<List<Centro>>(centros, HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteCentro(@PathVariable Long id) {
    	centroService.delete(id);
    }

    @GetMapping("/show/{id}")
    public ResponseEntity<Centro> findById(@PathVariable Long id){
	return new ResponseEntity<Centro>(centroService.findById(id).get(), HttpStatus.OK);
    }
    
}
