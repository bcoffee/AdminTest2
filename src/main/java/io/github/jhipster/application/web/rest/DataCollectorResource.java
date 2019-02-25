package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.DataCollector;
import io.github.jhipster.application.repository.DataCollectorRepository;
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
 * REST controller for managing DataCollector.
 */
@RestController
@RequestMapping("/api")
public class DataCollectorResource {

    private final Logger log = LoggerFactory.getLogger(DataCollectorResource.class);

    private static final String ENTITY_NAME = "dataCollector";

    private final DataCollectorRepository dataCollectorRepository;

    public DataCollectorResource(DataCollectorRepository dataCollectorRepository) {
        this.dataCollectorRepository = dataCollectorRepository;
    }

    /**
     * POST  /data-collectors : Create a new dataCollector.
     *
     * @param dataCollector the dataCollector to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dataCollector, or with status 400 (Bad Request) if the dataCollector has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/data-collectors")
    public ResponseEntity<DataCollector> createDataCollector(@Valid @RequestBody DataCollector dataCollector) throws URISyntaxException {
        log.debug("REST request to save DataCollector : {}", dataCollector);
        if (dataCollector.getId() != null) {
            throw new BadRequestAlertException("A new dataCollector cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DataCollector result = dataCollectorRepository.save(dataCollector);
        return ResponseEntity.created(new URI("/api/data-collectors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /data-collectors : Updates an existing dataCollector.
     *
     * @param dataCollector the dataCollector to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dataCollector,
     * or with status 400 (Bad Request) if the dataCollector is not valid,
     * or with status 500 (Internal Server Error) if the dataCollector couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/data-collectors")
    public ResponseEntity<DataCollector> updateDataCollector(@Valid @RequestBody DataCollector dataCollector) throws URISyntaxException {
        log.debug("REST request to update DataCollector : {}", dataCollector);
        if (dataCollector.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DataCollector result = dataCollectorRepository.save(dataCollector);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dataCollector.getId().toString()))
            .body(result);
    }

    /**
     * GET  /data-collectors : get all the dataCollectors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dataCollectors in body
     */
    @GetMapping("/data-collectors")
    public List<DataCollector> getAllDataCollectors() {
        log.debug("REST request to get all DataCollectors");
        return dataCollectorRepository.findAll();
    }

    /**
     * GET  /data-collectors/:id : get the "id" dataCollector.
     *
     * @param id the id of the dataCollector to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dataCollector, or with status 404 (Not Found)
     */
    @GetMapping("/data-collectors/{id}")
    public ResponseEntity<DataCollector> getDataCollector(@PathVariable Long id) {
        log.debug("REST request to get DataCollector : {}", id);
        Optional<DataCollector> dataCollector = dataCollectorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dataCollector);
    }

    /**
     * DELETE  /data-collectors/:id : delete the "id" dataCollector.
     *
     * @param id the id of the dataCollector to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/data-collectors/{id}")
    public ResponseEntity<Void> deleteDataCollector(@PathVariable Long id) {
        log.debug("REST request to delete DataCollector : {}", id);
        dataCollectorRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
