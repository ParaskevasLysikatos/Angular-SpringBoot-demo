package com.ebm.paraskevasdemospringboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.ebm.paraskevasdemospringboot.model.Company;
import com.ebm.paraskevasdemospringboot.model.Employee;
import com.ebm.paraskevasdemospringboot.repository.CompanyRepository;
import com.ebm.paraskevasdemospringboot.repository.EmployeeRepository;

@SpringBootApplication
public class ParaskevasDemoSpringbootApplication {
	@Autowired
	CompanyRepository companyRepository;
	@Autowired
	EmployeeRepository employeeRepository;

	public static void main(String[] args) {
		SpringApplication.run(ParaskevasDemoSpringbootApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner() {
		
		return args -> {
			Company comp1 = new Company("ParisCompany");
			Company comp2 = new Company("EbhCompany");
			
			companyRepository.save(comp1);
			companyRepository.save(comp2);
			comp1=companyRepository.findAll().get(0);
			comp2=companyRepository.findAll().get(1);

			Employee emp1 = new Employee(
					"paris",
					"lysikatos",
					"paris@hotmail.com",
					"troisdorf",
					1000.45f,
					comp1
					);
			
					Employee emp2 = new Employee(
					"test",
					"lysikatos_test",
					"test@hotmail.com",
					"troisdorf_test",
					1500.45f,
					comp1);
					
					Employee emp3 = new Employee(
						"senior",
						"senior_test",
						"senior@hotmail.com",
						"some address",
						1700.85f,
						comp1);
					
						Employee emp4 = new Employee(
							"junior",
							"junior_test",
							"junior@hotmail.com",
							"junior address",
							1200.85f,
							comp2);
					
					
					employeeRepository.save(emp1);
					employeeRepository.save(emp2);
					employeeRepository.save(emp3);
					employeeRepository.save(emp4);
		};
	}

}
