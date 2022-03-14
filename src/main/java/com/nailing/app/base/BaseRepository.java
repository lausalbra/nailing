package com.nailing.app.base;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("baseRepository")
public interface BaseRepository extends JpaRepository<Base, Serializable>{
	
//	encontrar base por su ID
	public Base findById(Long id);
}
