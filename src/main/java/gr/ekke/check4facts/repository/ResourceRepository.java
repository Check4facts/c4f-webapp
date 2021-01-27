package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.Resource;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Resource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    Page<Resource> findAllByStatementId(Long statement_id, Pageable pageable);

    @Query("select r from Resource r " +
        "where r.statement.id = :statement_id and r.harvestIteration = " +
        "(select max(re.harvestIteration) from Resource re where re.statement.id = :statement_id)")
    List<Resource> findAllLatestByStatementId(@Param(value = "statement_id")Long statement_id);
}
