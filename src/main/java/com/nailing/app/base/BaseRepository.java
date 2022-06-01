package com.nailing.app.base;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("baseRepository")
public interface BaseRepository extends JpaRepository<Base, Serializable>{
	
//	encontrar base por su ID
	public Base findById(Long id);
	
//	encontrar las bases de un centro concreto por su ID
	@Query("SELECT base from Base base where base.centro.id = ?1")
	public List<Base> findByCentro(Long id);
}
