package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.Statement;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Statement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatementRepository extends JpaRepository<Statement, Long> {
}
