package com.officina.controller;
import com.officina.entity.DataModel;
import com.officina.entity.Persona;
import com.officina.entity.Pratica;
import com.officina.entity.Vettura;
import com.officina.service.PersonaService;
import com.officina.service.PraticaService;
import com.officina.service.VetturaService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UtenteController {
	
	@Autowired PraticaService praticaS;
	@Autowired VetturaService vetturaS;
	@Autowired PersonaService personaS;
	
	public UtenteController(PraticaService praticaS,VetturaService vetturaS,PersonaService personaS) {

		this.praticaS = praticaS;
		this.vetturaS = vetturaS;
		this.personaS = personaS;
	}
	@GetMapping("/home/{id}")
	public ResponseEntity<Iterable<Vettura>> getVettureUtente(@PathVariable Long id) {
	    Iterable<Vettura> vettureList = vetturaS.getVettureUtente(id);
	    return new ResponseEntity<>(vettureList, HttpStatus.OK);
	}
	
	@GetMapping("/home/praticheUtente/{id}")
	public ResponseEntity<Iterable<DataModel>> getPraticheUtente(@PathVariable Long id){
		Iterable<Pratica> praticaList = praticaS.getPraticheUtente(id);

		List<DataModel> richiestaList = new ArrayList<>();
		for (Pratica pratica : praticaList) {
			Long idPersona = pratica.getFkIdPersona();
			Long idVettura = pratica.getFkIdVettura();
			Optional<Vettura> vettura = vetturaS.vetturaId(idVettura);
			Optional<Persona> persona = personaS.PersonaId(idPersona);

			DataModel richiesta = new DataModel();
			richiesta.setPratica(pratica);
			richiesta.setVettura(vettura.orElse(null));
			richiesta.setPersona(persona.orElse(null));
			richiestaList.add(richiesta);
		}

		return ResponseEntity.ok(richiestaList);
	}
	
	@GetMapping("/home/archivioUtente/{id}")
	public ResponseEntity<Iterable<DataModel>> getArchivioUtente(@PathVariable Long id){
		Iterable<Pratica> praticaList = praticaS.getArchivioUtente(id);

		List<DataModel> richiestaList = new ArrayList<>();
		for (Pratica pratica : praticaList) {
			Long idPersona = pratica.getFkIdPersona();
			Long idVettura = pratica.getFkIdVettura();
			Optional<Vettura> vettura = vetturaS.vetturaId(idVettura);
			Optional<Persona> persona = personaS.PersonaId(idPersona);

			DataModel richiesta = new DataModel();
			richiesta.setPratica(pratica);
			richiesta.setVettura(vettura.orElse(null));
			richiesta.setPersona(persona.orElse(null));
			richiestaList.add(richiesta);
		}

		return ResponseEntity.ok(richiestaList);
	}
}
