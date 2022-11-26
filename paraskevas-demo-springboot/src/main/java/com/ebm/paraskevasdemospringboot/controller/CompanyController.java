package com.ebm.paraskevasdemospringboot.controller;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ebm.paraskevasdemospringboot.model.Company;
import com.ebm.paraskevasdemospringboot.repository.CompanyRepository;
import com.ebm.paraskevasdemospringboot.exception.ResourceNotFoundException;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class CompanyController {

    @Autowired
    CompanyRepository companyRepository;

    @GetMapping("/companies")
    public ResponseEntity<List<Company>> getAllCompanies(@RequestParam(required = false) String name) {
        List<Company> companyList = new ArrayList<Company>();

        if (name == null)
            companyRepository.findAll().forEach(companyList::add);
        else
            companyRepository.findByNameContaining(name).forEach(companyList::add);

        if (companyList.isEmpty()) {
            return new ResponseEntity<>(companyList,HttpStatus.OK);
        }

        return new ResponseEntity<>(companyList, HttpStatus.OK);
    }

    @GetMapping("/companies/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable("id") long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Company with id = " + id));
        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    @PostMapping("/companies")
    public ResponseEntity<Company> createCompany(@RequestBody Company company) {
        Company new_company = companyRepository.save(new Company(company.getName()));
        return new ResponseEntity<>(new_company, HttpStatus.CREATED);
    }

    @PutMapping("/companies/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable("id") long id, @RequestBody Company company) {
        Company theCompany = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Company with id = " + id));

        theCompany.setName(company.getName());

        return new ResponseEntity<>(companyRepository.save(theCompany), HttpStatus.OK);
    }

    @DeleteMapping("/companies/{id}")
    public ResponseEntity<HttpStatus> deleteCompany(@PathVariable("id") long id) {
        companyRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/companies")
    public ResponseEntity<HttpStatus> deleteAllCompanies() {
        companyRepository.deleteAll();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
