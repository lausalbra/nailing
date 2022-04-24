package com.nailing.APP;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nailing.app.AppApplication;
import com.nailing.app.tipo.TipoService;

@SpringBootTest(classes = AppApplication.class)
public class TipoServiceTest {

	@Autowired
	private TipoService tipoService;
	
	@BeforeEach
	public void setUp(){
		
	}
	
	@Test
	public void addTipoTest() {
		
	}
}
