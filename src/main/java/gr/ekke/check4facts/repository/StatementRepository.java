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
    @Modifying
    @Query("update Statement s set s.factCheckerAccuracy = :accuracy where s.id = :id")
    Integer setFactCheckerAccuracy(@Param(value = "id") Long id, @Param(value = "accuracy") Integer accuracy);
}
