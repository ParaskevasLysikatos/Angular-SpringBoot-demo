package com.ebm.paraskevasdemospringboot.model;

import javax.persistence.*;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", unique=true, nullable = false)
    private String name;

    public Company() {}
    
    public Company(String name) {
        this.name = name;
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
}
