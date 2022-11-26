import { HttpHeaders, HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, take } from 'rxjs';
import { Company } from '../interfaces/company.interface';
import { Employee } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly urlCompany="http://localhost:8080/api/companies";
  readonly urlEmployee="http://localhost:8080/api/employees";

  httpHeaders = new HttpHeaders({
   'Content-Type': 'application/json'
 });

   constructor(
     private httpClient: HttpClient,
   ) { }

   public getAllEmployees(): Observable<Employee[]> {
     return this.httpClient
       .get<Employee[]>(`${this.urlEmployee}`,{headers:this.httpHeaders})
       .pipe(take(1),shareReplay());
   }

   public getAllCompanyEmployees(id:number): Observable<Employee[]> {
    return this.httpClient
      .get<Employee[]>(`${this.urlCompany}/`+id+'/employees',{headers:this.httpHeaders})
      .pipe(take(1));
  }

  public getCompanyAvgSalary(id:number): Observable<number> {
    return this.httpClient
      .get<number>(`${this.urlCompany}/`+id+'/avgSalary',{headers:this.httpHeaders})
      .pipe(take(1));
  }

  public getEmployee(id:number): Observable<Employee> {
    return this.httpClient
      .get<Employee>(`${this.urlEmployee}/`+id,{headers:this.httpHeaders})
      .pipe(take(1));
  }

  public deleteAllEmployeesOfCompany(id:number): Observable<HttpStatusCode> {
    return this.httpClient
      .delete<HttpStatusCode>(`${this.urlCompany}/`+id+'/employees',{headers:this.httpHeaders})
      .pipe(take(1));
  }

  public deleteEmployee(id:number): Observable<HttpStatusCode> {
    return this.httpClient
      .delete<HttpStatusCode>(`${this.urlEmployee}/`+id,{headers:this.httpHeaders})
      .pipe(take(1));
  }

  public createEmployee(employee:Employee,companyId:number): Observable<Employee> {
    return this.httpClient
      .post<Employee>(`${this.urlCompany}/`+companyId+'/employee',{...employee},{headers:this.httpHeaders})
      .pipe(take(1));
  }

  public editEmployee(employee:Employee,id:number): Observable<Employee> {
    return this.httpClient
    .put<Employee>(`${this.urlEmployee}/`+id,{...employee},{headers:this.httpHeaders})
      .pipe(take(1));
  }

}
