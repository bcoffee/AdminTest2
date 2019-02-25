package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Plc;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Plc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlcRepository extends JpaRepository<Plc, Long> {

}
