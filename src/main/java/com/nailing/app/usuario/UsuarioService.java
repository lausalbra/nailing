package com.nailing.app.usuario;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;







@Service("usuarioService")
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepo;
	
	//añadir-actualizar usuario
	public Usuario addUsuario(Usuario usuario) {
		return usuarioRepo.save(usuario);
	}
	//encontrar usuario por su id
	public Usuario findById(Long id) {
		return usuarioRepo.findById(id);
	}
	public void removeUsuario(Long id) {
		Usuario usuario = findById(id);
		if(usuario!=null)
			usuarioRepo.delete(usuario);
	}
	
	public List<Usuario> findAll(){
		return usuarioRepo.findAll();
	}
}
