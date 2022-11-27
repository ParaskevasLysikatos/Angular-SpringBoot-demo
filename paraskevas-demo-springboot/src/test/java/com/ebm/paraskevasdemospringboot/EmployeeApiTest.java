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
import com.ebm.paraskevasdemospringboot.controller.EmployeeController;
import com.ebm.paraskevasdemospringboot.model.Company;
import com.ebm.paraskevasdemospringboot.model.Employee;
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


@WebMvcTest(EmployeeController.class)
public class EmployeeApiTest {
    
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
  void shouldCreateEmployee() throws Exception {
    long id = 1L;
    Company company = new Company("Spring Boot @WebMvcTest");
    Employee employee = new Employee("name","surname","email@email.com","address",1000f,company);
    
    when(companyRepository.findById(id)).thenReturn(Optional.of(company));
    mockMvc.perform(post("/api/companies/{id}/employee", id).contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(employee)))
        .andExpect(status().isCreated())
        .andDo(print());
  }
    
}
