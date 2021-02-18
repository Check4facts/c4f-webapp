package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.KombuMessage;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@SuppressWarnings("unused")
@Repository
public interface KombuMessageRepository extends JpaRepository<KombuMessage, Integer> {

    @Query(value = "SELECT km FROM kombu_message km " +
        "WHERE km.timestamp BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW() AND " +
        "km.payload LIKE '%' || :task_id || '%'", nativeQuery = true)
    Optional<KombuMessage> findKombuMessageByTaskIdInLast24Hours(@Param(value = "task_id") String task_id);

    @Query(value = "select km from KombuMessage km " +
        "where km.payload like %:task_id%")
    Optional<KombuMessage> findKombuMessageByTaskId(@Param(value = "task_id") String task_id);

    @Query(value = "SELECT * FROM kombu_message km " +
        "WHERE km.timestamp BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW()", nativeQuery = true)
    List<KombuMessage> findAllInLast24Hours();
}
