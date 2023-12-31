package com.officina.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.officina.entity.Vettura;
import com.officina.exception.VetturaExistException;
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
		Vettura vettureEsistenti = vetturaR.findByTarga(v.getTarga());
		if (vettureEsistenti != null) {
			throw new VetturaExistException();
		} else {
		String targa = v.getTarga();
		String formatTarga = targa.replaceAll("\s+", "");
		v.setTarga(formatTarga);
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
	
	public Vettura findVettura(String targa) {
		Vettura vettura = vetturaR.findByTarga(targa);
		if(vettura != null) {
			return vettura;
		}
		return null;

	}
	public Optional<Vettura> findVetturaId(Long id) {
		return vetturaR.findById(id);
	}
}

