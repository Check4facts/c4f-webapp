package gr.ekke.check4facts.repository.search;

import gr.ekke.check4facts.domain.Topic;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Topic} entity.
 */
public interface TopicSearchRepository extends ElasticsearchRepository<Topic, Long> {
}
