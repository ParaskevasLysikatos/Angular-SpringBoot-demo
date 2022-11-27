package com.ebm.paraskevasdemospringboot;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.ebm.paraskevasdemospringboot.controller.CompanyController;
import com.ebm.paraskevasdemospringboot.model.Company;
import com.ebm.paraskevasdemospringboot.repository.CompanyRepository;
import com.ebm.paraskevasdemospringboot.repository.EmployeeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@WebMvcTest(CompanyController.class)
public class CompanyApiTest {
    
  @MockBean
  private CompanyRepository companyRepository;
  
  @MockBean
  private EmployeeRepository employeeRepository;
  
  @MockBean
  CommandLineRunner commandLineRunner;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  void shouldCreateCompany() throws Exception {
    Company company = new Company("Spring Boot @WebMvcTest");

    mockMvc.perform(post("/api/companies").contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(company)))
        .andExpect(status().isCreated())
        .andDo(print());
  }
  
  @Test
  void shouldReturnCompany() throws Exception {
    long id = 1L;
    Company company = new Company("Spring Boot @WebMvcTest");

    when(companyRepository.findById(id)).thenReturn(Optional.of(company));
    mockMvc.perform(get("/api/companies/{id}", id)).andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(company.getId()))
        .andExpect(jsonPath("$.name").value(company.getName()))
        .andDo(print());
  }
  
  @Test
  void shouldReturnNotFoundCompany() throws Exception {
    long id = 1L;

    when(companyRepository.findById(id)).thenReturn(Optional.empty());
    mockMvc.perform(get("/api/companies/{id}", id))
         .andExpect(status().isNotFound())
         .andDo(print());
  }
  
  @Test
  void shouldReturnListOfCompanies() throws Exception {
    List<Company> companyList = new ArrayList<>(
        Arrays.asList(new Company("Spring Boot @WebMvcTest 1"),
            new Company("Spring Boot @WebMvcTest 2")));

    when(companyRepository.findAll()).thenReturn(companyList);
    mockMvc.perform(get("/api/companies"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.size()").value(companyList.size()))
        .andDo(print());
  }
  
  @Test
  void shouldReturnListOfCompaniesWithFilter() throws Exception {
    List<Company> compList = new ArrayList<>(
        Arrays.asList(new Company("Spring Boot @WebMvcTest"),
            new Company("Spring Boot Web MVC")));

    String name = "Boot";
    MultiValueMap<String, String> paramsMap = new LinkedMultiValueMap<>();
    paramsMap.add("name", name);

    when(companyRepository.findByNameContaining(name)).thenReturn(compList);
    mockMvc.perform(get("/api/companies").params(paramsMap))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.size()").value(compList.size()))
        .andDo(print());

    compList = Collections.emptyList();

    when(companyRepository.findByNameContaining(name)).thenReturn(compList);
    mockMvc.perform(get("/api/companies").params(paramsMap))
        .andExpect(status().isOk())
        .andDo(print());
  }
  
  @Test
  void shouldUpdateCompany() throws Exception {
    long id = 1L;

    Company company = new Company("Spring Boot @WebMvcTest");
    Company updatedCompany = new Company("Updated");

    when(companyRepository.findById(id)).thenReturn(Optional.of(company));
    when(companyRepository.save(any(Company.class))).thenReturn(updatedCompany);

    mockMvc.perform(put("/api/companies/{id}", id).contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(updatedCompany)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value(updatedCompany.getName()))
        .andDo(print());
  }
  
  @Test
  void shouldReturnNotFoundUpdateCompany() throws Exception {
    long id = 1L;

    Company updatedCompany = new Company("Updated");

    when(companyRepository.findById(id)).thenReturn(Optional.empty());
    when(companyRepository.save(any(Company.class))).thenReturn(updatedCompany);

    mockMvc.perform(put("/api/companies/{id}", id).contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(updatedCompany)))
        .andExpect(status().isNotFound())
        .andDo(print());
  }
  
  @Test
  void shouldDeleteCompany() throws Exception {
    long id = 1L;

    doNothing().when(companyRepository).deleteById(id);
    mockMvc.perform(delete("/api/companies/{id}", id))
         .andExpect(status().isNoContent())
         .andDo(print());
  }
  
  @Test
  void shouldDeleteAllCompanies() throws Exception {
    doNothing().when(companyRepository).deleteAll();
    mockMvc.perform(delete("/api/companies"))
         .andExpect(status().isNoContent())
         .andDo(print());
  }
    
}
