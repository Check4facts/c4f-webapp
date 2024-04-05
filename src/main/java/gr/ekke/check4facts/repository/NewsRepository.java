package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.News;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the News entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    @Query("Select n from News n ORDER BY n.date DESC")
    Page<News> findAllNewsOrderByDateDesc(Pageable pageable);
}
