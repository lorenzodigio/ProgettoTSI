package com.officina.controller;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.officina.entity.DataModel;
import com.officina.entity.Persona;
import com.officina.entity.Pratica;
import com.officina.entity.Vettura;
import com.officina.service.PersonaService;
import com.officina.service.PraticaService;
import com.officina.service.VetturaService;

@RestController
@RequestMapping("/admin/home")
public class AdminController {

	@Autowired
	PersonaService personaS;
	@Autowired
	VetturaService vetturaS;
	@Autowired
	PraticaService praticaS;

	public AdminController(PersonaService personaS, VetturaService vetturaS, PraticaService praticaS) {
		this.personaS = personaS;
		this.vetturaS = vetturaS;
		this.praticaS = praticaS;
	}

	/*
	 * CODICE PERSONA/UTENTE
	 */
	@PostMapping("/salva")
	public ResponseEntity<String> salvaPersona(@RequestBody Persona persona) {

		if (!personaS.inserisciPersona(persona)) {
			return ResponseEntity.badRequest().build();
		} else {
		}
		return ResponseEntity.ok().build();
	}

	@GetMapping("/utenti")
	public ResponseEntity<Iterable<Persona>> utenti() {
		Iterable<Persona> p = personaS.findAllPersone();
		return ResponseEntity.ok(p);
	}

	@PostMapping("/modificaPersona")
	public ResponseEntity<Persona> modifica(@RequestBody Persona p) {
		if (!personaS.modificaPersona(p)) {
			return ResponseEntity.badRequest().build();
		} else {
			return ResponseEntity.ok().build();
		}
	}

	@PostMapping("/eliminaPersona")
	public ResponseEntity<Persona> eliminaPersona(@RequestBody Persona p) {
		if (!personaS.eliminaPersona(p.getId())) {
			return ResponseEntity.badRequest().build();
		} else {
			return ResponseEntity.ok().build();
		}
	}

	/*
	 * CODICE VETTURA
	 */
	@GetMapping("/vetture")
	public ResponseEntity<Iterable<Vettura>> vetture() {
		Iterable<Vettura> v = vetturaS.findVetture();
		return ResponseEntity.ok(v);
	}

	/*
	 * CODICE PRATICA
	 */

	@GetMapping("/pratiche")
	public ResponseEntity<List<DataModel>> pratiche() {
		Iterable<Pratica> praticaList = praticaS.findPratica();

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

	@PostMapping("/aggiungiPratica")
	public ResponseEntity<Pratica> addPratica(@RequestBody DataModel richiesta) {
		Pratica pratica = richiesta.getPratica();
		Vettura v = richiesta.getVettura();
		Persona p = richiesta.getPersona();

		Persona personaEsistente = personaS.getPersonaByCodiceFiscale(p.getCodiceFiscale());
		if (personaEsistente != null) {
			p.setId(personaEsistente.getId());

		} else {
			personaS.inserisciPersona(p);
			personaEsistente = p;
		}
		v.setFk_id_persona(personaEsistente.getId());
		Vettura vetturaInserita = vetturaS.aggiungiVettura(v);
		if (vetturaInserita != null) {
			pratica.setFkIdVettura(vetturaInserita.getId());

		}
		pratica.setFkIdPersona(p.getId());
		praticaS.aggiungiPratica(pratica);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/modificaPratica")
	public ResponseEntity<Pratica> modificaPratica(@RequestBody Pratica pratica) {
		if (!praticaS.modificaPratica(pratica)) {
			return ResponseEntity.badRequest().build();
		} else {
			return ResponseEntity.ok().build();
		}
	}

	@PostMapping("/eliminaPratica")
	public ResponseEntity<Pratica> eliminaPratica(@RequestBody Pratica pratica) {
		if (!praticaS.eliminaPratica(pratica.getId())) {
			return ResponseEntity.badRequest().build();
		} else {
			return ResponseEntity.ok().build();
		}
	}
	
	/*
	 * CODICE ARCHIVIO(PRATICHE CONCLUSE)
	 */
	/*
	 * QUESTO METODO RIPRENDE TUTTE LE PRATICHE CONCLUSE 
	 */
	@GetMapping("/archivio")
	public ResponseEntity<List<DataModel>> getArchivio() {
		List<Pratica> praticaList = praticaS.getArchivio();

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
		return new ResponseEntity<>(richiestaList, HttpStatus.OK);
	}
}
