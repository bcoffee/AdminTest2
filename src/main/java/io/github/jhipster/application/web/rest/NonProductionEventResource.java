package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.NonProductionEvent;
import io.github.jhipster.application.repository.NonProductionEventRepository;
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
 * REST controller for managing NonProductionEvent.
 */
@RestController
@RequestMapping("/api")
public class NonProductionEventResource {

    private final Logger log = LoggerFactory.getLogger(NonProductionEventResource.class);

    private static final String ENTITY_NAME = "nonProductionEvent";

    private final NonProductionEventRepository nonProductionEventRepository;

    public NonProductionEventResource(NonProductionEventRepository nonProductionEventRepository) {
        this.nonProductionEventRepository = nonProductionEventRepository;
    }

    /**
     * POST  /non-production-events : Create a new nonProductionEvent.
     *
     * @param nonProductionEvent the nonProductionEvent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nonProductionEvent, or with status 400 (Bad Request) if the nonProductionEvent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/non-production-events")
    public ResponseEntity<NonProductionEvent> createNonProductionEvent(@Valid @RequestBody NonProductionEvent nonProductionEvent) throws URISyntaxException {
        log.debug("REST request to save NonProductionEvent : {}", nonProductionEvent);
        if (nonProductionEvent.getId() != null) {
            throw new BadRequestAlertException("A new nonProductionEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NonProductionEvent result = nonProductionEventRepository.save(nonProductionEvent);
        return ResponseEntity.created(new URI("/api/non-production-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /non-production-events : Updates an existing nonProductionEvent.
     *
     * @param nonProductionEvent the nonProductionEvent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nonProductionEvent,
     * or with status 400 (Bad Request) if the nonProductionEvent is not valid,
     * or with status 500 (Internal Server Error) if the nonProductionEvent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/non-production-events")
    public ResponseEntity<NonProductionEvent> updateNonProductionEvent(@Valid @RequestBody NonProductionEvent nonProductionEvent) throws URISyntaxException {
        log.debug("REST request to update NonProductionEvent : {}", nonProductionEvent);
        if (nonProductionEvent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NonProductionEvent result = nonProductionEventRepository.save(nonProductionEvent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nonProductionEvent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /non-production-events : get all the nonProductionEvents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of nonProductionEvents in body
     */
    @GetMapping("/non-production-events")
    public List<NonProductionEvent> getAllNonProductionEvents() {
        log.debug("REST request to get all NonProductionEvents");
        return nonProductionEventRepository.findAll();
    }

    /**
     * GET  /non-production-events/:id : get the "id" nonProductionEvent.
     *
     * @param id the id of the nonProductionEvent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nonProductionEvent, or with status 404 (Not Found)
     */
    @GetMapping("/non-production-events/{id}")
    public ResponseEntity<NonProductionEvent> getNonProductionEvent(@PathVariable Long id) {
        log.debug("REST request to get NonProductionEvent : {}", id);
        Optional<NonProductionEvent> nonProductionEvent = nonProductionEventRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nonProductionEvent);
    }

    /**
     * DELETE  /non-production-events/:id : delete the "id" nonProductionEvent.
     *
     * @param id the id of the nonProductionEvent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/non-production-events/{id}")
    public ResponseEntity<Void> deleteNonProductionEvent(@PathVariable Long id) {
        log.debug("REST request to delete NonProductionEvent : {}", id);
        nonProductionEventRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
