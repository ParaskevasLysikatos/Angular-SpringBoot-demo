import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { map, Observable, of, tap } from 'rxjs';
import { Company } from 'src/app/interfaces/company.interface';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  totalCompanies$!: Observable<number>;
  totalEmployees$!: Observable<number>;

  companies:Company[] = [];

  @ViewChild('comSelect') comSelect!:MatSelect;

constructor(private companySrv: CompanyService,
            private employeeSrv: EmployeeService){
}

ngOnInit() {
  this.totalCompanies$=this.companySrv.getAllCompanies().pipe(tap((res)=>this.companies=res),map(companies=>companies.length>0 ? companies.length : 0),tap((result) => console.log(result)));
  this.totalEmployees$=this.employeeSrv.getAllEmployees().pipe(map(employees=>employees.length>0 ? employees.length : 0),tap((result) => console.log(result)));
  this.companySrv.deleteAllComEvent.subscribe((res)=>{
    if(res){
      this.cleanUpValues();
      this.companySrv.deleteAllComEvent.next(false);
    }
  });
}


cleanUpValues(){
    this.totalCompanies$=of(0);
    this.totalEmployees$=of(0);
    this.companies=[];
}

}
