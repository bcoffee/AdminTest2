package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.Admin225App;

import io.github.jhipster.application.domain.ArticleType;
import io.github.jhipster.application.repository.ArticleTypeRepository;
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

import io.github.jhipster.application.domain.enumeration.SystemType;
/**
 * Test class for the ArticleTypeResource REST controller.
 *
 * @see ArticleTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Admin225App.class)
public class ArticleTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final SystemType DEFAULT_SYSTEM_TYPE = SystemType.PLANT;
    private static final SystemType UPDATED_SYSTEM_TYPE = SystemType.AREA;

    @Autowired
    private ArticleTypeRepository articleTypeRepository;

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

    private MockMvc restArticleTypeMockMvc;

    private ArticleType articleType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticleTypeResource articleTypeResource = new ArticleTypeResource(articleTypeRepository);
        this.restArticleTypeMockMvc = MockMvcBuilders.standaloneSetup(articleTypeResource)
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
    public static ArticleType createEntity(EntityManager em) {
        ArticleType articleType = new ArticleType()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .systemType(DEFAULT_SYSTEM_TYPE);
        return articleType;
    }

    @Before
    public void initTest() {
        articleType = createEntity(em);
    }

    @Test
    @Transactional
    public void createArticleType() throws Exception {
        int databaseSizeBeforeCreate = articleTypeRepository.findAll().size();

        // Create the ArticleType
        restArticleTypeMockMvc.perform(post("/api/article-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleType)))
            .andExpect(status().isCreated());

        // Validate the ArticleType in the database
        List<ArticleType> articleTypeList = articleTypeRepository.findAll();
        assertThat(articleTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ArticleType testArticleType = articleTypeList.get(articleTypeList.size() - 1);
        assertThat(testArticleType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testArticleType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testArticleType.getSystemType()).isEqualTo(DEFAULT_SYSTEM_TYPE);
    }

    @Test
    @Transactional
    public void createArticleTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articleTypeRepository.findAll().size();

        // Create the ArticleType with an existing ID
        articleType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticleTypeMockMvc.perform(post("/api/article-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleType)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleType in the database
        List<ArticleType> articleTypeList = articleTypeRepository.findAll();
        assertThat(articleTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleTypeRepository.findAll().size();
        // set the field null
        articleType.setName(null);

        // Create the ArticleType, which fails.

        restArticleTypeMockMvc.perform(post("/api/article-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleType)))
            .andExpect(status().isBadRequest());

        List<ArticleType> articleTypeList = articleTypeRepository.findAll();
        assertThat(articleTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSystemTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleTypeRepository.findAll().size();
        // set the field null
        articleType.setSystemType(null);

        // Create the ArticleType, which fails.

        restArticleTypeMockMvc.perform(post("/api/article-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleType)))
            .andExpect(status().isBadRequest());

        List<ArticleType> articleTypeList = articleTypeRepository.findAll();
        assertThat(articleTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllArticleTypes() throws Exception {
        // Initialize the database
        articleTypeRepository.saveAndFlush(articleType);

        // Get all the articleTypeList
        restArticleTypeMockMvc.perform(get("/api/article-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(articleType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].systemType").value(hasItem(DEFAULT_SYSTEM_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getArticleType() throws Exception {
        // Initialize the database
        articleTypeRepository.saveAndFlush(articleType);

        // Get the articleType
        restArticleTypeMockMvc.perform(get("/api/article-types/{id}", articleType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(articleType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.systemType").value(DEFAULT_SYSTEM_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingArticleType() throws Exception {
        // Get the articleType
        restArticleTypeMockMvc.perform(get("/api/article-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticleType() throws Exception {
        // Initialize the database
        articleTypeRepository.saveAndFlush(articleType);

        int databaseSizeBeforeUpdate = articleTypeRepository.findAll().size();

        // Update the articleType
        ArticleType updatedArticleType = articleTypeRepository.findById(articleType.getId()).get();
        // Disconnect from session so that the updates on updatedArticleType are not directly saved in db
        em.detach(updatedArticleType);
        updatedArticleType
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .systemType(UPDATED_SYSTEM_TYPE);

        restArticleTypeMockMvc.perform(put("/api/article-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArticleType)))
            .andExpect(status().isOk());

        // Validate the ArticleType in the database
        List<ArticleType> articleTypeList = articleTypeRepository.findAll();
        assertThat(articleTypeList).hasSize(databaseSizeBeforeUpdate);
        ArticleType testArticleType = articleTypeList.get(articleTypeList.size() - 1);
        assertThat(testArticleType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testArticleType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testArticleType.getSystemType()).isEqualTo(UPDATED_SYSTEM_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingArticleType() throws Exception {
        int databaseSizeBeforeUpdate = articleTypeRepository.findAll().size();

        // Create the ArticleType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticleTypeMockMvc.perform(put("/api/article-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleType)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleType in the database
        List<ArticleType> articleTypeList = articleTypeRepository.findAll();
        assertThat(articleTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArticleType() throws Exception {
        // Initialize the database
        articleTypeRepository.saveAndFlush(articleType);

        int databaseSizeBeforeDelete = articleTypeRepository.findAll().size();

        // Delete the articleType
        restArticleTypeMockMvc.perform(delete("/api/article-types/{id}", articleType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ArticleType> articleTypeList = articleTypeRepository.findAll();
        assertThat(articleTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArticleType.class);
        ArticleType articleType1 = new ArticleType();
        articleType1.setId(1L);
        ArticleType articleType2 = new ArticleType();
        articleType2.setId(articleType1.getId());
        assertThat(articleType1).isEqualTo(articleType2);
        articleType2.setId(2L);
        assertThat(articleType1).isNotEqualTo(articleType2);
        articleType1.setId(null);
        assertThat(articleType1).isNotEqualTo(articleType2);
    }
}
