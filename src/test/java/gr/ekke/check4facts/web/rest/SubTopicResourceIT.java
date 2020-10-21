package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.Check4FactsApp;
import gr.ekke.check4facts.domain.SubTopic;
import gr.ekke.check4facts.repository.SubTopicRepository;
import gr.ekke.check4facts.repository.search.SubTopicSearchRepository;
import gr.ekke.check4facts.service.SubTopicService;

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
 * Integration tests for the {@link SubTopicResource} REST controller.
 */
@SpringBootTest(classes = Check4FactsApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class SubTopicResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SubTopicRepository subTopicRepository;

    @Autowired
    private SubTopicService subTopicService;

    /**
     * This repository is mocked in the gr.ekke.check4facts.repository.search test package.
     *
     * @see gr.ekke.check4facts.repository.search.SubTopicSearchRepositoryMockConfiguration
     */
    @Autowired
    private SubTopicSearchRepository mockSubTopicSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubTopicMockMvc;

    private SubTopic subTopic;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubTopic createEntity(EntityManager em) {
        SubTopic subTopic = new SubTopic()
            .name(DEFAULT_NAME);
        return subTopic;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubTopic createUpdatedEntity(EntityManager em) {
        SubTopic subTopic = new SubTopic()
            .name(UPDATED_NAME);
        return subTopic;
    }

    @BeforeEach
    public void initTest() {
        subTopic = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubTopic() throws Exception {
        int databaseSizeBeforeCreate = subTopicRepository.findAll().size();
        // Create the SubTopic
        restSubTopicMockMvc.perform(post("/api/sub-topics")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subTopic)))
            .andExpect(status().isCreated());

        // Validate the SubTopic in the database
        List<SubTopic> subTopicList = subTopicRepository.findAll();
        assertThat(subTopicList).hasSize(databaseSizeBeforeCreate + 1);
        SubTopic testSubTopic = subTopicList.get(subTopicList.size() - 1);
        assertThat(testSubTopic.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the SubTopic in Elasticsearch
        verify(mockSubTopicSearchRepository, times(1)).save(testSubTopic);
    }

    @Test
    @Transactional
    public void createSubTopicWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subTopicRepository.findAll().size();

        // Create the SubTopic with an existing ID
        subTopic.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubTopicMockMvc.perform(post("/api/sub-topics")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subTopic)))
            .andExpect(status().isBadRequest());

        // Validate the SubTopic in the database
        List<SubTopic> subTopicList = subTopicRepository.findAll();
        assertThat(subTopicList).hasSize(databaseSizeBeforeCreate);

        // Validate the SubTopic in Elasticsearch
        verify(mockSubTopicSearchRepository, times(0)).save(subTopic);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = subTopicRepository.findAll().size();
        // set the field null
        subTopic.setName(null);

        // Create the SubTopic, which fails.


        restSubTopicMockMvc.perform(post("/api/sub-topics")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subTopic)))
            .andExpect(status().isBadRequest());

        List<SubTopic> subTopicList = subTopicRepository.findAll();
        assertThat(subTopicList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubTopics() throws Exception {
        // Initialize the database
        subTopicRepository.saveAndFlush(subTopic);

        // Get all the subTopicList
        restSubTopicMockMvc.perform(get("/api/sub-topics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subTopic.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getSubTopic() throws Exception {
        // Initialize the database
        subTopicRepository.saveAndFlush(subTopic);

        // Get the subTopic
        restSubTopicMockMvc.perform(get("/api/sub-topics/{id}", subTopic.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subTopic.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingSubTopic() throws Exception {
        // Get the subTopic
        restSubTopicMockMvc.perform(get("/api/sub-topics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubTopic() throws Exception {
        // Initialize the database
        subTopicService.save(subTopic);

        int databaseSizeBeforeUpdate = subTopicRepository.findAll().size();

        // Update the subTopic
        SubTopic updatedSubTopic = subTopicRepository.findById(subTopic.getId()).get();
        // Disconnect from session so that the updates on updatedSubTopic are not directly saved in db
        em.detach(updatedSubTopic);
        updatedSubTopic
            .name(UPDATED_NAME);

        restSubTopicMockMvc.perform(put("/api/sub-topics")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubTopic)))
            .andExpect(status().isOk());

        // Validate the SubTopic in the database
        List<SubTopic> subTopicList = subTopicRepository.findAll();
        assertThat(subTopicList).hasSize(databaseSizeBeforeUpdate);
        SubTopic testSubTopic = subTopicList.get(subTopicList.size() - 1);
        assertThat(testSubTopic.getName()).isEqualTo(UPDATED_NAME);

        // Validate the SubTopic in Elasticsearch
        verify(mockSubTopicSearchRepository, times(2)).save(testSubTopic);
    }

    @Test
    @Transactional
    public void updateNonExistingSubTopic() throws Exception {
        int databaseSizeBeforeUpdate = subTopicRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubTopicMockMvc.perform(put("/api/sub-topics")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subTopic)))
            .andExpect(status().isBadRequest());

        // Validate the SubTopic in the database
        List<SubTopic> subTopicList = subTopicRepository.findAll();
        assertThat(subTopicList).hasSize(databaseSizeBeforeUpdate);

        // Validate the SubTopic in Elasticsearch
        verify(mockSubTopicSearchRepository, times(0)).save(subTopic);
    }

    @Test
    @Transactional
    public void deleteSubTopic() throws Exception {
        // Initialize the database
        subTopicService.save(subTopic);

        int databaseSizeBeforeDelete = subTopicRepository.findAll().size();

        // Delete the subTopic
        restSubTopicMockMvc.perform(delete("/api/sub-topics/{id}", subTopic.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SubTopic> subTopicList = subTopicRepository.findAll();
        assertThat(subTopicList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the SubTopic in Elasticsearch
        verify(mockSubTopicSearchRepository, times(1)).deleteById(subTopic.getId());
    }

    @Test
    @Transactional
    public void searchSubTopic() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        subTopicService.save(subTopic);
        when(mockSubTopicSearchRepository.search(queryStringQuery("id:" + subTopic.getId())))
            .thenReturn(Collections.singletonList(subTopic));

        // Search the subTopic
        restSubTopicMockMvc.perform(get("/api/_search/sub-topics?query=id:" + subTopic.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subTopic.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
}
