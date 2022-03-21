/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nailing.app.cita;

import com.nailing.app.acabado.Acabado;
import com.nailing.app.acabado.AcabadoService;
import com.nailing.app.base.Base;
import com.nailing.app.base.BaseService;
import com.nailing.app.centro.Centro;
import com.nailing.app.centro.CentroService;
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
import com.nailing.app.usuario.Usuario;
import com.nailing.app.usuario.UsuarioService;
import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Usuario
 */
@Service("citaService")
public class CitaService {
    
    @Autowired
    private CitaRepository citaRepository;
    
    @Autowired
    private DecoracionService decoracionService;
    
    @Autowired
    private DisenyoService disenyoService;
    
    @Autowired
    private BaseService baseService;
    
    @Autowired
    private AcabadoService acabadoService;
    
    @Autowired
    private CentroService centroService;
    
    @Autowired
    private TamanyoService tamanyoService;
    
    @Autowired
    private TipoService tipoService;
    
    @Autowired
    private FormaService formaService;
    
    @Autowired
    private UsuarioService usuarioService;
    
    
    public Cita addCita(Map<String,String> ids){
        Decoracion decoracion = decoracionService.findById(Long.parseLong(ids.get("decoracion")));
        Disenyo disenyo = disenyoService.findById(Long.parseLong(ids.get("disenyo")));
        Base base = baseService.findById(Long.parseLong(ids.get("base")));
        Acabado acabado = acabadoService.findById(Long.parseLong(ids.get("acabado")));
        Tamanyo tamanyo = tamanyoService.findById(Long.parseLong(ids.get("tamanyo")));
        Forma forma = formaService.findById(Long.parseLong(ids.get("forma")));
        Tipo tipo = tipoService.findById(Long.parseLong(ids.get("tipo")));
        
        Usuario usuario = usuarioService.findById(Long.parseLong(ids.get("usuario"))).get();
        Centro centro = centroService.findById(Long.parseLong(ids.get("centro"))).get();
        Double precio = Double.valueOf(ids.get("precio"));
        Integer tiempo = Integer.valueOf(ids.get("tiempo"));
        
        LocalDateTime horaInicio = centro.getHoraApertura();
        LocalDateTime horaFin = horaInicio.plusMinutes(tiempo);
        
        Cita cita = new Cita(precio,horaInicio,horaFin,decoracion,acabado,base,tipo,disenyo,tamanyo,forma,usuario,centro);
        
        return citaRepository.save(cita);
        
        
    }
    
    public Cita findById(Long id){
        return citaRepository.findById(id).get();
    }
    
    public Iterable<Cita> findAll(){
        return citaRepository.findAll();
    }
    
    public void removeUnya(Long id){
        Cita unya = findById(id);
        if(unya != null){
            citaRepository.delete(unya);
        }
    }
}
