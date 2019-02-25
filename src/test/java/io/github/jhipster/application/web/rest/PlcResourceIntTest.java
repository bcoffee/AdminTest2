package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.Admin225App;

import io.github.jhipster.application.domain.Plc;
import io.github.jhipster.application.repository.PlcRepository;
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
 * Test class for the PlcResource REST controller.
 *
 * @see PlcResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Admin225App.class)
public class PlcResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IP = "AAAAAAAAAA";
    private static final String UPDATED_IP = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private PlcRepository plcRepository;

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

    private MockMvc restPlcMockMvc;

    private Plc plc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlcResource plcResource = new PlcResource(plcRepository);
        this.restPlcMockMvc = MockMvcBuilders.standaloneSetup(plcResource)
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
    public static Plc createEntity(EntityManager em) {
        Plc plc = new Plc()
            .name(DEFAULT_NAME)
            .ip(DEFAULT_IP)
            .description(DEFAULT_DESCRIPTION);
        return plc;
    }

    @Before
    public void initTest() {
        plc = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlc() throws Exception {
        int databaseSizeBeforeCreate = plcRepository.findAll().size();

        // Create the Plc
        restPlcMockMvc.perform(post("/api/plcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plc)))
            .andExpect(status().isCreated());

        // Validate the Plc in the database
        List<Plc> plcList = plcRepository.findAll();
        assertThat(plcList).hasSize(databaseSizeBeforeCreate + 1);
        Plc testPlc = plcList.get(plcList.size() - 1);
        assertThat(testPlc.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPlc.getIp()).isEqualTo(DEFAULT_IP);
        assertThat(testPlc.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createPlcWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = plcRepository.findAll().size();

        // Create the Plc with an existing ID
        plc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlcMockMvc.perform(post("/api/plcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plc)))
            .andExpect(status().isBadRequest());

        // Validate the Plc in the database
        List<Plc> plcList = plcRepository.findAll();
        assertThat(plcList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPlcs() throws Exception {
        // Initialize the database
        plcRepository.saveAndFlush(plc);

        // Get all the plcList
        restPlcMockMvc.perform(get("/api/plcs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plc.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].ip").value(hasItem(DEFAULT_IP.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getPlc() throws Exception {
        // Initialize the database
        plcRepository.saveAndFlush(plc);

        // Get the plc
        restPlcMockMvc.perform(get("/api/plcs/{id}", plc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(plc.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.ip").value(DEFAULT_IP.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlc() throws Exception {
        // Get the plc
        restPlcMockMvc.perform(get("/api/plcs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlc() throws Exception {
        // Initialize the database
        plcRepository.saveAndFlush(plc);

        int databaseSizeBeforeUpdate = plcRepository.findAll().size();

        // Update the plc
        Plc updatedPlc = plcRepository.findById(plc.getId()).get();
        // Disconnect from session so that the updates on updatedPlc are not directly saved in db
        em.detach(updatedPlc);
        updatedPlc
            .name(UPDATED_NAME)
            .ip(UPDATED_IP)
            .description(UPDATED_DESCRIPTION);

        restPlcMockMvc.perform(put("/api/plcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlc)))
            .andExpect(status().isOk());

        // Validate the Plc in the database
        List<Plc> plcList = plcRepository.findAll();
        assertThat(plcList).hasSize(databaseSizeBeforeUpdate);
        Plc testPlc = plcList.get(plcList.size() - 1);
        assertThat(testPlc.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPlc.getIp()).isEqualTo(UPDATED_IP);
        assertThat(testPlc.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingPlc() throws Exception {
        int databaseSizeBeforeUpdate = plcRepository.findAll().size();

        // Create the Plc

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlcMockMvc.perform(put("/api/plcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plc)))
            .andExpect(status().isBadRequest());

        // Validate the Plc in the database
        List<Plc> plcList = plcRepository.findAll();
        assertThat(plcList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlc() throws Exception {
        // Initialize the database
        plcRepository.saveAndFlush(plc);

        int databaseSizeBeforeDelete = plcRepository.findAll().size();

        // Delete the plc
        restPlcMockMvc.perform(delete("/api/plcs/{id}", plc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Plc> plcList = plcRepository.findAll();
        assertThat(plcList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plc.class);
        Plc plc1 = new Plc();
        plc1.setId(1L);
        Plc plc2 = new Plc();
        plc2.setId(plc1.getId());
        assertThat(plc1).isEqualTo(plc2);
        plc2.setId(2L);
        assertThat(plc1).isNotEqualTo(plc2);
        plc1.setId(null);
        assertThat(plc1).isNotEqualTo(plc2);
    }
}
