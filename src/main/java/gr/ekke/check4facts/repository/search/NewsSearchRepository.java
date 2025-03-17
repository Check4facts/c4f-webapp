package gr.ekke.check4facts.repository.search;

import gr.ekke.check4facts.domain.News;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link News} entity.
 */
public interface NewsSearchRepository extends ElasticsearchRepository<News, Long>, NewsSearchRepositoryCustom {
}
