package gr.ekke.check4facts.repository.search;

import gr.ekke.check4facts.domain.Resource;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Resource} entity.
 */
public interface ResourceSearchRepository extends ElasticsearchRepository<Resource, Long> {
}
