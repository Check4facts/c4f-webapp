package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.Check4FactsApp;
import gr.ekke.check4facts.domain.Resource;
import gr.ekke.check4facts.repository.ResourceRepository;
import gr.ekke.check4facts.repository.search.ResourceSearchRepository;
import gr.ekke.check4facts.service.ResourceService;

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

import gr.ekke.check4facts.domain.enumeration.FileFormat;
/**
 * Integration tests for the {@link ResourceResource} REST controller.
 */
@SpringBootTest(classes = Check4FactsApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ResourceResourceIT {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final Long DEFAULT_HARVEST_ITERATION = 1L;
    private static final Long UPDATED_HARVEST_ITERATION = 2L;

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_SNIPPET = "AAAAAAAAAA";
    private static final String UPDATED_SNIPPET = "BBBBBBBBBB";

    private static final String DEFAULT_HTML_SNIPPET = "AAAAAAAAAA";
    private static final String UPDATED_HTML_SNIPPET = "BBBBBBBBBB";

    private static final FileFormat DEFAULT_FILE_FORMAT = FileFormat.PDF;
    private static final FileFormat UPDATED_FILE_FORMAT = FileFormat.DOC;

    private static final String DEFAULT_BODY = "AAAAAAAAAA";
    private static final String UPDATED_BODY = "BBBBBBBBBB";

    private static final Instant DEFAULT_HARVEST_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HARVEST_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private ResourceService resourceService;

    /**
     * This repository is mocked in the gr.ekke.check4facts.repository.search test package.
     *
     * @see gr.ekke.check4facts.repository.search.ResourceSearchRepositoryMockConfiguration
     */
    @Autowired
    private ResourceSearchRepository mockResourceSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restResourceMockMvc;

    private Resource resource;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Resource createEntity(EntityManager em) {
        Resource resource = new Resource()
            .url(DEFAULT_URL)
            .harvestIteration(DEFAULT_HARVEST_ITERATION)
            .title(DEFAULT_TITLE)
            .snippet(DEFAULT_SNIPPET)
            .htmlSnippet(DEFAULT_HTML_SNIPPET)
            .fileFormat(DEFAULT_FILE_FORMAT)
            .body(DEFAULT_BODY)
            .harvestDate(DEFAULT_HARVEST_DATE);
        return resource;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Resource createUpdatedEntity(EntityManager em) {
        Resource resource = new Resource()
            .url(UPDATED_URL)
            .harvestIteration(UPDATED_HARVEST_ITERATION)
            .title(UPDATED_TITLE)
            .snippet(UPDATED_SNIPPET)
            .htmlSnippet(UPDATED_HTML_SNIPPET)
            .fileFormat(UPDATED_FILE_FORMAT)
            .body(UPDATED_BODY)
            .harvestDate(UPDATED_HARVEST_DATE);
        return resource;
    }

    @BeforeEach
    public void initTest() {
        resource = createEntity(em);
    }

    @Test
    @Transactional
    public void createResource() throws Exception {
        int databaseSizeBeforeCreate = resourceRepository.findAll().size();
        // Create the Resource
        restResourceMockMvc.perform(post("/api/resources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resource)))
            .andExpect(status().isCreated());

        // Validate the Resource in the database
        List<Resource> resourceList = resourceRepository.findAll();
        assertThat(resourceList).hasSize(databaseSizeBeforeCreate + 1);
        Resource testResource = resourceList.get(resourceList.size() - 1);
        assertThat(testResource.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testResource.getHarvestIteration()).isEqualTo(DEFAULT_HARVEST_ITERATION);
        assertThat(testResource.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testResource.getSnippet()).isEqualTo(DEFAULT_SNIPPET);
        assertThat(testResource.getHtmlSnippet()).isEqualTo(DEFAULT_HTML_SNIPPET);
        assertThat(testResource.getFileFormat()).isEqualTo(DEFAULT_FILE_FORMAT);
        assertThat(testResource.getBody()).isEqualTo(DEFAULT_BODY);
        assertThat(testResource.getHarvestDate()).isEqualTo(DEFAULT_HARVEST_DATE);

        // Validate the Resource in Elasticsearch
        verify(mockResourceSearchRepository, times(1)).save(testResource);
    }

    @Test
    @Transactional
    public void createResourceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = resourceRepository.findAll().size();

        // Create the Resource with an existing ID
        resource.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restResourceMockMvc.perform(post("/api/resources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resource)))
            .andExpect(status().isBadRequest());

        // Validate the Resource in the database
        List<Resource> resourceList = resourceRepository.findAll();
        assertThat(resourceList).hasSize(databaseSizeBeforeCreate);

        // Validate the Resource in Elasticsearch
        verify(mockResourceSearchRepository, times(0)).save(resource);
    }


    @Test
    @Transactional
    public void checkHarvestIterationIsRequired() throws Exception {
        int databaseSizeBeforeTest = resourceRepository.findAll().size();
        // set the field null
        resource.setHarvestIteration(null);

        // Create the Resource, which fails.


        restResourceMockMvc.perform(post("/api/resources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resource)))
            .andExpect(status().isBadRequest());

        List<Resource> resourceList = resourceRepository.findAll();
        assertThat(resourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHarvestDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = resourceRepository.findAll().size();
        // set the field null
        resource.setHarvestDate(null);

        // Create the Resource, which fails.


        restResourceMockMvc.perform(post("/api/resources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resource)))
            .andExpect(status().isBadRequest());

        List<Resource> resourceList = resourceRepository.findAll();
        assertThat(resourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllResources() throws Exception {
        // Initialize the database
        resourceRepository.saveAndFlush(resource);

        // Get all the resourceList
        restResourceMockMvc.perform(get("/api/resources?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resource.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].harvestIteration").value(hasItem(DEFAULT_HARVEST_ITERATION.intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].snippet").value(hasItem(DEFAULT_SNIPPET.toString())))
            .andExpect(jsonPath("$.[*].htmlSnippet").value(hasItem(DEFAULT_HTML_SNIPPET.toString())))
            .andExpect(jsonPath("$.[*].fileFormat").value(hasItem(DEFAULT_FILE_FORMAT.toString())))
            .andExpect(jsonPath("$.[*].body").value(hasItem(DEFAULT_BODY.toString())))
            .andExpect(jsonPath("$.[*].harvestDate").value(hasItem(DEFAULT_HARVEST_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getResource() throws Exception {
        // Initialize the database
        resourceRepository.saveAndFlush(resource);

        // Get the resource
        restResourceMockMvc.perform(get("/api/resources/{id}", resource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(resource.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.harvestIteration").value(DEFAULT_HARVEST_ITERATION.intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.snippet").value(DEFAULT_SNIPPET.toString()))
            .andExpect(jsonPath("$.htmlSnippet").value(DEFAULT_HTML_SNIPPET.toString()))
            .andExpect(jsonPath("$.fileFormat").value(DEFAULT_FILE_FORMAT.toString()))
            .andExpect(jsonPath("$.body").value(DEFAULT_BODY.toString()))
            .andExpect(jsonPath("$.harvestDate").value(DEFAULT_HARVEST_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingResource() throws Exception {
        // Get the resource
        restResourceMockMvc.perform(get("/api/resources/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResource() throws Exception {
        // Initialize the database
        resourceService.save(resource);

        int databaseSizeBeforeUpdate = resourceRepository.findAll().size();

        // Update the resource
        Resource updatedResource = resourceRepository.findById(resource.getId()).get();
        // Disconnect from session so that the updates on updatedResource are not directly saved in db
        em.detach(updatedResource);
        updatedResource
            .url(UPDATED_URL)
            .harvestIteration(UPDATED_HARVEST_ITERATION)
            .title(UPDATED_TITLE)
            .snippet(UPDATED_SNIPPET)
            .htmlSnippet(UPDATED_HTML_SNIPPET)
            .fileFormat(UPDATED_FILE_FORMAT)
            .body(UPDATED_BODY)
            .harvestDate(UPDATED_HARVEST_DATE);

        restResourceMockMvc.perform(put("/api/resources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedResource)))
            .andExpect(status().isOk());

        // Validate the Resource in the database
        List<Resource> resourceList = resourceRepository.findAll();
        assertThat(resourceList).hasSize(databaseSizeBeforeUpdate);
        Resource testResource = resourceList.get(resourceList.size() - 1);
        assertThat(testResource.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testResource.getHarvestIteration()).isEqualTo(UPDATED_HARVEST_ITERATION);
        assertThat(testResource.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testResource.getSnippet()).isEqualTo(UPDATED_SNIPPET);
        assertThat(testResource.getHtmlSnippet()).isEqualTo(UPDATED_HTML_SNIPPET);
        assertThat(testResource.getFileFormat()).isEqualTo(UPDATED_FILE_FORMAT);
        assertThat(testResource.getBody()).isEqualTo(UPDATED_BODY);
        assertThat(testResource.getHarvestDate()).isEqualTo(UPDATED_HARVEST_DATE);

        // Validate the Resource in Elasticsearch
        verify(mockResourceSearchRepository, times(2)).save(testResource);
    }

    @Test
    @Transactional
    public void updateNonExistingResource() throws Exception {
        int databaseSizeBeforeUpdate = resourceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restResourceMockMvc.perform(put("/api/resources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resource)))
            .andExpect(status().isBadRequest());

        // Validate the Resource in the database
        List<Resource> resourceList = resourceRepository.findAll();
        assertThat(resourceList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Resource in Elasticsearch
        verify(mockResourceSearchRepository, times(0)).save(resource);
    }

    @Test
    @Transactional
    public void deleteResource() throws Exception {
        // Initialize the database
        resourceService.save(resource);

        int databaseSizeBeforeDelete = resourceRepository.findAll().size();

        // Delete the resource
        restResourceMockMvc.perform(delete("/api/resources/{id}", resource.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Resource> resourceList = resourceRepository.findAll();
        assertThat(resourceList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Resource in Elasticsearch
        verify(mockResourceSearchRepository, times(1)).deleteById(resource.getId());
    }

    @Test
    @Transactional
    public void searchResource() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        resourceService.save(resource);
        when(mockResourceSearchRepository.search(queryStringQuery("id:" + resource.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(resource), PageRequest.of(0, 1), 1));

        // Search the resource
        restResourceMockMvc.perform(get("/api/_search/resources?query=id:" + resource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resource.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].harvestIteration").value(hasItem(DEFAULT_HARVEST_ITERATION.intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].snippet").value(hasItem(DEFAULT_SNIPPET.toString())))
            .andExpect(jsonPath("$.[*].htmlSnippet").value(hasItem(DEFAULT_HTML_SNIPPET.toString())))
            .andExpect(jsonPath("$.[*].fileFormat").value(hasItem(DEFAULT_FILE_FORMAT.toString())))
            .andExpect(jsonPath("$.[*].body").value(hasItem(DEFAULT_BODY.toString())))
            .andExpect(jsonPath("$.[*].harvestDate").value(hasItem(DEFAULT_HARVEST_DATE.toString())));
    }
}
