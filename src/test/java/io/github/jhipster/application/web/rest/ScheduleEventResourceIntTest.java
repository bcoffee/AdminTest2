package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.Admin225App;

import io.github.jhipster.application.domain.ScheduleEvent;
import io.github.jhipster.application.repository.ScheduleEventRepository;
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
 * Test class for the ScheduleEventResource REST controller.
 *
 * @see ScheduleEventResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Admin225App.class)
public class ScheduleEventResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_START = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_PLANNED = false;
    private static final Boolean UPDATED_PLANNED = true;

    private static final Float DEFAULT_CYCLETIME_OVERRIDE = 1F;
    private static final Float UPDATED_CYCLETIME_OVERRIDE = 2F;

    private static final Float DEFAULT_TARGET_EFFICIENCY = 1F;
    private static final Float UPDATED_TARGET_EFFICIENCY = 2F;

    @Autowired
    private ScheduleEventRepository scheduleEventRepository;

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

    private MockMvc restScheduleEventMockMvc;

    private ScheduleEvent scheduleEvent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ScheduleEventResource scheduleEventResource = new ScheduleEventResource(scheduleEventRepository);
        this.restScheduleEventMockMvc = MockMvcBuilders.standaloneSetup(scheduleEventResource)
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
    public static ScheduleEvent createEntity(EntityManager em) {
        ScheduleEvent scheduleEvent = new ScheduleEvent()
            .name(DEFAULT_NAME)
            .label(DEFAULT_LABEL)
            .start(DEFAULT_START)
            .end(DEFAULT_END)
            .planned(DEFAULT_PLANNED)
            .cycletimeOverride(DEFAULT_CYCLETIME_OVERRIDE)
            .targetEfficiency(DEFAULT_TARGET_EFFICIENCY);
        return scheduleEvent;
    }

    @Before
    public void initTest() {
        scheduleEvent = createEntity(em);
    }

    @Test
    @Transactional
    public void createScheduleEvent() throws Exception {
        int databaseSizeBeforeCreate = scheduleEventRepository.findAll().size();

        // Create the ScheduleEvent
        restScheduleEventMockMvc.perform(post("/api/schedule-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scheduleEvent)))
            .andExpect(status().isCreated());

        // Validate the ScheduleEvent in the database
        List<ScheduleEvent> scheduleEventList = scheduleEventRepository.findAll();
        assertThat(scheduleEventList).hasSize(databaseSizeBeforeCreate + 1);
        ScheduleEvent testScheduleEvent = scheduleEventList.get(scheduleEventList.size() - 1);
        assertThat(testScheduleEvent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testScheduleEvent.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testScheduleEvent.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testScheduleEvent.getEnd()).isEqualTo(DEFAULT_END);
        assertThat(testScheduleEvent.isPlanned()).isEqualTo(DEFAULT_PLANNED);
        assertThat(testScheduleEvent.getCycletimeOverride()).isEqualTo(DEFAULT_CYCLETIME_OVERRIDE);
        assertThat(testScheduleEvent.getTargetEfficiency()).isEqualTo(DEFAULT_TARGET_EFFICIENCY);
    }

    @Test
    @Transactional
    public void createScheduleEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = scheduleEventRepository.findAll().size();

        // Create the ScheduleEvent with an existing ID
        scheduleEvent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restScheduleEventMockMvc.perform(post("/api/schedule-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scheduleEvent)))
            .andExpect(status().isBadRequest());

        // Validate the ScheduleEvent in the database
        List<ScheduleEvent> scheduleEventList = scheduleEventRepository.findAll();
        assertThat(scheduleEventList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = scheduleEventRepository.findAll().size();
        // set the field null
        scheduleEvent.setName(null);

        // Create the ScheduleEvent, which fails.

        restScheduleEventMockMvc.perform(post("/api/schedule-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scheduleEvent)))
            .andExpect(status().isBadRequest());

        List<ScheduleEvent> scheduleEventList = scheduleEventRepository.findAll();
        assertThat(scheduleEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllScheduleEvents() throws Exception {
        // Initialize the database
        scheduleEventRepository.saveAndFlush(scheduleEvent);

        // Get all the scheduleEventList
        restScheduleEventMockMvc.perform(get("/api/schedule-events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(scheduleEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(sameInstant(DEFAULT_START))))
            .andExpect(jsonPath("$.[*].end").value(hasItem(sameInstant(DEFAULT_END))))
            .andExpect(jsonPath("$.[*].planned").value(hasItem(DEFAULT_PLANNED.booleanValue())))
            .andExpect(jsonPath("$.[*].cycletimeOverride").value(hasItem(DEFAULT_CYCLETIME_OVERRIDE.doubleValue())))
            .andExpect(jsonPath("$.[*].targetEfficiency").value(hasItem(DEFAULT_TARGET_EFFICIENCY.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getScheduleEvent() throws Exception {
        // Initialize the database
        scheduleEventRepository.saveAndFlush(scheduleEvent);

        // Get the scheduleEvent
        restScheduleEventMockMvc.perform(get("/api/schedule-events/{id}", scheduleEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(scheduleEvent.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()))
            .andExpect(jsonPath("$.start").value(sameInstant(DEFAULT_START)))
            .andExpect(jsonPath("$.end").value(sameInstant(DEFAULT_END)))
            .andExpect(jsonPath("$.planned").value(DEFAULT_PLANNED.booleanValue()))
            .andExpect(jsonPath("$.cycletimeOverride").value(DEFAULT_CYCLETIME_OVERRIDE.doubleValue()))
            .andExpect(jsonPath("$.targetEfficiency").value(DEFAULT_TARGET_EFFICIENCY.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingScheduleEvent() throws Exception {
        // Get the scheduleEvent
        restScheduleEventMockMvc.perform(get("/api/schedule-events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateScheduleEvent() throws Exception {
        // Initialize the database
        scheduleEventRepository.saveAndFlush(scheduleEvent);

        int databaseSizeBeforeUpdate = scheduleEventRepository.findAll().size();

        // Update the scheduleEvent
        ScheduleEvent updatedScheduleEvent = scheduleEventRepository.findById(scheduleEvent.getId()).get();
        // Disconnect from session so that the updates on updatedScheduleEvent are not directly saved in db
        em.detach(updatedScheduleEvent);
        updatedScheduleEvent
            .name(UPDATED_NAME)
            .label(UPDATED_LABEL)
            .start(UPDATED_START)
            .end(UPDATED_END)
            .planned(UPDATED_PLANNED)
            .cycletimeOverride(UPDATED_CYCLETIME_OVERRIDE)
            .targetEfficiency(UPDATED_TARGET_EFFICIENCY);

        restScheduleEventMockMvc.perform(put("/api/schedule-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedScheduleEvent)))
            .andExpect(status().isOk());

        // Validate the ScheduleEvent in the database
        List<ScheduleEvent> scheduleEventList = scheduleEventRepository.findAll();
        assertThat(scheduleEventList).hasSize(databaseSizeBeforeUpdate);
        ScheduleEvent testScheduleEvent = scheduleEventList.get(scheduleEventList.size() - 1);
        assertThat(testScheduleEvent.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testScheduleEvent.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testScheduleEvent.getStart()).isEqualTo(UPDATED_START);
        assertThat(testScheduleEvent.getEnd()).isEqualTo(UPDATED_END);
        assertThat(testScheduleEvent.isPlanned()).isEqualTo(UPDATED_PLANNED);
        assertThat(testScheduleEvent.getCycletimeOverride()).isEqualTo(UPDATED_CYCLETIME_OVERRIDE);
        assertThat(testScheduleEvent.getTargetEfficiency()).isEqualTo(UPDATED_TARGET_EFFICIENCY);
    }

    @Test
    @Transactional
    public void updateNonExistingScheduleEvent() throws Exception {
        int databaseSizeBeforeUpdate = scheduleEventRepository.findAll().size();

        // Create the ScheduleEvent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restScheduleEventMockMvc.perform(put("/api/schedule-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scheduleEvent)))
            .andExpect(status().isBadRequest());

        // Validate the ScheduleEvent in the database
        List<ScheduleEvent> scheduleEventList = scheduleEventRepository.findAll();
        assertThat(scheduleEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteScheduleEvent() throws Exception {
        // Initialize the database
        scheduleEventRepository.saveAndFlush(scheduleEvent);

        int databaseSizeBeforeDelete = scheduleEventRepository.findAll().size();

        // Delete the scheduleEvent
        restScheduleEventMockMvc.perform(delete("/api/schedule-events/{id}", scheduleEvent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ScheduleEvent> scheduleEventList = scheduleEventRepository.findAll();
        assertThat(scheduleEventList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ScheduleEvent.class);
        ScheduleEvent scheduleEvent1 = new ScheduleEvent();
        scheduleEvent1.setId(1L);
        ScheduleEvent scheduleEvent2 = new ScheduleEvent();
        scheduleEvent2.setId(scheduleEvent1.getId());
        assertThat(scheduleEvent1).isEqualTo(scheduleEvent2);
        scheduleEvent2.setId(2L);
        assertThat(scheduleEvent1).isNotEqualTo(scheduleEvent2);
        scheduleEvent1.setId(null);
        assertThat(scheduleEvent1).isNotEqualTo(scheduleEvent2);
    }
}
