package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.Check4FactsApp;
import gr.ekke.check4facts.domain.Article;
import gr.ekke.check4facts.domain.Category;
import gr.ekke.check4facts.repository.ArticleRepository;
import gr.ekke.check4facts.repository.search.ArticleSearchRepository;
import gr.ekke.check4facts.service.ArticleService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ArticleResource} REST controller.
 */
@SpringBootTest(classes = Check4FactsApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ArticleResourceIT {

    private static final String DEFAULT_PREVIEW_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_PREVIEW_TITLE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PREVIEW_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PREVIEW_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PREVIEW_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PREVIEW_IMAGE_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_ARTICLE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ARTICLE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    private static final Boolean DEFAULT_PUBLISHED = false;
    private static final Boolean UPDATED_PUBLISHED = true;

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_PREVIEW_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_PREVIEW_TEXT = "BBBBBBBBBB";

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleService articleService;

    /**
     * This repository is mocked in the gr.ekke.check4facts.repository.search test package.
     *
     * @see gr.ekke.check4facts.repository.search.ArticleSearchRepositoryMockConfiguration
     */
    @Autowired
    private ArticleSearchRepository mockArticleSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restArticleMockMvc;

    private Article article;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Article createEntity(EntityManager em) {
        Article article = new Article()
            .previewTitle(DEFAULT_PREVIEW_TITLE)
            .previewImage(DEFAULT_PREVIEW_IMAGE)
            .previewImageContentType(DEFAULT_PREVIEW_IMAGE_CONTENT_TYPE)
            .articleDate(DEFAULT_ARTICLE_DATE)
            .author(DEFAULT_AUTHOR)
            .published(DEFAULT_PUBLISHED)
            .content(DEFAULT_CONTENT)
            .previewText(DEFAULT_PREVIEW_TEXT);
        // Add required entity
        Category category;
        if (TestUtil.findAll(em, Category.class).isEmpty()) {
            category = CategoryResourceIT.createEntity(em);
            em.persist(category);
            em.flush();
        } else {
            category = TestUtil.findAll(em, Category.class).get(0);
        }
        article.setCategory(category);
        return article;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Article createUpdatedEntity(EntityManager em) {
        Article article = new Article()
            .previewTitle(UPDATED_PREVIEW_TITLE)
            .previewImage(UPDATED_PREVIEW_IMAGE)
            .previewImageContentType(UPDATED_PREVIEW_IMAGE_CONTENT_TYPE)
            .articleDate(UPDATED_ARTICLE_DATE)
            .author(UPDATED_AUTHOR)
            .published(UPDATED_PUBLISHED)
            .content(UPDATED_CONTENT)
            .previewText(UPDATED_PREVIEW_TEXT);
        // Add required entity
        Category category;
        if (TestUtil.findAll(em, Category.class).isEmpty()) {
            category = CategoryResourceIT.createUpdatedEntity(em);
            em.persist(category);
            em.flush();
        } else {
            category = TestUtil.findAll(em, Category.class).get(0);
        }
        article.setCategory(category);
        return article;
    }

    @BeforeEach
    public void initTest() {
        article = createEntity(em);
    }

    @Test
    @Transactional
    public void createArticle() throws Exception {
        int databaseSizeBeforeCreate = articleRepository.findAll().size();
        // Create the Article
        restArticleMockMvc.perform(post("/api/articles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(article)))
            .andExpect(status().isCreated());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeCreate + 1);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getPreviewTitle()).isEqualTo(DEFAULT_PREVIEW_TITLE);
        assertThat(testArticle.getPreviewImage()).isEqualTo(DEFAULT_PREVIEW_IMAGE);
        assertThat(testArticle.getPreviewImageContentType()).isEqualTo(DEFAULT_PREVIEW_IMAGE_CONTENT_TYPE);
        assertThat(testArticle.getArticleDate()).isEqualTo(DEFAULT_ARTICLE_DATE);
        assertThat(testArticle.getAuthor()).isEqualTo(DEFAULT_AUTHOR);
        assertThat(testArticle.isPublished()).isEqualTo(DEFAULT_PUBLISHED);
        assertThat(testArticle.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testArticle.getPreviewText()).isEqualTo(DEFAULT_PREVIEW_TEXT);

        // Validate the Article in Elasticsearch
        verify(mockArticleSearchRepository, times(1)).save(testArticle);
    }

    @Test
    @Transactional
    public void createArticleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articleRepository.findAll().size();

        // Create the Article with an existing ID
        article.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticleMockMvc.perform(post("/api/articles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(article)))
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeCreate);

        // Validate the Article in Elasticsearch
        verify(mockArticleSearchRepository, times(0)).save(article);
    }


    @Test
    @Transactional
    public void getAllArticles() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList
        restArticleMockMvc.perform(get("/api/articles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(article.getId().intValue())))
            .andExpect(jsonPath("$.[*].previewTitle").value(hasItem(DEFAULT_PREVIEW_TITLE.toString())))
            .andExpect(jsonPath("$.[*].previewImageContentType").value(hasItem(DEFAULT_PREVIEW_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].previewImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_PREVIEW_IMAGE))))
            .andExpect(jsonPath("$.[*].articleDate").value(hasItem(DEFAULT_ARTICLE_DATE.toString())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR)))
            .andExpect(jsonPath("$.[*].published").value(hasItem(DEFAULT_PUBLISHED.booleanValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].previewText").value(hasItem(DEFAULT_PREVIEW_TEXT.toString())));
    }
    
    @Test
    @Transactional
    public void getArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get the article
        restArticleMockMvc.perform(get("/api/articles/{id}", article.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(article.getId().intValue()))
            .andExpect(jsonPath("$.previewTitle").value(DEFAULT_PREVIEW_TITLE.toString()))
            .andExpect(jsonPath("$.previewImageContentType").value(DEFAULT_PREVIEW_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.previewImage").value(Base64Utils.encodeToString(DEFAULT_PREVIEW_IMAGE)))
            .andExpect(jsonPath("$.articleDate").value(DEFAULT_ARTICLE_DATE.toString()))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR))
            .andExpect(jsonPath("$.published").value(DEFAULT_PUBLISHED.booleanValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.previewText").value(DEFAULT_PREVIEW_TEXT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingArticle() throws Exception {
        // Get the article
        restArticleMockMvc.perform(get("/api/articles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticle() throws Exception {
        // Initialize the database
        articleService.save(article);

        int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // Update the article
        Article updatedArticle = articleRepository.findById(article.getId()).get();
        // Disconnect from session so that the updates on updatedArticle are not directly saved in db
        em.detach(updatedArticle);
        updatedArticle
            .previewTitle(UPDATED_PREVIEW_TITLE)
            .previewImage(UPDATED_PREVIEW_IMAGE)
            .previewImageContentType(UPDATED_PREVIEW_IMAGE_CONTENT_TYPE)
            .articleDate(UPDATED_ARTICLE_DATE)
            .author(UPDATED_AUTHOR)
            .published(UPDATED_PUBLISHED)
            .content(UPDATED_CONTENT)
            .previewText(UPDATED_PREVIEW_TEXT);

        restArticleMockMvc.perform(put("/api/articles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedArticle)))
            .andExpect(status().isOk());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getPreviewTitle()).isEqualTo(UPDATED_PREVIEW_TITLE);
        assertThat(testArticle.getPreviewImage()).isEqualTo(UPDATED_PREVIEW_IMAGE);
        assertThat(testArticle.getPreviewImageContentType()).isEqualTo(UPDATED_PREVIEW_IMAGE_CONTENT_TYPE);
        assertThat(testArticle.getArticleDate()).isEqualTo(UPDATED_ARTICLE_DATE);
        assertThat(testArticle.getAuthor()).isEqualTo(UPDATED_AUTHOR);
        assertThat(testArticle.isPublished()).isEqualTo(UPDATED_PUBLISHED);
        assertThat(testArticle.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testArticle.getPreviewText()).isEqualTo(UPDATED_PREVIEW_TEXT);

        // Validate the Article in Elasticsearch
        verify(mockArticleSearchRepository, times(2)).save(testArticle);
    }

    @Test
    @Transactional
    public void updateNonExistingArticle() throws Exception {
        int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticleMockMvc.perform(put("/api/articles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(article)))
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Article in Elasticsearch
        verify(mockArticleSearchRepository, times(0)).save(article);
    }

    @Test
    @Transactional
    public void deleteArticle() throws Exception {
        // Initialize the database
        articleService.save(article);

        int databaseSizeBeforeDelete = articleRepository.findAll().size();

        // Delete the article
        restArticleMockMvc.perform(delete("/api/articles/{id}", article.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Article in Elasticsearch
        verify(mockArticleSearchRepository, times(1)).deleteById(article.getId());
    }

    @Test
    @Transactional
    public void searchArticle() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        articleService.save(article);
        when(mockArticleSearchRepository.search(queryStringQuery("id:" + article.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(article), PageRequest.of(0, 1), 1));

        // Search the article
        restArticleMockMvc.perform(get("/api/_search/articles?query=id:" + article.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(article.getId().intValue())))
            .andExpect(jsonPath("$.[*].previewTitle").value(hasItem(DEFAULT_PREVIEW_TITLE.toString())))
            .andExpect(jsonPath("$.[*].previewImageContentType").value(hasItem(DEFAULT_PREVIEW_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].previewImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_PREVIEW_IMAGE))))
            .andExpect(jsonPath("$.[*].articleDate").value(hasItem(DEFAULT_ARTICLE_DATE.toString())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR)))
            .andExpect(jsonPath("$.[*].published").value(hasItem(DEFAULT_PUBLISHED.booleanValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].previewText").value(hasItem(DEFAULT_PREVIEW_TEXT.toString())));
    }
}
