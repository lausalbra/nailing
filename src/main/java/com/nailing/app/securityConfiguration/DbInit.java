/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.securityConfiguration;

import com.nailing.app.centro.CentroService;
import com.nailing.app.usuario.Authorities;
import com.nailing.app.usuario.Usuario;
import com.nailing.app.usuario.UsuarioRepository;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private CentroService centroSer;
    public DbInit(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Delete all
        this.usuarioRepository.deleteAll();

        // Crete users
        Usuario usuario1 = new Usuario("usuario1",passwordEncoder.encode("usuario1"),"email@email.com","555555555",Authorities.USER);
        Usuario usuario2 = new Usuario("usuario2",passwordEncoder.encode("usuario2"),"email2@email.com","55556555",Authorities.ADMIN);
        System.out.println(centroSer.findById((long) 1).toString());
        Usuario usuario3 = new Usuario("usuario3",passwordEncoder.encode("usuario3"),"email3@email.com","555565585",Authorities.OWNER,centroSer.findById((long)1).get());
        System.out.println(centroSer.findById((long) 2).toString());
        Usuario usuario4 = new Usuario("usuario4",passwordEncoder.encode("usuario4"),"email4@email.com","555565589",Authorities.OWNER,centroSer.findById((long)2).get());
        System.out.println(centroSer.findById((long) 3).toString());
        Usuario usuario5 = new Usuario("usuario5",passwordEncoder.encode("usuario5"),"email5@email.com","655565589",Authorities.OWNER,centroSer.findById((long)3).get());
        List<Usuario> users = Arrays.asList(usuario1,usuario2,usuario3,usuario4,usuario5);

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
