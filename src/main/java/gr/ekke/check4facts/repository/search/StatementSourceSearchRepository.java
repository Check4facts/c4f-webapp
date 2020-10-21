package gr.ekke.check4facts.repository.search;

import gr.ekke.check4facts.domain.StatementSource;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link StatementSource} entity.
 */
public interface StatementSourceSearchRepository extends ElasticsearchRepository<StatementSource, Long> {
}
