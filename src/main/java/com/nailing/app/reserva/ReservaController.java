/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.reserva;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author jaime
 */

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReservaController {
    
    @Autowired
    private ReservaService reservaService;
    
    
}
