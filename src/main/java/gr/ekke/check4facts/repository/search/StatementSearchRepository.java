package gr.ekke.check4facts.repository.search;

import gr.ekke.check4facts.domain.Statement;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Statement} entity.
 */
public interface StatementSearchRepository extends ElasticsearchRepository<Statement, Long> {
}
