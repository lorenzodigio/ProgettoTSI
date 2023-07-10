package com.officina.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.officina.entity.Persona;
import com.officina.service.PersonaService;

@RestController
@RequestMapping("/login")
public class LoginController {
	@Autowired
	PersonaService personaS;

	@PostMapping("/loginP")
	public ResponseEntity<Persona> loginPost(@RequestBody Persona loginRequest) {
	    Persona authenticatedUser = personaS.controlloLogin(loginRequest);
	    if (authenticatedUser != null) {
	        return new ResponseEntity<>(authenticatedUser, HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	    }
	}

	@GetMapping("/utenti")
	public ResponseEntity<Iterable<Persona>> utenti() {
		Iterable<Persona> p = personaS.findAllPersone();
		return ResponseEntity.ok(p);
	}
	
	@PostMapping("/passD")
	 public ResponseEntity<Object> postPass(@RequestParam("codiceFiscale") String codiceF) {
		 if (!personaS.recuperoPassword(codiceF)) {
			 return ResponseEntity.badRequest().build();
		}
		 return ResponseEntity.ok().build();
	 }
}