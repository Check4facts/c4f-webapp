package gr.ekke.check4facts.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.vanroy.springdata.jest.JestElasticsearchTemplate;
import gr.ekke.check4facts.domain.*;
import gr.ekke.check4facts.repository.*;
import gr.ekke.check4facts.repository.search.*;
import org.elasticsearch.ResourceAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.ManyToMany;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ElasticsearchIndexService {

    private static final Lock reindexLock = new ReentrantLock();

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexService.class);

    private final UserRepository userRepository;

    private final UserSearchRepository userSearchRepository;

    private final JestElasticsearchTemplate jestElasticsearchTemplate;

    private final ArticleRepository articleRepository;

    private final ArticleSearchRepository articleSearchRepository;

    private final CategoryRepository categoryRepository;

    private final CategorySearchRepository categorySearchRepository;

    private final FeatureStatementRepository featureStatementRepository;

    private final FeatureStatementSearchRepository featureStatementSearchRepository;

    private final ResourceRepository resourceRepository;

    private final ResourceSearchRepository resourceSearchRepository;

    private final StatementRepository statementRepository;

    private final StatementSearchRepository statementSearchRepository;

    private final StatementSourceRepository statementSourceRepository;

    private final StatementSourceSearchRepository statementSourceSearchRepository;

    private final TopicRepository topicRepository;

    private final TopicSearchRepository topicSearchRepository;

    private final NewsRepository newsRepository;

    private final NewsSearchRepository newsSearchRepository;

    public ElasticsearchIndexService(
        UserRepository userRepository,
        UserSearchRepository userSearchRepository,
        ArticleRepository articleRepository,
        ArticleSearchRepository articleSearchRepository,
        CategoryRepository categoryRepository,
        CategorySearchRepository categorySearchRepository,
        ResourceRepository resourceRepository,
        ResourceSearchRepository resourceSearchRepository,
        StatementRepository statementRepository,
        StatementSearchRepository statementSearchRepository,
        StatementSourceRepository statementSourceRepository,
        StatementSourceSearchRepository statementSourceSearchRepository,
        TopicRepository topicRepository,
        TopicSearchRepository topicSearchRepository,
        FeatureStatementRepository featureStatementRepository,
        FeatureStatementSearchRepository featureStatementSearchRepository,
        JestElasticsearchTemplate jestElasticsearchTemplate, 
        NewsRepository newsRepository, 
        NewsSearchRepository newsSearchRepository) {
        this.userRepository = userRepository;
        this.userSearchRepository = userSearchRepository;
        this.articleRepository = articleRepository;
        this.articleSearchRepository = articleSearchRepository;
        this.categoryRepository = categoryRepository;
        this.categorySearchRepository = categorySearchRepository;
        this.resourceRepository = resourceRepository;
        this.resourceSearchRepository = resourceSearchRepository;
        this.statementRepository = statementRepository;
        this.statementSearchRepository = statementSearchRepository;
        this.statementSourceRepository = statementSourceRepository;
        this.statementSourceSearchRepository = statementSourceSearchRepository;
        this.topicRepository = topicRepository;
        this.topicSearchRepository = topicSearchRepository;
        this.featureStatementRepository = featureStatementRepository;
        this.featureStatementSearchRepository = featureStatementSearchRepository;
        this.jestElasticsearchTemplate = jestElasticsearchTemplate;
        this.newsRepository = newsRepository;
        this.newsSearchRepository = newsSearchRepository;
    }

    @Async
    public void reindexAll() {
        if (reindexLock.tryLock()) {
            try {
                reindexForClass(Article.class, articleRepository, articleSearchRepository);
                reindexForClass(Category.class, categoryRepository, categorySearchRepository);
                reindexForClass(FeatureStatement.class, featureStatementRepository, featureStatementSearchRepository);
                reindexForClass(Statement.class, statementRepository, statementSearchRepository);
                reindexForClass(StatementSource.class, statementSourceRepository, statementSourceSearchRepository);
                reindexForClass(Topic.class, topicRepository, topicSearchRepository );
                reindexForClass(User.class, userRepository, userSearchRepository);
                reindexForClass(News.class, newsRepository, newsSearchRepository);
                reindexForClass(Resource.class, resourceRepository, resourceSearchRepository);
                log.info("Elasticsearch: Successfully performed reindexing");
            } finally {
                reindexLock.unlock();
            }
        } else {
            log.info("Elasticsearch: concurrent reindexing attempt");
        }
    }

    private <T, ID extends Serializable> void reindexForClass(Class<T> entityClass, JpaRepository<T, ID> jpaRepository,
                                                              ElasticsearchRepository<T, ID> elasticsearchRepository) {
        jestElasticsearchTemplate.deleteIndex(entityClass);
        try {
            jestElasticsearchTemplate.createIndex(entityClass);
        } catch (ResourceAlreadyExistsException e) {
            // Do nothing. Index was already concurrently recreated by some other service.
        }
        jestElasticsearchTemplate.putMapping(entityClass);
        if (jpaRepository.count() > 0) {
            // if a JHipster entity field is the owner side of a many-to-many relationship, it should be loaded manually
            List<Method> relationshipGetters = Arrays.stream(entityClass.getDeclaredFields())
                .filter(field -> field.getType().equals(Set.class))
                .filter(field -> field.getAnnotation(ManyToMany.class) != null)
                .filter(field -> field.getAnnotation(ManyToMany.class).mappedBy().isEmpty())
                .filter(field -> field.getAnnotation(JsonIgnore.class) == null)
                .map(field -> {
                    try {
                        return new PropertyDescriptor(field.getName(), entityClass).getReadMethod();
                    } catch (IntrospectionException e) {
                        log.error("Error retrieving getter for class {}, field {}. Field will NOT be indexed",
                            entityClass.getSimpleName(), field.getName(), e);
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

            int size = 50;
            for (int i = 0; i <= jpaRepository.count() / size; i++) {
                Pageable page = PageRequest.of(i, size);
                log.info("Indexing page {} of {}, size {}", i, jpaRepository.count() / size, size);
                Page<T> results = jpaRepository.findAll(page);
                results.map(result -> {
                    // if there are any relationships to load, do it now
                    relationshipGetters.forEach(method -> {
                        try {
                            // eagerly load the relationship set
                            ((Set) method.invoke(result)).size();
                        } catch (Exception ex) {
                            log.error(ex.getMessage());
                        }
                    });
                    return result;
                });
                elasticsearchRepository.saveAll(results.getContent());
            }
        }
        log.info("Elasticsearch: Indexed all rows for {}", entityClass.getSimpleName());
    }
}
