package com.nailing.app.tamanyo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("tamanyoService")
public class TamanyoService {
	
	@Autowired
	private TamanyoRepository tamRepository;
	
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
	
//	encontrar los tamanyos que posee el centro dado según la forma seleccionada
	public List<Tamanyo> findTamanyosByCentroForma(Long tipoId, Long centroId) {
		return null;
	}
}
