package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.Check4FactsApp;
import gr.ekke.check4facts.domain.Statement;
import gr.ekke.check4facts.repository.StatementRepository;
import gr.ekke.check4facts.repository.search.StatementSearchRepository;
import gr.ekke.check4facts.service.StatementService;

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
 * Integration tests for the {@link StatementResource} REST controller.
 */
@SpringBootTest(classes = Check4FactsApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class StatementResourceIT {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    private static final Instant DEFAULT_STATEMENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_STATEMENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_REGISTRATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REGISTRATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_MAIN_ARTICLE_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_MAIN_ARTICLE_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_MAIN_ARTICLE_URL = "AAAAAAAAAA";
    private static final String UPDATED_MAIN_ARTICLE_URL = "BBBBBBBBBB";

    @Autowired
    private StatementRepository statementRepository;

    @Autowired
    private StatementService statementService;

    /**
     * This repository is mocked in the gr.ekke.check4facts.repository.search test package.
     *
     * @see gr.ekke.check4facts.repository.search.StatementSearchRepositoryMockConfiguration
     */
    @Autowired
    private StatementSearchRepository mockStatementSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStatementMockMvc;

    private Statement statement;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Statement createEntity(EntityManager em) {
        Statement statement = new Statement()
            .text(DEFAULT_TEXT)
            .author(DEFAULT_AUTHOR)
            .statementDate(DEFAULT_STATEMENT_DATE)
            .registrationDate(DEFAULT_REGISTRATION_DATE)
            .mainArticleText(DEFAULT_MAIN_ARTICLE_TEXT)
            .mainArticleUrl(DEFAULT_MAIN_ARTICLE_URL);
        return statement;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Statement createUpdatedEntity(EntityManager em) {
        Statement statement = new Statement()
            .text(UPDATED_TEXT)
            .author(UPDATED_AUTHOR)
            .statementDate(UPDATED_STATEMENT_DATE)
            .registrationDate(UPDATED_REGISTRATION_DATE)
            .mainArticleText(UPDATED_MAIN_ARTICLE_TEXT)
            .mainArticleUrl(UPDATED_MAIN_ARTICLE_URL);
        return statement;
    }

    @BeforeEach
    public void initTest() {
        statement = createEntity(em);
    }

    @Test
    @Transactional
    public void createStatement() throws Exception {
        int databaseSizeBeforeCreate = statementRepository.findAll().size();
        // Create the Statement
        restStatementMockMvc.perform(post("/api/statements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(statement)))
            .andExpect(status().isCreated());

        // Validate the Statement in the database
        List<Statement> statementList = statementRepository.findAll();
        assertThat(statementList).hasSize(databaseSizeBeforeCreate + 1);
        Statement testStatement = statementList.get(statementList.size() - 1);
        assertThat(testStatement.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testStatement.getAuthor()).isEqualTo(DEFAULT_AUTHOR);
        assertThat(testStatement.getStatementDate()).isEqualTo(DEFAULT_STATEMENT_DATE);
        assertThat(testStatement.getRegistrationDate()).isEqualTo(DEFAULT_REGISTRATION_DATE);
        assertThat(testStatement.getMainArticleText()).isEqualTo(DEFAULT_MAIN_ARTICLE_TEXT);
        assertThat(testStatement.getMainArticleUrl()).isEqualTo(DEFAULT_MAIN_ARTICLE_URL);

        // Validate the Statement in Elasticsearch
        verify(mockStatementSearchRepository, times(1)).save(testStatement);
    }

    @Test
    @Transactional
    public void createStatementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = statementRepository.findAll().size();

        // Create the Statement with an existing ID
        statement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStatementMockMvc.perform(post("/api/statements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(statement)))
            .andExpect(status().isBadRequest());

        // Validate the Statement in the database
        List<Statement> statementList = statementRepository.findAll();
        assertThat(statementList).hasSize(databaseSizeBeforeCreate);

        // Validate the Statement in Elasticsearch
        verify(mockStatementSearchRepository, times(0)).save(statement);
    }


    @Test
    @Transactional
    public void getAllStatements() throws Exception {
        // Initialize the database
        statementRepository.saveAndFlush(statement);

        // Get all the statementList
        restStatementMockMvc.perform(get("/api/statements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(statement.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR)))
            .andExpect(jsonPath("$.[*].statementDate").value(hasItem(DEFAULT_STATEMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].registrationDate").value(hasItem(DEFAULT_REGISTRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].mainArticleText").value(hasItem(DEFAULT_MAIN_ARTICLE_TEXT.toString())))
            .andExpect(jsonPath("$.[*].mainArticleUrl").value(hasItem(DEFAULT_MAIN_ARTICLE_URL.toString())));
    }
    
    @Test
    @Transactional
    public void getStatement() throws Exception {
        // Initialize the database
        statementRepository.saveAndFlush(statement);

        // Get the statement
        restStatementMockMvc.perform(get("/api/statements/{id}", statement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(statement.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR))
            .andExpect(jsonPath("$.statementDate").value(DEFAULT_STATEMENT_DATE.toString()))
            .andExpect(jsonPath("$.registrationDate").value(DEFAULT_REGISTRATION_DATE.toString()))
            .andExpect(jsonPath("$.mainArticleText").value(DEFAULT_MAIN_ARTICLE_TEXT.toString()))
            .andExpect(jsonPath("$.mainArticleUrl").value(DEFAULT_MAIN_ARTICLE_URL.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingStatement() throws Exception {
        // Get the statement
        restStatementMockMvc.perform(get("/api/statements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStatement() throws Exception {
        // Initialize the database
        statementService.save(statement);

        int databaseSizeBeforeUpdate = statementRepository.findAll().size();

        // Update the statement
        Statement updatedStatement = statementRepository.findById(statement.getId()).get();
        // Disconnect from session so that the updates on updatedStatement are not directly saved in db
        em.detach(updatedStatement);
        updatedStatement
            .text(UPDATED_TEXT)
            .author(UPDATED_AUTHOR)
            .statementDate(UPDATED_STATEMENT_DATE)
            .registrationDate(UPDATED_REGISTRATION_DATE)
            .mainArticleText(UPDATED_MAIN_ARTICLE_TEXT)
            .mainArticleUrl(UPDATED_MAIN_ARTICLE_URL);

        restStatementMockMvc.perform(put("/api/statements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedStatement)))
            .andExpect(status().isOk());

        // Validate the Statement in the database
        List<Statement> statementList = statementRepository.findAll();
        assertThat(statementList).hasSize(databaseSizeBeforeUpdate);
        Statement testStatement = statementList.get(statementList.size() - 1);
        assertThat(testStatement.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testStatement.getAuthor()).isEqualTo(UPDATED_AUTHOR);
        assertThat(testStatement.getStatementDate()).isEqualTo(UPDATED_STATEMENT_DATE);
        assertThat(testStatement.getRegistrationDate()).isEqualTo(UPDATED_REGISTRATION_DATE);
        assertThat(testStatement.getMainArticleText()).isEqualTo(UPDATED_MAIN_ARTICLE_TEXT);
        assertThat(testStatement.getMainArticleUrl()).isEqualTo(UPDATED_MAIN_ARTICLE_URL);

        // Validate the Statement in Elasticsearch
        verify(mockStatementSearchRepository, times(2)).save(testStatement);
    }

    @Test
    @Transactional
    public void updateNonExistingStatement() throws Exception {
        int databaseSizeBeforeUpdate = statementRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStatementMockMvc.perform(put("/api/statements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(statement)))
            .andExpect(status().isBadRequest());

        // Validate the Statement in the database
        List<Statement> statementList = statementRepository.findAll();
        assertThat(statementList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Statement in Elasticsearch
        verify(mockStatementSearchRepository, times(0)).save(statement);
    }

    @Test
    @Transactional
    public void deleteStatement() throws Exception {
        // Initialize the database
        statementService.save(statement);

        int databaseSizeBeforeDelete = statementRepository.findAll().size();

        // Delete the statement
        restStatementMockMvc.perform(delete("/api/statements/{id}", statement.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Statement> statementList = statementRepository.findAll();
        assertThat(statementList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Statement in Elasticsearch
        verify(mockStatementSearchRepository, times(1)).deleteById(statement.getId());
    }

    @Test
    @Transactional
    public void searchStatement() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        statementService.save(statement);
        when(mockStatementSearchRepository.search(queryStringQuery("id:" + statement.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(statement), PageRequest.of(0, 1), 1));

        // Search the statement
        restStatementMockMvc.perform(get("/api/_search/statements?query=id:" + statement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(statement.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR)))
            .andExpect(jsonPath("$.[*].statementDate").value(hasItem(DEFAULT_STATEMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].registrationDate").value(hasItem(DEFAULT_REGISTRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].mainArticleText").value(hasItem(DEFAULT_MAIN_ARTICLE_TEXT.toString())))
            .andExpect(jsonPath("$.[*].mainArticleUrl").value(hasItem(DEFAULT_MAIN_ARTICLE_URL.toString())));
    }
}
