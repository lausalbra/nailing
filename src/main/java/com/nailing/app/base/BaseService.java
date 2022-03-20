package com.nailing.app.base;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nailing.app.tipo.Tipo;
import com.nailing.app.tipo.TipoRepository;

@Service("baseService")
public class BaseService {

	@Autowired
	private BaseRepository baseRepository;
	@Autowired
	private TipoRepository tipoRepository;
	
//	guardar/editar
	public Base addBase(Base base) {
		
		return baseRepository.save(base);
	}
	
//	encontrar base por su ID
	public Base findById(Long id) {
		return baseRepository.findById(id);
	}
	
//	todas las bases
	public List<Base> findAll(){
		return baseRepository.findAll();
	}
	
//	borrar una base por su ID
	public void removeBase(Long id) {
		Base base = findById(id);
		if(base!=null)
			baseRepository.delete(base);
	}
	
//	encontrar las bases que posee el centro dado según el tipo seleccionado
	public List<Base> findBasesByCentroTipo(Long tipoId, Long centroId) {
		Optional<Tipo> tipo = tipoRepository.findById(tipoId);
		List<Base> result = new ArrayList<>();
		List<NombreBase> bases;
		List<Base> basesCentro;
		
		switch (tipo.get().getNombre()) {
		case "ESCULPIDA":
			bases = Arrays.asList(NombreBase.DUAL_SYSTEM, NombreBase.GEL, NombreBase.ACRILICO, NombreBase.ACRYGEL);
			basesCentro = baseRepository.findByCentro(centroId);
			
			for(Base b: basesCentro) {
				if(bases.contains(b.getNombre()))
					result.add(b);
			}
			break;

		case "NATURALES":
			bases = Arrays.asList(NombreBase.SEMIPERMANENTE, NombreBase.SEMIPERMANENTE_REFUERZO, NombreBase.JAPONESA);
			basesCentro = baseRepository.findByCentro(centroId);
			
			for(Base b: basesCentro) {
				if(bases.contains(b.getNombre()))
					result.add(b);
			}
			break;
		}
		
		return result;
	}
}
