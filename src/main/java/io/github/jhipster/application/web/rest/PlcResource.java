package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Plc;
import io.github.jhipster.application.repository.PlcRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Plc.
 */
@RestController
@RequestMapping("/api")
public class PlcResource {

    private final Logger log = LoggerFactory.getLogger(PlcResource.class);

    private static final String ENTITY_NAME = "plc";

    private final PlcRepository plcRepository;

    public PlcResource(PlcRepository plcRepository) {
        this.plcRepository = plcRepository;
    }

    /**
     * POST  /plcs : Create a new plc.
     *
     * @param plc the plc to create
     * @return the ResponseEntity with status 201 (Created) and with body the new plc, or with status 400 (Bad Request) if the plc has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/plcs")
    public ResponseEntity<Plc> createPlc(@RequestBody Plc plc) throws URISyntaxException {
        log.debug("REST request to save Plc : {}", plc);
        if (plc.getId() != null) {
            throw new BadRequestAlertException("A new plc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Plc result = plcRepository.save(plc);
        return ResponseEntity.created(new URI("/api/plcs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /plcs : Updates an existing plc.
     *
     * @param plc the plc to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated plc,
     * or with status 400 (Bad Request) if the plc is not valid,
     * or with status 500 (Internal Server Error) if the plc couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/plcs")
    public ResponseEntity<Plc> updatePlc(@RequestBody Plc plc) throws URISyntaxException {
        log.debug("REST request to update Plc : {}", plc);
        if (plc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Plc result = plcRepository.save(plc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, plc.getId().toString()))
            .body(result);
    }

    /**
     * GET  /plcs : get all the plcs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of plcs in body
     */
    @GetMapping("/plcs")
    public List<Plc> getAllPlcs() {
        log.debug("REST request to get all Plcs");
        return plcRepository.findAll();
    }

    /**
     * GET  /plcs/:id : get the "id" plc.
     *
     * @param id the id of the plc to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the plc, or with status 404 (Not Found)
     */
    @GetMapping("/plcs/{id}")
    public ResponseEntity<Plc> getPlc(@PathVariable Long id) {
        log.debug("REST request to get Plc : {}", id);
        Optional<Plc> plc = plcRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(plc);
    }

    /**
     * DELETE  /plcs/:id : delete the "id" plc.
     *
     * @param id the id of the plc to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/plcs/{id}")
    public ResponseEntity<Void> deletePlc(@PathVariable Long id) {
        log.debug("REST request to delete Plc : {}", id);
        plcRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
