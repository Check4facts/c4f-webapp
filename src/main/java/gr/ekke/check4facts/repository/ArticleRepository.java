package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.Article;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Spring Data  repository for the Article entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleRepository extends JpaRepository<Article, UUID> {

    Page<Article> findAllByPublishedAndCategory_Name(Boolean published,String category, Pageable pageable);

    Page<Article> findAllByCategory_Name(String category, Pageable pageable);

    Page<Article> findAllByPublishedTrue(Pageable pageable);
}
