package com.nailing.app.base;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nailing.app.centro.Centro;

@Repository("baseRepository")
public interface BaseRepository extends JpaRepository<Base, Serializable>{
	
	public Base findById(Long id);
	
	@Query("SELECT b.centros FROM Base b where b.id = :id")
	public List<Centro> findCentroById(Long id);
}
