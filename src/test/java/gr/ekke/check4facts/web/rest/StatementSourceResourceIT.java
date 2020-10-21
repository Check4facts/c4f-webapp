package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.Check4FactsApp;
import gr.ekke.check4facts.domain.StatementSource;
import gr.ekke.check4facts.repository.StatementSourceRepository;
import gr.ekke.check4facts.repository.search.StatementSourceSearchRepository;
import gr.ekke.check4facts.service.StatementSourceService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link StatementSourceResource} REST controller.
 */
@SpringBootTest(classes = Check4FactsApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class StatementSourceResourceIT {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_SNIPPET = "AAAAAAAAAA";
    private static final String UPDATED_SNIPPET = "BBBBBBBBBB";

    @Autowired
    private StatementSourceRepository statementSourceRepository;

    @Autowired
    private StatementSourceService statementSourceService;

    /**
     * This repository is mocked in the gr.ekke.check4facts.repository.search test package.
     *
     * @see gr.ekke.check4facts.repository.search.StatementSourceSearchRepositoryMockConfiguration
     */
    @Autowired
    private StatementSourceSearchRepository mockStatementSourceSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStatementSourceMockMvc;

    private StatementSource statementSource;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StatementSource createEntity(EntityManager em) {
        StatementSource statementSource = new StatementSource()
            .url(DEFAULT_URL)
            .title(DEFAULT_TITLE)
            .snippet(DEFAULT_SNIPPET);
        return statementSource;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StatementSource createUpdatedEntity(EntityManager em) {
        StatementSource statementSource = new StatementSource()
            .url(UPDATED_URL)
            .title(UPDATED_TITLE)
            .snippet(UPDATED_SNIPPET);
        return statementSource;
    }

    @BeforeEach
    public void initTest() {
        statementSource = createEntity(em);
    }

    @Test
    @Transactional
    public void createStatementSource() throws Exception {
        int databaseSizeBeforeCreate = statementSourceRepository.findAll().size();
        // Create the StatementSource
        restStatementSourceMockMvc.perform(post("/api/statement-sources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(statementSource)))
            .andExpect(status().isCreated());

        // Validate the StatementSource in the database
        List<StatementSource> statementSourceList = statementSourceRepository.findAll();
        assertThat(statementSourceList).hasSize(databaseSizeBeforeCreate + 1);
        StatementSource testStatementSource = statementSourceList.get(statementSourceList.size() - 1);
        assertThat(testStatementSource.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testStatementSource.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testStatementSource.getSnippet()).isEqualTo(DEFAULT_SNIPPET);

        // Validate the StatementSource in Elasticsearch
        verify(mockStatementSourceSearchRepository, times(1)).save(testStatementSource);
    }

    @Test
    @Transactional
    public void createStatementSourceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = statementSourceRepository.findAll().size();

        // Create the StatementSource with an existing ID
        statementSource.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStatementSourceMockMvc.perform(post("/api/statement-sources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(statementSource)))
            .andExpect(status().isBadRequest());

        // Validate the StatementSource in the database
        List<StatementSource> statementSourceList = statementSourceRepository.findAll();
        assertThat(statementSourceList).hasSize(databaseSizeBeforeCreate);

        // Validate the StatementSource in Elasticsearch
        verify(mockStatementSourceSearchRepository, times(0)).save(statementSource);
    }


    @Test
    @Transactional
    public void getAllStatementSources() throws Exception {
        // Initialize the database
        statementSourceRepository.saveAndFlush(statementSource);

        // Get all the statementSourceList
        restStatementSourceMockMvc.perform(get("/api/statement-sources?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(statementSource.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].snippet").value(hasItem(DEFAULT_SNIPPET.toString())));
    }
    
    @Test
    @Transactional
    public void getStatementSource() throws Exception {
        // Initialize the database
        statementSourceRepository.saveAndFlush(statementSource);

        // Get the statementSource
        restStatementSourceMockMvc.perform(get("/api/statement-sources/{id}", statementSource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(statementSource.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.snippet").value(DEFAULT_SNIPPET.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingStatementSource() throws Exception {
        // Get the statementSource
        restStatementSourceMockMvc.perform(get("/api/statement-sources/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStatementSource() throws Exception {
        // Initialize the database
        statementSourceService.save(statementSource);

        int databaseSizeBeforeUpdate = statementSourceRepository.findAll().size();

        // Update the statementSource
        StatementSource updatedStatementSource = statementSourceRepository.findById(statementSource.getId()).get();
        // Disconnect from session so that the updates on updatedStatementSource are not directly saved in db
        em.detach(updatedStatementSource);
        updatedStatementSource
            .url(UPDATED_URL)
            .title(UPDATED_TITLE)
            .snippet(UPDATED_SNIPPET);

        restStatementSourceMockMvc.perform(put("/api/statement-sources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedStatementSource)))
            .andExpect(status().isOk());

        // Validate the StatementSource in the database
        List<StatementSource> statementSourceList = statementSourceRepository.findAll();
        assertThat(statementSourceList).hasSize(databaseSizeBeforeUpdate);
        StatementSource testStatementSource = statementSourceList.get(statementSourceList.size() - 1);
        assertThat(testStatementSource.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testStatementSource.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testStatementSource.getSnippet()).isEqualTo(UPDATED_SNIPPET);

        // Validate the StatementSource in Elasticsearch
        verify(mockStatementSourceSearchRepository, times(2)).save(testStatementSource);
    }

    @Test
    @Transactional
    public void updateNonExistingStatementSource() throws Exception {
        int databaseSizeBeforeUpdate = statementSourceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStatementSourceMockMvc.perform(put("/api/statement-sources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(statementSource)))
            .andExpect(status().isBadRequest());

        // Validate the StatementSource in the database
        List<StatementSource> statementSourceList = statementSourceRepository.findAll();
        assertThat(statementSourceList).hasSize(databaseSizeBeforeUpdate);

        // Validate the StatementSource in Elasticsearch
        verify(mockStatementSourceSearchRepository, times(0)).save(statementSource);
    }

    @Test
    @Transactional
    public void deleteStatementSource() throws Exception {
        // Initialize the database
        statementSourceService.save(statementSource);

        int databaseSizeBeforeDelete = statementSourceRepository.findAll().size();

        // Delete the statementSource
        restStatementSourceMockMvc.perform(delete("/api/statement-sources/{id}", statementSource.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StatementSource> statementSourceList = statementSourceRepository.findAll();
        assertThat(statementSourceList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the StatementSource in Elasticsearch
        verify(mockStatementSourceSearchRepository, times(1)).deleteById(statementSource.getId());
    }

    @Test
    @Transactional
    public void searchStatementSource() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        statementSourceService.save(statementSource);
        when(mockStatementSourceSearchRepository.search(queryStringQuery("id:" + statementSource.getId())))
            .thenReturn(Collections.singletonList(statementSource));

        // Search the statementSource
        restStatementSourceMockMvc.perform(get("/api/_search/statement-sources?query=id:" + statementSource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(statementSource.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].snippet").value(hasItem(DEFAULT_SNIPPET.toString())));
    }
}
