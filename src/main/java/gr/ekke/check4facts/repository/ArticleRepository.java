package gr.ekke.check4facts.repository;

import gr.ekke.check4facts.domain.Article;

import gr.ekke.check4facts.domain.FeatureStatement;
import gr.ekke.check4facts.service.dto.ArticleDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
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
    
    List<Article> findFirst4ByPublishedTrueAndCategory_NameOrderByArticleDateDesc(String category);

    Optional<Article> findArticleByStatementId(Long statement_id);

    Article findById(Integer id);

    @Query("SELECT a FROM Article a " +
            "WHERE a.category.name = :categoryName " +
            "AND a.published = true " +
            "ORDER BY CASE " +
            "WHEN a.articleDateUpdated IS NOT NULL THEN a.articleDateUpdated " +
            "ELSE a.articleDate " +
            "END DESC")
    List<Article> findTop4LatestArticlesByCategoryName(@Param("categoryName") String categoryName, Pageable pageable);

    // Fetch only articles where greeklish is NULL
    @Query("SELECT new gr.ekke.check4facts.service.dto.ArticleDTO(a.id, a.previewTitle) FROM Article a WHERE a.greeklish IS NULL")
    List<ArticleDTO> findArticlesWithNullGreeklish();

    // Bulk update greeklish field for a specific article
    @Modifying
    @Query("UPDATE Article a SET a.greeklish = :greeklish WHERE a.id = :id")
    int updateGreeklishForArticle(@Param("greeklish") String greeklish, @Param("id") Long id);

}
