package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.ScheduleEvent;
import io.github.jhipster.application.repository.ScheduleEventRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ScheduleEvent.
 */
@RestController
@RequestMapping("/api")
public class ScheduleEventResource {

    private final Logger log = LoggerFactory.getLogger(ScheduleEventResource.class);

    private static final String ENTITY_NAME = "scheduleEvent";

    private final ScheduleEventRepository scheduleEventRepository;

    public ScheduleEventResource(ScheduleEventRepository scheduleEventRepository) {
        this.scheduleEventRepository = scheduleEventRepository;
    }

    /**
     * POST  /schedule-events : Create a new scheduleEvent.
     *
     * @param scheduleEvent the scheduleEvent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scheduleEvent, or with status 400 (Bad Request) if the scheduleEvent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/schedule-events")
    public ResponseEntity<ScheduleEvent> createScheduleEvent(@Valid @RequestBody ScheduleEvent scheduleEvent) throws URISyntaxException {
        log.debug("REST request to save ScheduleEvent : {}", scheduleEvent);
        if (scheduleEvent.getId() != null) {
            throw new BadRequestAlertException("A new scheduleEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ScheduleEvent result = scheduleEventRepository.save(scheduleEvent);
        return ResponseEntity.created(new URI("/api/schedule-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /schedule-events : Updates an existing scheduleEvent.
     *
     * @param scheduleEvent the scheduleEvent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scheduleEvent,
     * or with status 400 (Bad Request) if the scheduleEvent is not valid,
     * or with status 500 (Internal Server Error) if the scheduleEvent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/schedule-events")
    public ResponseEntity<ScheduleEvent> updateScheduleEvent(@Valid @RequestBody ScheduleEvent scheduleEvent) throws URISyntaxException {
        log.debug("REST request to update ScheduleEvent : {}", scheduleEvent);
        if (scheduleEvent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ScheduleEvent result = scheduleEventRepository.save(scheduleEvent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scheduleEvent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /schedule-events : get all the scheduleEvents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of scheduleEvents in body
     */
    @GetMapping("/schedule-events")
    public List<ScheduleEvent> getAllScheduleEvents() {
        log.debug("REST request to get all ScheduleEvents");
        return scheduleEventRepository.findAll();
    }

    /**
     * GET  /schedule-events/:id : get the "id" scheduleEvent.
     *
     * @param id the id of the scheduleEvent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scheduleEvent, or with status 404 (Not Found)
     */
    @GetMapping("/schedule-events/{id}")
    public ResponseEntity<ScheduleEvent> getScheduleEvent(@PathVariable Long id) {
        log.debug("REST request to get ScheduleEvent : {}", id);
        Optional<ScheduleEvent> scheduleEvent = scheduleEventRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(scheduleEvent);
    }

    /**
     * DELETE  /schedule-events/:id : delete the "id" scheduleEvent.
     *
     * @param id the id of the scheduleEvent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/schedule-events/{id}")
    public ResponseEntity<Void> deleteScheduleEvent(@PathVariable Long id) {
        log.debug("REST request to delete ScheduleEvent : {}", id);
        scheduleEventRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
