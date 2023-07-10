package com.officina.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "pratica")
public class Pratica {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_pratica")
	private Long id;
	
	@Column(name = "nome_pratica")
	private String nomePratica;
	
	@Column(name = "inizio_pratica")
	private Date inizioPratica;
	
	@Column(name = "fine_pratica")
	private Date finePratica;
	
	@Column(name = "incorso")
	private Long incorso;
	
	@Lob
	@Column(name = "descrizione")
	private String descrizione;
	
	@Column(name = "fk_id_vettura")
	private Long fkIdVettura;
	
	@Column(name = "fk_id_persona")
	private Long fkIdPersona;
	
	public Pratica() {
	}

	public Pratica(Long id, String nomePratica, Date inizioPratica, Date finepratica, Long incorso, String descrizione,Long fk_id_vettura,Long fk_id_persona) {
		this.id = id;
		this.nomePratica = nomePratica;
		this.inizioPratica = inizioPratica;
		this.finePratica = finepratica;
		this.incorso = incorso;
		this.fkIdVettura = fk_id_vettura;
		this.fkIdPersona = fk_id_persona;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomePratica() {
		return nomePratica;
	}

	public void setNomePratica(String nomePratica) {
		this.nomePratica = nomePratica;
	}

	public Date getInizioPratica() {
		return inizioPratica;
	}

	public void setInizioPratica(Date inizioPratica) {
		this.inizioPratica = inizioPratica;
	}

	public Date getFinePratica() {
		return finePratica;
	}

	public void setFinePratica(Date finepratica) {
		this.finePratica = finepratica;
	}

	public Long getIncorso() {
	    return incorso;
	}

	public void setIncorso(Long incorso) {
	    this.incorso = incorso;
	}

	public String getDescrizione() {
		return descrizione;
	}

	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}

	public Long getFkIdVettura() {
	    return fkIdVettura;
	}

	public void setFkIdVettura(Long fk_id_vettura) {
	    this.fkIdVettura = fk_id_vettura;
	}

	public Long getFkIdPersona() {
	    return fkIdPersona;
	}

	public void setFkIdPersona(Long fk_id_persona) {
	    this.fkIdPersona = fk_id_persona;
	}
}
