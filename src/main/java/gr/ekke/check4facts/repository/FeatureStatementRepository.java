package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.FeatureStatement;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@SuppressWarnings("unused")
@Repository
public interface FeatureStatementRepository extends JpaRepository<FeatureStatement, Long> {
    List<FeatureStatement> findAllByStatementId(Long statement_id);

    Integer countAllByStatementId(Long statement_id);

    @Modifying
    @Query("update FeatureStatement f set f.trueLabel = :label where f.id = :id")
    void setTrueLabel(@Param(value = "id") Long id, @Param(value = "label") Boolean label);
}
