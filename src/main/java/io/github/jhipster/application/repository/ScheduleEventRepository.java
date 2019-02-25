package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ScheduleEvent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ScheduleEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ScheduleEventRepository extends JpaRepository<ScheduleEvent, Long> {

}
