package com.officina.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.officina.entity.Vettura;

public interface VetturaRepository extends JpaRepository<Vettura, Long> {

	List<Vettura> findByTarga(String targa);
	
	boolean existsByTarga(String targa);
	
	List<Vettura> findAllByFkIdPersona(Long FkId);
}
