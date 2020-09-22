package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.Article;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Article entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    Page<Article> findAllByCategory_Name(String category, Pageable pageable);
}
