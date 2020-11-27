package gr.ekke.check4facts.repository.search;

import gr.ekke.check4facts.domain.FeatureStatement;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface FeatureStatementSearchRepository extends ElasticsearchRepository<FeatureStatement, Long> {
}
