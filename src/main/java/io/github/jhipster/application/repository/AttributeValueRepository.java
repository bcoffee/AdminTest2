package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.AttributeValue;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AttributeValue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttributeValueRepository extends JpaRepository<AttributeValue, Long> {

}
