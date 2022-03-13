package com.nailing.app.base;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("baseRepository")
public interface BaseRepository extends JpaRepository<Base, Serializable>{
	
	public Base findById(int id);
	
//	public List<Base> 
}
