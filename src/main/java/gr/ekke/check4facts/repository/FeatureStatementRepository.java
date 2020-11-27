package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.FeatureStatement;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@SuppressWarnings("unused")
@Repository
public interface FeatureStatementRepository extends JpaRepository<FeatureStatement, Long> {
    List<FeatureStatement> findAllByStatementId(Long statement_id);
}
