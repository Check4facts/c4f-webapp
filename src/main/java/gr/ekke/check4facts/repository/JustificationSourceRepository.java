package gr.ekke.check4facts.repository;

import java.util.List;

import gr.ekke.check4facts.domain.JustificationSource;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface JustificationSourceRepository extends JpaRepository<JustificationSource, Long> {
    List<JustificationSource> findAllByBlackListedTrue();

    List<JustificationSource> findAllByBlackListedFalse();
}
