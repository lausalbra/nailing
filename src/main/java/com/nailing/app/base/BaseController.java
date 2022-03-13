package com.nailing.app.base;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bases")
public class BaseController {
	
//	Prueba del RestController
//	
//	@GetMapping("/check")
//	public ResponseEntity<Base> checkBases(){
//		Base base = new Base(0, "BaseCheck", 10.12, 15.5, null);
//		return new ResponseEntity<Base>(base, HttpStatus.OK);
//	}
}
