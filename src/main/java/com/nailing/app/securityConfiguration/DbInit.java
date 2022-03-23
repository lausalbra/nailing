/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.securityConfiguration;

import com.nailing.app.usuario.Usuario;
import com.nailing.app.usuario.UsuarioRepository;
import java.util.Arrays;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author jaime
 */

@Service
public class DbInit implements CommandLineRunner {
    private UsuarioRepository usuarioRepository;
    private PasswordEncoder passwordEncoder;

    public DbInit(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Delete all
        this.usuarioRepository.deleteAll();

        // Crete users
        Usuario usuario1 = new Usuario("usuario1",passwordEncoder.encode("usuario1"),"email@email.com","555555555","USER");
        Usuario usuario2 = new Usuario("usuario1",passwordEncoder.encode("usuario2"),"email2@email.com","55556555","ADMIN");
        List<Usuario> users = Arrays.asList(usuario1,usuario2);

        // Save to db
        this.usuarioRepository.saveAll(users);
    }
    
    //encontrar usuario por usuario contrasenya
    public Usuario findByUsuarioContrasenya(String usuario, String contrasenya) {
        Usuario usuario2 = usuarioRepository.findByUsername(usuario);
        if(usuario2 != null && passwordEncoder.matches(contrasenya, usuario2.getContrasenya())){
            return usuario2;
        }
        return null;
    }
}
