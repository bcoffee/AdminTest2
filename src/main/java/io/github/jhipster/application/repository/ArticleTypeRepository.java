package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ArticleType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ArticleType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleTypeRepository extends JpaRepository<ArticleType, Long> {

}
