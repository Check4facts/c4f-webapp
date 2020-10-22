package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.SubTopic;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SubTopic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubTopicRepository extends JpaRepository<SubTopic, Long> {
    List<SubTopic> findAllByStatementId(Long statement_id);
}
