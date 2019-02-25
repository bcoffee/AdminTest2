package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.ArticleType;
import io.github.jhipster.application.repository.ArticleTypeRepository;
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
 * REST controller for managing ArticleType.
 */
@RestController
@RequestMapping("/api")
public class ArticleTypeResource {

    private final Logger log = LoggerFactory.getLogger(ArticleTypeResource.class);

    private static final String ENTITY_NAME = "articleType";

    private final ArticleTypeRepository articleTypeRepository;

    public ArticleTypeResource(ArticleTypeRepository articleTypeRepository) {
        this.articleTypeRepository = articleTypeRepository;
    }

    /**
     * POST  /article-types : Create a new articleType.
     *
     * @param articleType the articleType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new articleType, or with status 400 (Bad Request) if the articleType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/article-types")
    public ResponseEntity<ArticleType> createArticleType(@Valid @RequestBody ArticleType articleType) throws URISyntaxException {
        log.debug("REST request to save ArticleType : {}", articleType);
        if (articleType.getId() != null) {
            throw new BadRequestAlertException("A new articleType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArticleType result = articleTypeRepository.save(articleType);
        return ResponseEntity.created(new URI("/api/article-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /article-types : Updates an existing articleType.
     *
     * @param articleType the articleType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated articleType,
     * or with status 400 (Bad Request) if the articleType is not valid,
     * or with status 500 (Internal Server Error) if the articleType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/article-types")
    public ResponseEntity<ArticleType> updateArticleType(@Valid @RequestBody ArticleType articleType) throws URISyntaxException {
        log.debug("REST request to update ArticleType : {}", articleType);
        if (articleType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ArticleType result = articleTypeRepository.save(articleType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, articleType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /article-types : get all the articleTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of articleTypes in body
     */
    @GetMapping("/article-types")
    public List<ArticleType> getAllArticleTypes() {
        log.debug("REST request to get all ArticleTypes");
        return articleTypeRepository.findAll();
    }

    /**
     * GET  /article-types/:id : get the "id" articleType.
     *
     * @param id the id of the articleType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the articleType, or with status 404 (Not Found)
     */
    @GetMapping("/article-types/{id}")
    public ResponseEntity<ArticleType> getArticleType(@PathVariable Long id) {
        log.debug("REST request to get ArticleType : {}", id);
        Optional<ArticleType> articleType = articleTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(articleType);
    }

    /**
     * DELETE  /article-types/:id : delete the "id" articleType.
     *
     * @param id the id of the articleType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/article-types/{id}")
    public ResponseEntity<Void> deleteArticleType(@PathVariable Long id) {
        log.debug("REST request to delete ArticleType : {}", id);
        articleTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
