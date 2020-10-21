package gr.ekke.check4facts.repository.search;

import gr.ekke.check4facts.domain.SubTopic;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link SubTopic} entity.
 */
public interface SubTopicSearchRepository extends ElasticsearchRepository<SubTopic, Long> {
}
