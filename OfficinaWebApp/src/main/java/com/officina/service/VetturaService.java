package com.officina.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.officina.entity.Vettura;
import com.officina.repository.VetturaRepository;

@Service
public class VetturaService {

	@Autowired
	VetturaRepository vetturaR;
	@Autowired
	EmailSenderService emailsender;

	public VetturaService(VetturaRepository vetturaR) {
		this.vetturaR = vetturaR;
	}

	public Vettura aggiungiVettura(Vettura v) {
		List<Vettura> vettureEsistenti = vetturaR.findByTarga(v.getTarga());
		if (!vettureEsistenti.isEmpty()) {
			return vettureEsistenti.get(0); // Restituisci il primo risultato trovato
		} else {
			return vetturaR.save(v);
		}

	}

	public Iterable<Vettura> findVetture() {
		return vetturaR.findAll();
	}

	public Optional<Vettura> vetturaId(Long idVettura) {
		return vetturaR.findById(idVettura);
	}

	
public List<Vettura> getVettureUtente(Long id) {
		return vetturaR.findAllByFkIdPersona(id);
	}

}
