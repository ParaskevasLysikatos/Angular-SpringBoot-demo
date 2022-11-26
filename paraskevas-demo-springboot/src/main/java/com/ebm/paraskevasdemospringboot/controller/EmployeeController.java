package com.ebm.paraskevasdemospringboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ebm.paraskevasdemospringboot.exception.ResourceNotFoundException;
import com.ebm.paraskevasdemospringboot.model.Employee;
import com.ebm.paraskevasdemospringboot.repository.CompanyRepository;
import com.ebm.paraskevasdemospringboot.repository.EmployeeRepository;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class EmployeeController {
    
  @Autowired
  private CompanyRepository companyRepository;

  @Autowired
  private EmployeeRepository employeeRepository;

  @GetMapping("/companies/{companyId}/employees")
  public ResponseEntity<List<Employee>> getAllEmployeesByCompanyId(@PathVariable(value = "companyId") Long companyId) {
    if (!companyRepository.existsById(companyId)) {
      throw new ResourceNotFoundException("Not found Company with id = " + companyId);
    }

    List<Employee> employeeList = employeeRepository.findByCompanyId(companyId);
    return new ResponseEntity<>(employeeList, HttpStatus.OK);
  }
  
  @GetMapping("/companies/{companyId}/avgSalary")
  public ResponseEntity<Float> getAvgSalaryByCompanyId(@PathVariable(value = "companyId") Long companyId) {
    if (!companyRepository.existsById(companyId)) {
      throw new ResourceNotFoundException("Not found Company with id = " + companyId);
    }

    List<Employee> employeeList = employeeRepository.findByCompanyId(companyId);
    float sum = employeeList.stream().map(emp->emp.getSalary()).reduce(0f, (Float a, Float b) -> a + b);
    float avg = sum / employeeList.size();
    if(Float.isNaN(avg)) {
      return new ResponseEntity<Float>(0f, HttpStatus.OK);
    }
    return new ResponseEntity<Float>(avg, HttpStatus.OK);
  }
  
  @GetMapping("/employees/{id}")
  public ResponseEntity<Employee> getEmployeeId(@PathVariable(value = "id") Long id) {
    Employee employee = employeeRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Not found Employee with id = " + id));

    return new ResponseEntity<>(employee, HttpStatus.OK);
  }
  
  @GetMapping("/employees")
  public ResponseEntity<List<Employee>> getAllEmployees() {
    List<Employee> employeeList = employeeRepository.findAll();
    
    if (employeeList.isEmpty()) {
      return new ResponseEntity<>(employeeList,HttpStatus.OK);
  }
    return new ResponseEntity<>(employeeList, HttpStatus.OK);
  }

  @PostMapping("/companies/{companyId}/employee")
  public ResponseEntity<Employee> createEmployee(@PathVariable(value = "companyId") Long companyId,
      @RequestBody Employee employeeRequest) {
    Employee newEmployee = companyRepository.findById(companyId).map(company -> {
      employeeRequest.setCompany(company);
      return employeeRepository.save(employeeRequest);
    }).orElseThrow(() -> new ResourceNotFoundException("Not found Company with id = " + companyId));

    return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
  }
  
  @PutMapping("/employees/{id}")
  public ResponseEntity<Employee> updateEmployee(@PathVariable("id") long id, @RequestBody Employee employeeRequest) {
    Employee theEmployee = employeeRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("EmployeeId " + id + "not found"));

    theEmployee.setName(employeeRequest.getName());
    theEmployee.setSurname(employeeRequest.getSurname());
    theEmployee.setEmail(employeeRequest.getEmail());
    theEmployee.setAddress(employeeRequest.getAddress());
    theEmployee.setSalary(employeeRequest.getSalary());

    return new ResponseEntity<>(employeeRepository.save(theEmployee), HttpStatus.OK);
  }

  @DeleteMapping("/employees/{id}")
  public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable("id") long id) {
    employeeRepository.deleteById(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  
  @DeleteMapping("/companies/{companyId}/employees")
  public ResponseEntity<List<Employee>> deleteAllEmployeesOfCompany(@PathVariable(value = "companyId") Long companyId) {
    if (!companyRepository.existsById(companyId)) {
      throw new ResourceNotFoundException("Not found Company with id = " + companyId);
    }

    employeeRepository.deleteByCompanyId(companyId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  
}
