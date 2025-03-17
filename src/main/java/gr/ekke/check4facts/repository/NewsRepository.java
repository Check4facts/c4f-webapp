package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.News;
import gr.ekke.check4facts.service.dto.NewsDTO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the News entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    @Query("Select n from News n ORDER BY n.date DESC")
    Page<News> findAllNewsOrderByDateDesc(Pageable pageable);

    Optional<News> findByGreeklish(String greeklish);

    // Fetch only news where greeklish is NULL
    @Query("SELECT new gr.ekke.check4facts.service.dto.NewsDTO(n.id, n.title) FROM News n WHERE n.greeklish IS NULL")
    List<NewsDTO> findNewsWithNullGreeklish();

    // Bulk update greeklish field for a specific news
    @Modifying
    @Query("UPDATE News n SET n.greeklish = :greeklish WHERE n.id = :id")
    int updateGreeklishForNews(@Param("greeklish") String greeklish, @Param("id") Long id);
}
