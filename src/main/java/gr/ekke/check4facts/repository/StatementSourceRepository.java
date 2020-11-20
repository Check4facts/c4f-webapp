package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.StatementSource;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Spring Data  repository for the StatementSource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatementSourceRepository extends JpaRepository<StatementSource, UUID> {
    List<StatementSource> findAllByStatementId(UUID statement_id);
}
