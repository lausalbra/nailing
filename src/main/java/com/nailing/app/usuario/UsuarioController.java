package com.nailing.app.usuario;

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

import com.nailing.app.base.Base;







@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

	@Autowired
	public UsuarioService usuarioSer;
	
	@PostMapping()
	public ResponseEntity<Usuario> addUsuario(@RequestBody Usuario usuario){
		Usuario result = usuarioSer.addUsuario(usuario);
		if(result != null)
			return new ResponseEntity<Usuario>(result, HttpStatus.CREATED);
		return new ResponseEntity<Usuario>(result, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping()
	public ResponseEntity<List<Usuario>> listUsuarios(){
		List<Usuario> usuarios = usuarioSer.findAll();
		return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	public void deleteUsuario(@PathVariable Long id) {
		usuarioSer.removeUsuario(id);
	}
	@GetMapping("/{id}")
	public ResponseEntity<Usuario> showUsuario(@PathVariable Long id){
		return new ResponseEntity<Usuario>(usuarioSer.findById(id), HttpStatus.OK);
	}
	
}
