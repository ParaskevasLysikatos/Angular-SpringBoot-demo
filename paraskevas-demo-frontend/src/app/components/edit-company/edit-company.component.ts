import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs';
import { Company } from 'src/app/interfaces/company.interface';
import { Employee } from 'src/app/interfaces/employee.interface';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent {

  companyForm!: FormGroup;
  submitted = false;

  companyID!:number;
  companyName!:string;
  companyNumberOfEmployees!:number;
  companyAvgSalary!:number;
  companyEmployees!:Employee[];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'address', 'salary', 'edit', 'delete'];
  dataSource:any;

  @ViewChild('dialogRefDelAllEmp')
  dialogRefDelAllEmp!: TemplateRef<any>;
  @ViewChild('dialogRefDelEmp')
  dialogRefDelEmp!: TemplateRef<any>;

  dialogRefCreateEmp: any;
  dialogRefEditEmp: any;

  constructor(
    private fb: FormBuilder,
		private companySrv: CompanyService,
    private employeeSrv:EmployeeService,
    private toastrService: ToastrService,
		private route: ActivatedRoute,
    public dialog: MatDialog
		) { }

    ngOnInit() {
      this.companyForm = this.fb.group({
        name: ['', Validators.required],
        });
      this.companyID= Number(this.route.snapshot.paramMap.get('id'));
      this.refreshCompany();
    }

    get companyFormControl() {
      return this.companyForm.controls;
    }

    refreshCompany(){
      this.companySrv.getCompany(this.companyID).subscribe((res)=>{
        this.companyName=res.name;
        this.companyForm.controls['name'].patchValue(res.name);
        this.employeeSrv.getAllCompanyEmployees(this.companyID)
        .pipe(tap((res)=>{
          this.companyEmployees=res;
          console.log(this.companyEmployees);
          this.dataSource=new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          }),map(employees=>employees.length>0 ? employees.length : 0))
        .subscribe((res)=>this.companyNumberOfEmployees=res);
        this.employeeSrv.getCompanyAvgSalary(this.companyID)
        .subscribe((res)=>this.companyAvgSalary=res);
      });
    }

    onSubmit() {
      this.submitted = true;
    if (this.companyForm.valid) {
      console.table(this.companyForm.value);
    }
    let editedCompany:Company=this.companyForm.value;
    this.companySrv.editCompany(editedCompany,this.companyID).subscribe((res)=>{
      console.table(res);
      this.submitted = false;
      this.companyForm.markAsPristine();
      this.companyForm.reset();
      this.toastrService.success('Company edited','Success!');
      this.refreshCompany();
    });
    }

    createEmployeeModal(){
      this.dialogRefCreateEmp = this.dialog.open(CreateEmployeeComponent,
        { data: null , height: '80%', width: '60%', autoFocus: true ,disableClose: true});

      this.dialogRefCreateEmp.afterClosed().subscribe((res:Employee) => {
        console.log('The User dialog was closed.');
        console.table(res);
        if(res){
        let createEmployee: Employee =res;
        this.employeeSrv.createEmployee(createEmployee,this.companyID)
        .subscribe(()=>{this.refreshCompany();this.toastrService.success('Employee created','Success!');})
        }
      });
    }

    deleteAllEmployeesModal(){
      const myTempDialog = this.dialog.open(this.dialogRefDelAllEmp, { data: null });
      myTempDialog.afterClosed().subscribe(() => {});
    }

    deleteAllEmployeesOfCompany(){
      this.employeeSrv.deleteAllEmployeesOfCompany(this.companyID).subscribe((res)=>{
        this.toastrService.success('All employees of this company deleted','Success!');
        this.refreshCompany();
      });
    }

    editEmployeeModal(id:number){
      this.employeeSrv.getEmployee(id).subscribe((res)=>{
        this.dialogRefEditEmp = this.dialog.open(EditEmployeeComponent,
          { data: res , height: '80%', width: '60%', autoFocus: true ,disableClose: true});
          this.dialogRefEditEmp.afterClosed().subscribe((res:Employee) => {
            console.log('The User dialog was closed.');
            console.table(res);
            if(res){
            let editEmployee: Employee =res;
            this.employeeSrv.editEmployee(editEmployee,id)
            .subscribe(()=>{this.refreshCompany();this.toastrService.success('Employee edited','Success!');})
            }
          });
      });


    }

    deleteEmployeeModal(id:number){
      const myTempDialog = this.dialog.open(this.dialogRefDelEmp, { data: id });
      myTempDialog.afterClosed().subscribe((res) => {
        // Data back from dialog
        console.log({ res });
      });
    }

    deleteEmployee(id:number){
      this.employeeSrv.deleteEmployee(id).subscribe((res)=>{
        this.toastrService.success('Employee deleted','Success!');
        this.refreshCompany();
      });
    }
}
