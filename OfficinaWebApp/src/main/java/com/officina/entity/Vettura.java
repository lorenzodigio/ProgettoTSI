package com.officina.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="vettura")
public class Vettura {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_vettura")
	private Long id;
	
	@Column(name = "targa")
	private String targa;
	
	@Column(name = "modello")
	private String modello;
	
	@Column(name = "immatricolazione")
	private Date immatricolazione;
	
	@Column(name = "kilometraggio")
	private Long kilometraggio;
	
	@Column(name = "tagliando")
	private Date tagliando;
	
	@Column(name = "fk_id_persona_vettura")
	private Long fkIdPersona;
	
	public Vettura() {}
	
	public Vettura(Long id, String targa, String modello, Date immatricolazione, Long kilometraggio,Date tagliando) {
		this.id = id;
		this.targa = targa;
		this.modello = modello;
		this.immatricolazione = immatricolazione;
		this.kilometraggio = kilometraggio;
		this.tagliando = tagliando;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTarga() {
		return targa;
	}

	public void setTarga(String targa) {
		this.targa = targa;
	}

	public String getModello() {
		return modello;
	}

	public void setModello(String modello) {
		this.modello = modello;
	}

	public Date getImmatricolazione() {
		return immatricolazione;
	}

	public void setImmatricolazione(Date immatricolazione) {
		this.immatricolazione = immatricolazione;
	}
	
	public Long getKilometraggio() {
		return kilometraggio;
	}

	public void setKilometraggio(Long kilometraggio) {
		this.kilometraggio = kilometraggio;
	}

	public Date getTagliando() {
		return tagliando;
	}

	public void setTagliando(Date tagliando) {
		this.tagliando = tagliando;
	}

	public Long getFkIdPersona() {
		return fkIdPersona;
	}

	public void setFk_id_persona(Long fk_id_persona) {
		this.fkIdPersona = fk_id_persona;
	}
	
	
}
