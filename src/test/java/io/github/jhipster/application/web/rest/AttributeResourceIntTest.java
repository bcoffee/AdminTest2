package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.Admin225App;

import io.github.jhipster.application.domain.Attribute;
import io.github.jhipster.application.domain.ArticleType;
import io.github.jhipster.application.repository.AttributeRepository;
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

import io.github.jhipster.application.domain.enumeration.AttributeType;
/**
 * Test class for the AttributeResource REST controller.
 *
 * @see AttributeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Admin225App.class)
public class AttributeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final AttributeType DEFAULT_TYPE = AttributeType.STRING;
    private static final AttributeType UPDATED_TYPE = AttributeType.INTEGER;

    private static final Boolean DEFAULT_IS_SYSTEM = false;
    private static final Boolean UPDATED_IS_SYSTEM = true;

    private static final Boolean DEFAULT_NULLABLE = false;
    private static final Boolean UPDATED_NULLABLE = true;

    private static final Boolean DEFAULT_MUTLI_SELECT = false;
    private static final Boolean UPDATED_MUTLI_SELECT = true;

    @Autowired
    private AttributeRepository attributeRepository;

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

    private MockMvc restAttributeMockMvc;

    private Attribute attribute;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AttributeResource attributeResource = new AttributeResource(attributeRepository);
        this.restAttributeMockMvc = MockMvcBuilders.standaloneSetup(attributeResource)
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
    public static Attribute createEntity(EntityManager em) {
        Attribute attribute = new Attribute()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .type(DEFAULT_TYPE)
            .isSystem(DEFAULT_IS_SYSTEM)
            .nullable(DEFAULT_NULLABLE)
            .mutliSelect(DEFAULT_MUTLI_SELECT);
        // Add required entity
        ArticleType articleType = ArticleTypeResourceIntTest.createEntity(em);
        em.persist(articleType);
        em.flush();
        attribute.setArticleType(articleType);
        return attribute;
    }

    @Before
    public void initTest() {
        attribute = createEntity(em);
    }

    @Test
    @Transactional
    public void createAttribute() throws Exception {
        int databaseSizeBeforeCreate = attributeRepository.findAll().size();

        // Create the Attribute
        restAttributeMockMvc.perform(post("/api/attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attribute)))
            .andExpect(status().isCreated());

        // Validate the Attribute in the database
        List<Attribute> attributeList = attributeRepository.findAll();
        assertThat(attributeList).hasSize(databaseSizeBeforeCreate + 1);
        Attribute testAttribute = attributeList.get(attributeList.size() - 1);
        assertThat(testAttribute.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAttribute.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAttribute.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testAttribute.isIsSystem()).isEqualTo(DEFAULT_IS_SYSTEM);
        assertThat(testAttribute.isNullable()).isEqualTo(DEFAULT_NULLABLE);
        assertThat(testAttribute.isMutliSelect()).isEqualTo(DEFAULT_MUTLI_SELECT);
    }

    @Test
    @Transactional
    public void createAttributeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = attributeRepository.findAll().size();

        // Create the Attribute with an existing ID
        attribute.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAttributeMockMvc.perform(post("/api/attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attribute)))
            .andExpect(status().isBadRequest());

        // Validate the Attribute in the database
        List<Attribute> attributeList = attributeRepository.findAll();
        assertThat(attributeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = attributeRepository.findAll().size();
        // set the field null
        attribute.setName(null);

        // Create the Attribute, which fails.

        restAttributeMockMvc.perform(post("/api/attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attribute)))
            .andExpect(status().isBadRequest());

        List<Attribute> attributeList = attributeRepository.findAll();
        assertThat(attributeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = attributeRepository.findAll().size();
        // set the field null
        attribute.setType(null);

        // Create the Attribute, which fails.

        restAttributeMockMvc.perform(post("/api/attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attribute)))
            .andExpect(status().isBadRequest());

        List<Attribute> attributeList = attributeRepository.findAll();
        assertThat(attributeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsSystemIsRequired() throws Exception {
        int databaseSizeBeforeTest = attributeRepository.findAll().size();
        // set the field null
        attribute.setIsSystem(null);

        // Create the Attribute, which fails.

        restAttributeMockMvc.perform(post("/api/attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attribute)))
            .andExpect(status().isBadRequest());

        List<Attribute> attributeList = attributeRepository.findAll();
        assertThat(attributeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAttributes() throws Exception {
        // Initialize the database
        attributeRepository.saveAndFlush(attribute);

        // Get all the attributeList
        restAttributeMockMvc.perform(get("/api/attributes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(attribute.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].isSystem").value(hasItem(DEFAULT_IS_SYSTEM.booleanValue())))
            .andExpect(jsonPath("$.[*].nullable").value(hasItem(DEFAULT_NULLABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].mutliSelect").value(hasItem(DEFAULT_MUTLI_SELECT.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getAttribute() throws Exception {
        // Initialize the database
        attributeRepository.saveAndFlush(attribute);

        // Get the attribute
        restAttributeMockMvc.perform(get("/api/attributes/{id}", attribute.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(attribute.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.isSystem").value(DEFAULT_IS_SYSTEM.booleanValue()))
            .andExpect(jsonPath("$.nullable").value(DEFAULT_NULLABLE.booleanValue()))
            .andExpect(jsonPath("$.mutliSelect").value(DEFAULT_MUTLI_SELECT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAttribute() throws Exception {
        // Get the attribute
        restAttributeMockMvc.perform(get("/api/attributes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAttribute() throws Exception {
        // Initialize the database
        attributeRepository.saveAndFlush(attribute);

        int databaseSizeBeforeUpdate = attributeRepository.findAll().size();

        // Update the attribute
        Attribute updatedAttribute = attributeRepository.findById(attribute.getId()).get();
        // Disconnect from session so that the updates on updatedAttribute are not directly saved in db
        em.detach(updatedAttribute);
        updatedAttribute
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .type(UPDATED_TYPE)
            .isSystem(UPDATED_IS_SYSTEM)
            .nullable(UPDATED_NULLABLE)
            .mutliSelect(UPDATED_MUTLI_SELECT);

        restAttributeMockMvc.perform(put("/api/attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAttribute)))
            .andExpect(status().isOk());

        // Validate the Attribute in the database
        List<Attribute> attributeList = attributeRepository.findAll();
        assertThat(attributeList).hasSize(databaseSizeBeforeUpdate);
        Attribute testAttribute = attributeList.get(attributeList.size() - 1);
        assertThat(testAttribute.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAttribute.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAttribute.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testAttribute.isIsSystem()).isEqualTo(UPDATED_IS_SYSTEM);
        assertThat(testAttribute.isNullable()).isEqualTo(UPDATED_NULLABLE);
        assertThat(testAttribute.isMutliSelect()).isEqualTo(UPDATED_MUTLI_SELECT);
    }

    @Test
    @Transactional
    public void updateNonExistingAttribute() throws Exception {
        int databaseSizeBeforeUpdate = attributeRepository.findAll().size();

        // Create the Attribute

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttributeMockMvc.perform(put("/api/attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attribute)))
            .andExpect(status().isBadRequest());

        // Validate the Attribute in the database
        List<Attribute> attributeList = attributeRepository.findAll();
        assertThat(attributeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAttribute() throws Exception {
        // Initialize the database
        attributeRepository.saveAndFlush(attribute);

        int databaseSizeBeforeDelete = attributeRepository.findAll().size();

        // Delete the attribute
        restAttributeMockMvc.perform(delete("/api/attributes/{id}", attribute.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Attribute> attributeList = attributeRepository.findAll();
        assertThat(attributeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Attribute.class);
        Attribute attribute1 = new Attribute();
        attribute1.setId(1L);
        Attribute attribute2 = new Attribute();
        attribute2.setId(attribute1.getId());
        assertThat(attribute1).isEqualTo(attribute2);
        attribute2.setId(2L);
        assertThat(attribute1).isNotEqualTo(attribute2);
        attribute1.setId(null);
        assertThat(attribute1).isNotEqualTo(attribute2);
    }
}
