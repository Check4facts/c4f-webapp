package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.FeatureStatement;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@SuppressWarnings("unused")
@Repository
public interface FeatureStatementRepository extends JpaRepository<FeatureStatement, Long> {
    List<FeatureStatement> findAllByStatementId(Long statement_id);

    @Modifying
    List<FeatureStatement> deleteByStatementId(Long statement_id);

    Integer countAllByStatementId(Long statement_id);

    @Modifying
    @Query("update FeatureStatement f set f.trueLabel = :label where f.id = :id")
    Integer setTrueLabel(@Param(value = "id") Long id, @Param(value = "label") Boolean label);

    @Query("select f from FeatureStatement f " +
        "where f.statement.id = :statement_id and f.harvestIteration = " +
        "(select max(fs.harvestIteration) from FeatureStatement fs where fs.statement.id = :statement_id)")
    Optional<FeatureStatement> getLatestFeatureStatementByStatementId(@Param(value = "statement_id") Long statement_id);
}
