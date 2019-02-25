package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.NonProductionEvent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NonProductionEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NonProductionEventRepository extends JpaRepository<NonProductionEvent, Long> {

}
