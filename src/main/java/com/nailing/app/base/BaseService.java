package com.nailing.app.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nailing.app.centro.Centro;

@Service("baseService")
public class BaseService {

	@Autowired
	private BaseRepository baseRepository;
	
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
	
//	encontrar los centros que usan una base
	public List<Centro> findCentrosById(Long id) {
		return baseRepository.findCentroById(id);
	}
	
//	borrar una base
	public void removeBase(Long id) {
		Base base = findById(id);
		if(base!=null)
			baseRepository.delete(base);
	}
}
