package com.officina.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.officina.entity.Pratica;
import com.officina.repository.PraticaRepository;

@Service
public class PraticaService {
	@Autowired
	PraticaRepository praticaR;

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

}
