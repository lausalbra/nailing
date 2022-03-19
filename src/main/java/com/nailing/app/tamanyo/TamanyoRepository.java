package com.nailing.app.tamanyo;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("tamanyoRepository")
public interface TamanyoRepository extends JpaRepository<Tamanyo, Serializable>{
	
//	encontrar base por su ID
	public Tamanyo findById(Long id);
	
//	encontrar las bases de un centro concreto por su ID
	@Query("SELECT tam from Tamanyo tam where tam.centro.id = ?1")
	public List<Tamanyo> findByCentro(Long id);
}

