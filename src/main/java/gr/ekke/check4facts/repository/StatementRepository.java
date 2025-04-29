package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.Statement;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;

/**
 * Spring Data  repository for the Statement entity.
 */
@Repository
public interface StatementRepository extends JpaRepository<Statement, Long> {
    @Modifying
    @Query("update Statement s set s.factCheckerAccuracy = :accuracy where s.id = :id")
    Integer setFactCheckerAccuracy(@Param(value = "id") Long id, @Param(value = "accuracy") Integer accuracy);

    @Modifying
    @Query("update Statement s set s.registrationDate = :date where s.id = :id")
    Integer setRegistrationDate(@Param(value = "id") Long id, @Param(value = "date") Instant date);
}
