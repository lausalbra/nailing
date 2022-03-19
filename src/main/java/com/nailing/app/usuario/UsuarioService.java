package com.nailing.app.usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service("usuarioService")
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    //añadir-actualizar usuario
    public Usuario addUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    //encontrar usuario por su id
    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }
    public void removeUsuario(Long id) {
        Optional<Usuario> usuario = findById(id);
        if(usuario.isPresent()){
            usuarioRepository.delete(usuario.get());
        }
    }

    public List<Usuario> findAll(){
        return (List) usuarioRepository.findAll();
    }
}
