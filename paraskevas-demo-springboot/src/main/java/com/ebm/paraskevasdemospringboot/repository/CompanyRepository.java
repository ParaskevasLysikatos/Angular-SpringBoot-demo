package com.ebm.paraskevasdemospringboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ebm.paraskevasdemospringboot.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    List<Company> findByNameContaining(String name);
  }
