package com.nailing.tests;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.nailing.app.centro.CentroRepository;
import com.nailing.app.centro.CentroService;


class ListarCentrosTest {

	@Autowired
	private CentroService centroSer;
	
	@Test
	void test() {
		System.out.println(centroSer.findAll());
	}

}
