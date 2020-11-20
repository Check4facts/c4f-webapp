package gr.ekke.check4facts.repository.search;

import gr.ekke.check4facts.domain.Article;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.UUID;


/**
 * Spring Data Elasticsearch repository for the {@link Article} entity.
 */
public interface ArticleSearchRepository extends ElasticsearchRepository<Article, UUID> {
}
