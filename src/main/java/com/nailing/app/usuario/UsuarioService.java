package com.nailing.app.usuario;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service("usuarioService")
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    //añadir-actualizar usuario
    public Usuario addUsuario(Map<String,String> map) {
        String user = map.get("user");
        String contrasenya = map.get("password");
        String email = map.get("email");
        String telefono = map.get("telefono");
        if(user == null || contrasenya == null|| email == null|| telefono == null){
            throw new IllegalArgumentException();
        }

        Usuario usuario = new Usuario(user,contrasenya,email,telefono,"USER");

        return usuarioRepository.save(usuario);
    }
    
    //encontrar usuario por su id
    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }
    
    //encontrar usuario por su usuario
    public Usuario findByUsuario(String usuario) {
        return usuarioRepository.findByUsername(usuario);
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
