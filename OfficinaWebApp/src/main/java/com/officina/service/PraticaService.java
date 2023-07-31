package com.officina.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.officina.entity.DataModel;
import com.officina.entity.Persona;
import com.officina.entity.Pratica;
import com.officina.entity.Vettura;
import com.officina.repository.PraticaRepository;

@Service
public class PraticaService {
	@Autowired
	PraticaRepository praticaR;
	@Autowired
	
	EmailSenderService emailS;
	public PraticaService(PraticaRepository praticaR) {
		this.praticaR = praticaR;
	}

	public Iterable<Pratica> findPratica() {
		return praticaR.findPraticaInLavorazione();
	}

	public void aggiungiPratica(Pratica pratica) {
		praticaR.save(pratica);
	}

	public boolean findPratica(Long id) {
		Pratica pratica = praticaR.findPraticaByPersona(id);
		if (pratica != null) {
			return true;
		}
		return false;
	}

	public boolean eliminaPratica(Long id) {
		if (!praticaR.existsById(id)) {
			return false;
		}
		praticaR.deleteById(id);
		return true;
	}

	public boolean modificaPratica(Pratica pratica) {
		Optional<Pratica> optionaPratica = praticaR.findById(pratica.getId());
		if (optionaPratica.isPresent()) {
			Pratica praticaDB = optionaPratica.get();

			if (praticaR.existsById(pratica.getId())) {
				praticaDB.setNomePratica(pratica.getNomePratica());
				praticaDB.setInizioPratica(pratica.getInizioPratica());
				praticaDB.setIncorso(pratica.getIncorso());
				if (praticaDB.getIncorso() == 4L) {
					praticaDB.setFinePratica(Date.valueOf(LocalDate.now()));
				}
				praticaDB.setDescrizione(pratica.getDescrizione());
				praticaDB.setFkIdVettura(pratica.getFkIdVettura());
				praticaDB.setFkIdPersona(pratica.getFkIdPersona());
				praticaR.save(praticaDB);
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}

	}

	public List<Pratica> getArchivio() {
		return praticaR.findPraticaByStato();
	}

	public List<Pratica> getPraticheUtente(Long id) {
		return praticaR.findPraticaInLavorazioneByUser(id);
	}

	public List<Pratica> getArchivioUtente(Long id) {
		return praticaR.findPraticaChiusaByUser(id);
	}

	public Pratica getPraticaByPersona(Long idPersona) {

		Pratica pratica = praticaR.findPraticaByPersona(idPersona);
		return pratica;
	}

	public void calcolaStimaChilometraggioTagliando(DataModel data) {
		Vettura vettura = data.getVettura();
		Pratica pratica = data.getPratica();
		Persona persona = data.getPersona();

		// Controllo che i valori siano validi
		if (vettura == null || pratica == null || persona == null) {
			throw new IllegalArgumentException("Vettura, pratica e persona non possono essere nulli");
		}

		// Controllo che la pratica sia associata alla persona e alla vettura
		if (!pratica.getFkIdVettura().equals(vettura.getId()) || !pratica.getFkIdPersona().equals(persona.getId())) {
			throw new IllegalArgumentException("La pratica non è associata alla persona o alla vettura fornita");
		}

		// Ottieni tutte le pratiche aperte dalla stessa persona per la stessa macchina
		List<Pratica> pratiche = praticaR.findPraticaByPersonaAndVettura(persona.getId(), vettura.getId());

		// Ordina le pratiche per data di inizio in ordine decrescente
		pratiche.sort(Comparator.comparing(Pratica::getInizioPratica).reversed());

		// Se ci sono almeno 5 pratiche, calcola il chilometraggio minimo e massimo tra
		// le ultime 5 pratiche
		if (pratiche.size() >= 2) {
			Long chilometraggioMinimo = Long.MAX_VALUE;
			Long chilometraggioMassimo = Long.MIN_VALUE;

			for (int i = 0; i < pratiche.size(); i++) {
				Pratica praticaI = pratiche.get(i);
				Long chilometraggioPratica = data.getVettura().getKilometraggio();

				// Aggiorna il chilometraggio minimo e massimo
				chilometraggioMinimo = Math.min(chilometraggioMinimo, chilometraggioPratica);
				chilometraggioMassimo = Math.max(chilometraggioMassimo, chilometraggioPratica);
			}

			Long stima = chilometraggioMassimo - chilometraggioMinimo;
			if(stima > 10000) {
				String subject = ("Stima chilometraggio tagliando");
		      	String body = ("La stima del chilometraggio per il prossimo tagliando è fra " +  stima +  "Km");
		      	
		    	emailS.sendEmail(persona.getEmail(), subject, body);
			}
		}else {
			String subject = ("Stima chilometraggio tagliando");
	      	String body = ("La stima del chilometraggio per il prossimo tagliando è fra 1 anno");
	      	
	    	emailS.sendEmail(persona.getEmail(), subject, body);
		}
	}
}
