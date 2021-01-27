package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.Statement;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Statement entity.
 */
@Repository
public interface StatementRepository extends JpaRepository<Statement, Long> {

    @Query(value = "select distinct statement from Statement statement left join fetch statement.subTopics",
        countQuery = "select count(distinct statement) from Statement statement")
    Page<Statement> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct statement from Statement statement left join fetch statement.subTopics")
    List<Statement> findAllWithEagerRelationships();

    @Query("select statement from Statement statement left join fetch statement.subTopics where statement.id =:id")
    Optional<Statement> findOneWithEagerRelationships(@Param("id") Long id);

    @Modifying
    @Query("update Statement s set s.factCheckerLabel = :label where s.id = :id")
    Integer setFactCheckerLabel(@Param(value = "id") Long id, @Param(value = "label") Boolean label);
}
