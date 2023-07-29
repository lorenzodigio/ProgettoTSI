package com.officina.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.officina.entity.Pratica;

public interface PraticaRepository extends JpaRepository<Pratica, Long> {
    @Query("SELECT p FROM Pratica p WHERE p.incorso = 4 ORDER BY p.finePratica ASC")
    List<Pratica> findPraticaByStato();

    @Query("SELECT p FROM Pratica p WHERE p.incorso < 4")
    List<Pratica> findPraticaInLavorazione();

    List<Pratica> findAllByFkIdPersona(Long FkId);
    
    @Query("SELECT p FROM Pratica p WHERE p.incorso < 4 AND p.fkIdPersona = :FkIdPersona")
    Pratica findPraticaByPersona(@Param("FkIdPersona") Long FkIdPersona);
    
    @Query("SELECT p FROM Pratica p WHERE p.incorso < 4 AND p.fkIdPersona = :FkIdPersona")
    List<Pratica> findPraticaInLavorazioneByUser(@Param("FkIdPersona") Long FkIdPersona);

    @Query("SELECT p FROM Pratica p WHERE p.incorso = 4 AND p.fkIdPersona = :FkIdPersona")
    List<Pratica> findPraticaChiusaByUser(@Param("FkIdPersona") Long FkIdPersona);

}

