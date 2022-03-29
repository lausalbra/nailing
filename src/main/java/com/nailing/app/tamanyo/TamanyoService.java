package com.nailing.app.tamanyo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nailing.app.decoracion.Decoracion;
import com.nailing.app.forma.Forma;
import com.nailing.app.forma.FormaRepository;

@Service("tamanyoService")
public class TamanyoService {
	
	@Autowired
	private TamanyoRepository tamRepository;
	@Autowired
	private FormaRepository formaRepository;
	
//	guardar/editar
	public Tamanyo addTamanyo(Tamanyo tam) {
		
		return tamRepository.save(tam);
	}
	
//	encontrar Tamanyo por su ID
	public Tamanyo findById(Long id) {
		return tamRepository.findById(id);
	}
	
//	todos los tamanyos
	public List<Tamanyo> findAll(){
		return tamRepository.findAll();
	}
	
//	borrar un Tamanyo por su ID
	public void removeTamanyo(Long id) {
		Tamanyo tam = findById(id);
		if(tam!=null)
			tamRepository.delete(tam);
	}
	public void removeTamanyobyCentro(Long centroId) {
		List<Tamanyo> tamanyos = tamRepository.findByCentro(centroId);
		for (Tamanyo t : tamanyos) {
			removeTamanyo(t.getId());
		}
	}
//	encontrar los tamanyos que posee el centro dado según la forma seleccionada
	public List<Tamanyo> findTamanyosByCentroForma(Long formaId, Long centroId) {
		Forma forma = formaRepository.findById(formaId).get();
		List<Tamanyo> result = new ArrayList<>();
		List<NombreTamanyo> tams = null;
		List<Tamanyo> tamsCentro = tamRepository.findByCentro(centroId);
		
		switch(forma.getNombre()) {
		case ALMOND:
			tams = Arrays.asList(NombreTamanyo.XS, NombreTamanyo.S, NombreTamanyo.M, NombreTamanyo.L, NombreTamanyo.XL, NombreTamanyo.XXL,
									NombreTamanyo.RELLENO);
			break;
		
		case STILETTO: case BALLERINA:	
			tams = Arrays.asList(NombreTamanyo.M, NombreTamanyo.L, NombreTamanyo.XL, NombreTamanyo.XXL, NombreTamanyo.RELLENO);
			break;
			
		default:
			tams = Arrays.asList(NombreTamanyo.values());
			break;
			
		}
		
		for(Tamanyo t: tamsCentro) {
			if(tams.contains(t.getNombre())){
				result.add(t);
			}
		}
		
		return result;
	}
}
