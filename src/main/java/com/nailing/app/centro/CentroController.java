/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.centro;

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

import com.nailing.app.acabado.Acabado;
import com.nailing.app.acabado.AcabadoService;
import com.nailing.app.base.Base;
import com.nailing.app.base.BaseService;
import com.nailing.app.decoracion.Decoracion;
import com.nailing.app.decoracion.DecoracionService;
import com.nailing.app.disenyo.Disenyo;
import com.nailing.app.disenyo.DisenyoService;
import com.nailing.app.forma.Forma;
import com.nailing.app.forma.FormaService;
import com.nailing.app.tamanyo.Tamanyo;
import com.nailing.app.tamanyo.TamanyoService;
import com.nailing.app.tipo.Tipo;
import com.nailing.app.tipo.TipoService;

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
    private AcabadoService acabSer;
    @Autowired
    private BaseService basSer;
    @Autowired
    private DecoracionService decSer;
    @Autowired
    private DisenyoService disSer;
    @Autowired 
    private FormaService forSer;
    @Autowired
    private TamanyoService tamSer;
    @Autowired
    private TipoService tipoSer;
    
    
    @GetMapping()
    public ResponseEntity<List<Centro>> findAll(){
	List<Centro> centros = centroService.findAll();
	return new ResponseEntity<List<Centro>>(centros, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public void deleteCentro(@PathVariable Long id) {
    	acabSer.removeAcabadosbyCentro(id);
    	basSer.removeBasesbyCentro(id);
    	decSer.removeDecoracionesbyCentro(id);
    	disSer.removeDisenyosbyCentro(id);
    	forSer.removeFormabyCentro(id);
    	tamSer.removeTamanyobyCentro(id);
    	tipoSer.removeTiposbyCentro(id);
    	centroService.delete(id);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<Centro> findById(@PathVariable Long id){
	return new ResponseEntity<Centro>(centroService.findById(id).get(), HttpStatus.OK);
    }
    
}
