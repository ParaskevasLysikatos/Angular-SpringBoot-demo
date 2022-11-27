import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { count, map, Observable, of, tap } from 'rxjs';
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

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  @ViewChild('comSelect') comSelect!:MatSelect;

constructor(private companySrv: CompanyService,
            private employeeSrv: EmployeeService,public dialog: MatDialog,private toastrService: ToastrService){
}

ngOnInit() {
  this.totalCompanies$=this.companySrv.getAllCompanies().pipe(tap((res)=>this.companies=res),map(companies=>companies.length>0 ? companies.length : 0),tap((result) => console.log(result)));
  this.totalEmployees$=this.employeeSrv.getAllEmployees().pipe(map(employees=>employees.length>0 ? employees.length : 0),tap((result) => console.log(result)));
}

openTempDialog() {
  const myTempDialog = this.dialog.open(this.dialogRef, { data: null });
  myTempDialog.afterClosed().subscribe(() => {});
}

deleteDialog(){
    this.companySrv.deleteAllCompanies().subscribe(()=>this.toastrService.success('All companies deleted','Success!'));
    this.totalCompanies$=of(0);
    this.totalEmployees$=of(0);
    this.companies=[];
}

// NavigateToCompany(){
//   console.log(this.comSelect.value);
// }

}
