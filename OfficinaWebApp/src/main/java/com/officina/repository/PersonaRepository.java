package com.officina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.officina.entity.Persona;


public interface PersonaRepository extends JpaRepository<Persona, Long> {
	
	Persona findByCodiceFiscale(String codF);
	boolean existsByCodiceFiscale(String codF);
	boolean existsByCodiceFiscaleAndIdNot(String codiceFiscale, Long id);


}
