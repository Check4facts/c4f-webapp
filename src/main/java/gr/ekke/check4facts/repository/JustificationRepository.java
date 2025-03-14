package gr.ekke.check4facts.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import gr.ekke.check4facts.domain.Justification;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the Justification entity.
 */
@Repository
public interface JustificationRepository extends JpaRepository<Justification, Long> {
    @Query("SELECT j FROM Justification j ORDER BY j.timestamp DESC")
    Page<Justification> findAllByTimestampDesc(Pageable pageable);
}
