package com.ebm.paraskevasdemospringboot.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ebm.paraskevasdemospringboot.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByCompanyId(Long companyId);

    @Transactional
    void deleteByCompanyId(long companyId);
}
