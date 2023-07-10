package com.officina.service;

import java.util.Optional;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.officina.entity.Persona;
import com.officina.repository.PersonaRepository;

@Service
public class PersonaService {

	@Autowired
	PersonaRepository personaR;
	@Autowired
	EmailSenderService emailsender;

	public PersonaService(PersonaRepository p) {
		this.personaR = p;
	}

	public Persona controlloLogin(Persona p) {
		String codiceFiscale = p.getCodiceFiscale();
		String password = p.getPassword();

		Persona personaAutenticata = controlloCredenziali(codiceFiscale, password);
		if (personaAutenticata != null) {
			if (personaAutenticata.getRuolo() != -1) {
				return personaAutenticata;
			}
		}
		return null;
	}

	/*
	 * QUESTA è LA LOGICA CON LA QUALE VIENE CREATA UNA NUOVA PERSONA/UTENTE
	 * ALL'INTERNO DEL DATABASE, ISTANZIO UN OGGETTO DI TIPO PERSONA VUOTO E TRAMITE
	 * I SETTER RIEMPIO I VARI ATTRIBUTI CON QUELLI PASSATI DA PARAMETRO, L'UTENTE
	 * PRIMA DI ESSERE CREATO FA UN CONTROLLO SULLA PRESENZA DI UN EVENTUALE CODICE
	 * FISCALE GIA ALL'INTERNO DEL DB SE VIENE TROVATO,L'UTENTE NON VIENE CREATO E
	 * VIENE REINDIRIZZATO SULLA PAGINA DI CREAZIONE DELLA PERSONA
	 */
	public boolean inserisciPersona(Persona persona) {
		Persona existingPersona = personaR.findByCodiceFiscale(persona.getCodiceFiscale());
		if (existingPersona != null) {
			return false; // La persona esiste già nel database
		}

		persona.setPassword(GeneraPassword());
		Persona savedPersona = personaR.save(persona);

		if (savedPersona != null) {
			String subject = "Registrazione completata";
			String body = "Gentile " + savedPersona.getNome()
					+ ",\nLa tua registrazione è stata completata con successo.\n"
					+ "Di seguito troverai le tue credenziali di accesso:\n" + "Username: "
					+ savedPersona.getCodiceFiscale() + "\n" + "Password: " + savedPersona.getPassword();

			emailsender.sendEmail(savedPersona.getEmail(), subject, body);
		}

		return true;
	}

//	
	// MI RESTITUISCE TUTTI GLI UTENTI CHE SONOI STATI INSERITI NEL DATABASE
	public Iterable<Persona> findAllPersone() {
		return personaR.findAll();
	}

	/*
	 * IL METODO RECUPERA PASSOWRD VIENE UTILIZZATO NELLA SEZIONE APPOSITA QUANDO UN
	 * QUALSIASI UTENTE NON SI RICORDA LA PASSWORD VIENE CERCATO NEL
	 * DATABASE,ATTRAVERSO IL METODO NEL REPO,LA PERSONA TRAMTIE IL CODICE FISCALE
	 * INSERITO NEL F.E E VIENE GENERATA E INVIATA UN EMAIL ASSOCIATA A QUEL CODICE
	 * FISCALE
	 */
	public boolean recuperoPassword(String codF) {
		Persona persona = personaR.findByCodiceFiscale(codF);
		if (persona != null) {
			String subject = "Recupero Password";
			String body = "Gentile " + ",\n Il recupero password è stato effettuato con successo.\n"
					+ "Di seguito troverai le tue credenziali di accesso:\n" + "Username: " + persona.getCodiceFiscale()
					+ "\n" + "Password: " + persona.getPassword();

			emailsender.sendEmail(persona.getEmail(), subject, body);
			return true;
		}
		return false;
	}

	public Persona controlloCredenziali(String codF, String password) {
		Persona persona = personaR.findByCodiceFiscale(codF);

		if (persona != null && (persona.getPassword().equals(password))) {
			return persona;
		}

		return null;
	}

	public String GeneraPassword() {
		StringBuilder sb = new StringBuilder();
		Random random = new Random();
		final String CARATTERI_PASSWORD = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
		final int LUNGHEZZA_PASSWORD = 12;
		for (int i = 0; i < LUNGHEZZA_PASSWORD; i++) {
			int index = random.nextInt(CARATTERI_PASSWORD.length());
			char carattere = CARATTERI_PASSWORD.charAt(index);
			sb.append(carattere);
		}
		return sb.toString();
	}

	public boolean modificaPersona(Persona p) {
		Optional<Persona> optionalPersona = personaR.findById(p.getId());
		if (optionalPersona.isPresent()) {
			Persona personaDB = optionalPersona.get();

			if (!personaR.existsByCodiceFiscaleAndIdNot(p.getCodiceFiscale(), p.getId())) {
				personaDB.setNome(p.getNome());
				personaDB.setCognome(p.getCognome());
				personaDB.setEmail(p.getEmail());
				personaDB.setCodiceFiscale(p.getCodiceFiscale());
				personaDB.setRuolo(p.getRuolo());
				personaR.save(personaDB);
				return true;
			} else {
				// Codice fiscale duplicato nel database, gestisci l'errore di conseguenza
				// Ad esempio, puoi lanciare un'eccezione o restituire un messaggio di errore
				return false;
			}
		} else {
			// La persona non è presente nel database, gestisci l'errore di conseguenza
			// Ad esempio, puoi lanciare un'eccezione o restituire un messaggio di errore
			return false;
		}
	}

	public boolean eliminaPersona(Long id) {
		if (!personaR.existsById(id)) {
			return false;
		}
		personaR.deleteById(id);
		return true;
	}

	public Persona getPersonaByCodiceFiscale(String codiceFiscale) {
		return personaR.findByCodiceFiscale(codiceFiscale);
	}

	public Optional<Persona> PersonaId(Long id) {
		return personaR.findById(id);
	}
}
