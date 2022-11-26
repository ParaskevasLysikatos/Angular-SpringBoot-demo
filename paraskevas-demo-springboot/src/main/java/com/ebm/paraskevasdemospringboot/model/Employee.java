package com.ebm.paraskevasdemospringboot.model;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "employees",uniqueConstraints = 
{ //other constraints
@UniqueConstraint(name = "employees", columnNames = { "name", "surname" })})
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",  nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "email",  nullable = false, unique=true)
    private String email;

    @Column(name = "address",  nullable = true)
    private String address;

    @Column(name = "salary", nullable = false)
    private float salary;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Company company;
    
    public Employee(){}
    
    public Employee(String name, String surname, String email, String address, float salary, Company company){
        this.name = name;
        this.surname = surname;
        this.email= email;
        this.address = address;
        this.salary = salary;
        this.company = company;
    }

    // getters and setters

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getSurname() {
        return this.surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
    
    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    
    public float getSalary() {
        return this.salary;
    }

    public void setSalary(float salary) {
        this.salary = salary;
    }
    
    public Company getCompany() {
        return this.company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
    

}
