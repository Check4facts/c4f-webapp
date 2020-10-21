package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.StatementSource;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the StatementSource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatementSourceRepository extends JpaRepository<StatementSource, Long> {
}
