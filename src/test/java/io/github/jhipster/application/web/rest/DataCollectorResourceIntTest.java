package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.Admin225App;

import io.github.jhipster.application.domain.DataCollector;
import io.github.jhipster.application.domain.Device;
import io.github.jhipster.application.repository.DataCollectorRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DataCollectorResource REST controller.
 *
 * @see DataCollectorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Admin225App.class)
public class DataCollectorResourceIntTest {

    private static final String DEFAULT_IP = "AAAAAAAAAA";
    private static final String UPDATED_IP = "BBBBBBBBBB";

    private static final String DEFAULT_SUBNET = "AAAAAAAAAA";
    private static final String UPDATED_SUBNET = "BBBBBBBBBB";

    private static final String DEFAULT_GATEWAY = "AAAAAAAAAA";
    private static final String UPDATED_GATEWAY = "BBBBBBBBBB";

    private static final String DEFAULT_DNS = "AAAAAAAAAA";
    private static final String UPDATED_DNS = "BBBBBBBBBB";

    @Autowired
    private DataCollectorRepository dataCollectorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDataCollectorMockMvc;

    private DataCollector dataCollector;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DataCollectorResource dataCollectorResource = new DataCollectorResource(dataCollectorRepository);
        this.restDataCollectorMockMvc = MockMvcBuilders.standaloneSetup(dataCollectorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DataCollector createEntity(EntityManager em) {
        DataCollector dataCollector = new DataCollector()
            .ip(DEFAULT_IP)
            .subnet(DEFAULT_SUBNET)
            .gateway(DEFAULT_GATEWAY)
            .dns(DEFAULT_DNS);
        // Add required entity
        Device device = DeviceResourceIntTest.createEntity(em);
        em.persist(device);
        em.flush();
        dataCollector.getDevices().add(device);
        return dataCollector;
    }

    @Before
    public void initTest() {
        dataCollector = createEntity(em);
    }

    @Test
    @Transactional
    public void createDataCollector() throws Exception {
        int databaseSizeBeforeCreate = dataCollectorRepository.findAll().size();

        // Create the DataCollector
        restDataCollectorMockMvc.perform(post("/api/data-collectors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataCollector)))
            .andExpect(status().isCreated());

        // Validate the DataCollector in the database
        List<DataCollector> dataCollectorList = dataCollectorRepository.findAll();
        assertThat(dataCollectorList).hasSize(databaseSizeBeforeCreate + 1);
        DataCollector testDataCollector = dataCollectorList.get(dataCollectorList.size() - 1);
        assertThat(testDataCollector.getIp()).isEqualTo(DEFAULT_IP);
        assertThat(testDataCollector.getSubnet()).isEqualTo(DEFAULT_SUBNET);
        assertThat(testDataCollector.getGateway()).isEqualTo(DEFAULT_GATEWAY);
        assertThat(testDataCollector.getDns()).isEqualTo(DEFAULT_DNS);
    }

    @Test
    @Transactional
    public void createDataCollectorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dataCollectorRepository.findAll().size();

        // Create the DataCollector with an existing ID
        dataCollector.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDataCollectorMockMvc.perform(post("/api/data-collectors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataCollector)))
            .andExpect(status().isBadRequest());

        // Validate the DataCollector in the database
        List<DataCollector> dataCollectorList = dataCollectorRepository.findAll();
        assertThat(dataCollectorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDataCollectors() throws Exception {
        // Initialize the database
        dataCollectorRepository.saveAndFlush(dataCollector);

        // Get all the dataCollectorList
        restDataCollectorMockMvc.perform(get("/api/data-collectors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dataCollector.getId().intValue())))
            .andExpect(jsonPath("$.[*].ip").value(hasItem(DEFAULT_IP.toString())))
            .andExpect(jsonPath("$.[*].subnet").value(hasItem(DEFAULT_SUBNET.toString())))
            .andExpect(jsonPath("$.[*].gateway").value(hasItem(DEFAULT_GATEWAY.toString())))
            .andExpect(jsonPath("$.[*].dns").value(hasItem(DEFAULT_DNS.toString())));
    }
    
    @Test
    @Transactional
    public void getDataCollector() throws Exception {
        // Initialize the database
        dataCollectorRepository.saveAndFlush(dataCollector);

        // Get the dataCollector
        restDataCollectorMockMvc.perform(get("/api/data-collectors/{id}", dataCollector.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dataCollector.getId().intValue()))
            .andExpect(jsonPath("$.ip").value(DEFAULT_IP.toString()))
            .andExpect(jsonPath("$.subnet").value(DEFAULT_SUBNET.toString()))
            .andExpect(jsonPath("$.gateway").value(DEFAULT_GATEWAY.toString()))
            .andExpect(jsonPath("$.dns").value(DEFAULT_DNS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDataCollector() throws Exception {
        // Get the dataCollector
        restDataCollectorMockMvc.perform(get("/api/data-collectors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDataCollector() throws Exception {
        // Initialize the database
        dataCollectorRepository.saveAndFlush(dataCollector);

        int databaseSizeBeforeUpdate = dataCollectorRepository.findAll().size();

        // Update the dataCollector
        DataCollector updatedDataCollector = dataCollectorRepository.findById(dataCollector.getId()).get();
        // Disconnect from session so that the updates on updatedDataCollector are not directly saved in db
        em.detach(updatedDataCollector);
        updatedDataCollector
            .ip(UPDATED_IP)
            .subnet(UPDATED_SUBNET)
            .gateway(UPDATED_GATEWAY)
            .dns(UPDATED_DNS);

        restDataCollectorMockMvc.perform(put("/api/data-collectors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDataCollector)))
            .andExpect(status().isOk());

        // Validate the DataCollector in the database
        List<DataCollector> dataCollectorList = dataCollectorRepository.findAll();
        assertThat(dataCollectorList).hasSize(databaseSizeBeforeUpdate);
        DataCollector testDataCollector = dataCollectorList.get(dataCollectorList.size() - 1);
        assertThat(testDataCollector.getIp()).isEqualTo(UPDATED_IP);
        assertThat(testDataCollector.getSubnet()).isEqualTo(UPDATED_SUBNET);
        assertThat(testDataCollector.getGateway()).isEqualTo(UPDATED_GATEWAY);
        assertThat(testDataCollector.getDns()).isEqualTo(UPDATED_DNS);
    }

    @Test
    @Transactional
    public void updateNonExistingDataCollector() throws Exception {
        int databaseSizeBeforeUpdate = dataCollectorRepository.findAll().size();

        // Create the DataCollector

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDataCollectorMockMvc.perform(put("/api/data-collectors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataCollector)))
            .andExpect(status().isBadRequest());

        // Validate the DataCollector in the database
        List<DataCollector> dataCollectorList = dataCollectorRepository.findAll();
        assertThat(dataCollectorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDataCollector() throws Exception {
        // Initialize the database
        dataCollectorRepository.saveAndFlush(dataCollector);

        int databaseSizeBeforeDelete = dataCollectorRepository.findAll().size();

        // Delete the dataCollector
        restDataCollectorMockMvc.perform(delete("/api/data-collectors/{id}", dataCollector.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DataCollector> dataCollectorList = dataCollectorRepository.findAll();
        assertThat(dataCollectorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataCollector.class);
        DataCollector dataCollector1 = new DataCollector();
        dataCollector1.setId(1L);
        DataCollector dataCollector2 = new DataCollector();
        dataCollector2.setId(dataCollector1.getId());
        assertThat(dataCollector1).isEqualTo(dataCollector2);
        dataCollector2.setId(2L);
        assertThat(dataCollector1).isNotEqualTo(dataCollector2);
        dataCollector1.setId(null);
        assertThat(dataCollector1).isNotEqualTo(dataCollector2);
    }
}
