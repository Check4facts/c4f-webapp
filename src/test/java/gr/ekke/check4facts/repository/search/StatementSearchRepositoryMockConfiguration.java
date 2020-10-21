package gr.ekke.check4facts.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link StatementSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class StatementSearchRepositoryMockConfiguration {

    @MockBean
    private StatementSearchRepository mockStatementSearchRepository;

}
