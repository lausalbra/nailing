package com.nailing.app.base;

import org.springframework.stereotype.Component;

@Component("contactConverter")
public class BaseConverter {

////	Transforma la entidad Base en el model BaseModel para ser usado por frontend
//	public Base modelToEntity(BaseModel base) {
//		Base result = new Base();
//		result.setId(base.getId());
//		result.setNombre(base.getNombre());
//		result.setTiempo(base.getTiempo());
//		result.setCoste(base.getCoste());
//		//TODO obtener el Centro a partir de BaseModel.getCentroId
//		return result;
//	}
//	
////	Transforma el modelo BaseModel en la entidad Base para ser usada por backend
//	public BaseModel entityToModel(Base base) {
//		BaseModel result = new BaseModel();
//		result.setId(base.getId());
//		result.setNombre(base.getNombre());
//		result.setTiempo(base.getTiempo());
//		result.setCoste(base.getCoste());
//		result.setCentroId(base.getCentro().getId());
//		return result;
//	}
}