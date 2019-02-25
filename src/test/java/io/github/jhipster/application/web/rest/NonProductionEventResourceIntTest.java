package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.Admin225App;

import io.github.jhipster.application.domain.NonProductionEvent;
import io.github.jhipster.application.domain.ScheduleEvent;
import io.github.jhipster.application.repository.NonProductionEventRepository;
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
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.sameInstant;
import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the NonProductionEventResource REST controller.
 *
 * @see NonProductionEventResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Admin225App.class)
public class NonProductionEventResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_START = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final LocalDate DEFAULT_END = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private NonProductionEventRepository nonProductionEventRepository;

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

    private MockMvc restNonProductionEventMockMvc;

    private NonProductionEvent nonProductionEvent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NonProductionEventResource nonProductionEventResource = new NonProductionEventResource(nonProductionEventRepository);
        this.restNonProductionEventMockMvc = MockMvcBuilders.standaloneSetup(nonProductionEventResource)
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
    public static NonProductionEvent createEntity(EntityManager em) {
        NonProductionEvent nonProductionEvent = new NonProductionEvent()
            .name(DEFAULT_NAME)
            .label(DEFAULT_LABEL)
            .start(DEFAULT_START)
            .end(DEFAULT_END);
        // Add required entity
        ScheduleEvent scheduleEvent = ScheduleEventResourceIntTest.createEntity(em);
        em.persist(scheduleEvent);
        em.flush();
        nonProductionEvent.setScheduleEvent(scheduleEvent);
        return nonProductionEvent;
    }

    @Before
    public void initTest() {
        nonProductionEvent = createEntity(em);
    }

    @Test
    @Transactional
    public void createNonProductionEvent() throws Exception {
        int databaseSizeBeforeCreate = nonProductionEventRepository.findAll().size();

        // Create the NonProductionEvent
        restNonProductionEventMockMvc.perform(post("/api/non-production-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonProductionEvent)))
            .andExpect(status().isCreated());

        // Validate the NonProductionEvent in the database
        List<NonProductionEvent> nonProductionEventList = nonProductionEventRepository.findAll();
        assertThat(nonProductionEventList).hasSize(databaseSizeBeforeCreate + 1);
        NonProductionEvent testNonProductionEvent = nonProductionEventList.get(nonProductionEventList.size() - 1);
        assertThat(testNonProductionEvent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testNonProductionEvent.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testNonProductionEvent.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testNonProductionEvent.getEnd()).isEqualTo(DEFAULT_END);
    }

    @Test
    @Transactional
    public void createNonProductionEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nonProductionEventRepository.findAll().size();

        // Create the NonProductionEvent with an existing ID
        nonProductionEvent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNonProductionEventMockMvc.perform(post("/api/non-production-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonProductionEvent)))
            .andExpect(status().isBadRequest());

        // Validate the NonProductionEvent in the database
        List<NonProductionEvent> nonProductionEventList = nonProductionEventRepository.findAll();
        assertThat(nonProductionEventList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = nonProductionEventRepository.findAll().size();
        // set the field null
        nonProductionEvent.setName(null);

        // Create the NonProductionEvent, which fails.

        restNonProductionEventMockMvc.perform(post("/api/non-production-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonProductionEvent)))
            .andExpect(status().isBadRequest());

        List<NonProductionEvent> nonProductionEventList = nonProductionEventRepository.findAll();
        assertThat(nonProductionEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNonProductionEvents() throws Exception {
        // Initialize the database
        nonProductionEventRepository.saveAndFlush(nonProductionEvent);

        // Get all the nonProductionEventList
        restNonProductionEventMockMvc.perform(get("/api/non-production-events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nonProductionEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(sameInstant(DEFAULT_START))))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())));
    }
    
    @Test
    @Transactional
    public void getNonProductionEvent() throws Exception {
        // Initialize the database
        nonProductionEventRepository.saveAndFlush(nonProductionEvent);

        // Get the nonProductionEvent
        restNonProductionEventMockMvc.perform(get("/api/non-production-events/{id}", nonProductionEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nonProductionEvent.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()))
            .andExpect(jsonPath("$.start").value(sameInstant(DEFAULT_START)))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNonProductionEvent() throws Exception {
        // Get the nonProductionEvent
        restNonProductionEventMockMvc.perform(get("/api/non-production-events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNonProductionEvent() throws Exception {
        // Initialize the database
        nonProductionEventRepository.saveAndFlush(nonProductionEvent);

        int databaseSizeBeforeUpdate = nonProductionEventRepository.findAll().size();

        // Update the nonProductionEvent
        NonProductionEvent updatedNonProductionEvent = nonProductionEventRepository.findById(nonProductionEvent.getId()).get();
        // Disconnect from session so that the updates on updatedNonProductionEvent are not directly saved in db
        em.detach(updatedNonProductionEvent);
        updatedNonProductionEvent
            .name(UPDATED_NAME)
            .label(UPDATED_LABEL)
            .start(UPDATED_START)
            .end(UPDATED_END);

        restNonProductionEventMockMvc.perform(put("/api/non-production-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNonProductionEvent)))
            .andExpect(status().isOk());

        // Validate the NonProductionEvent in the database
        List<NonProductionEvent> nonProductionEventList = nonProductionEventRepository.findAll();
        assertThat(nonProductionEventList).hasSize(databaseSizeBeforeUpdate);
        NonProductionEvent testNonProductionEvent = nonProductionEventList.get(nonProductionEventList.size() - 1);
        assertThat(testNonProductionEvent.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNonProductionEvent.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testNonProductionEvent.getStart()).isEqualTo(UPDATED_START);
        assertThat(testNonProductionEvent.getEnd()).isEqualTo(UPDATED_END);
    }

    @Test
    @Transactional
    public void updateNonExistingNonProductionEvent() throws Exception {
        int databaseSizeBeforeUpdate = nonProductionEventRepository.findAll().size();

        // Create the NonProductionEvent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNonProductionEventMockMvc.perform(put("/api/non-production-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonProductionEvent)))
            .andExpect(status().isBadRequest());

        // Validate the NonProductionEvent in the database
        List<NonProductionEvent> nonProductionEventList = nonProductionEventRepository.findAll();
        assertThat(nonProductionEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNonProductionEvent() throws Exception {
        // Initialize the database
        nonProductionEventRepository.saveAndFlush(nonProductionEvent);

        int databaseSizeBeforeDelete = nonProductionEventRepository.findAll().size();

        // Delete the nonProductionEvent
        restNonProductionEventMockMvc.perform(delete("/api/non-production-events/{id}", nonProductionEvent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NonProductionEvent> nonProductionEventList = nonProductionEventRepository.findAll();
        assertThat(nonProductionEventList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NonProductionEvent.class);
        NonProductionEvent nonProductionEvent1 = new NonProductionEvent();
        nonProductionEvent1.setId(1L);
        NonProductionEvent nonProductionEvent2 = new NonProductionEvent();
        nonProductionEvent2.setId(nonProductionEvent1.getId());
        assertThat(nonProductionEvent1).isEqualTo(nonProductionEvent2);
        nonProductionEvent2.setId(2L);
        assertThat(nonProductionEvent1).isNotEqualTo(nonProductionEvent2);
        nonProductionEvent1.setId(null);
        assertThat(nonProductionEvent1).isNotEqualTo(nonProductionEvent2);
    }
}
