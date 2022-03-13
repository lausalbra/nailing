package com.nailing.app.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("baseService")
public class BaseService {

	@Autowired
	private BaseRepository baseRepository;
	
//	guardar/editar
	public Base addBase(Base base) {
		return baseRepository.save(base);
	}
	
//	encontrar por Id de la base
	public Base findById(int id) {
		return baseRepository.findById(id);
	}
	
//	encontrar las bases que usa un centro
//	public findByCentro(int id) {
//		
//	}
}
