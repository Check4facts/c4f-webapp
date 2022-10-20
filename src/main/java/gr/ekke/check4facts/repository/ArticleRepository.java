package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.Article;

import gr.ekke.check4facts.domain.FeatureStatement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Article entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    Page<Article> findAllByPublishedAndCategory_Name(Boolean published,String category, Pageable pageable);

    Page<Article> findAllByCategory_Name(String category, Pageable pageable);

    Page<Article> findAllByPublishedTrue(Pageable pageable);

    Page<Article> findAllByPublishedTrueAndCategory_NameIn(List<String> categories, Pageable pageable);


    Optional<Article> findArticleByStatementId(Long statement_id);

}
