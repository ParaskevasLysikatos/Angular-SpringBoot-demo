import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/interfaces/company.interface';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-preview-company',
  templateUrl: './preview-company.component.html',
  styleUrls: ['./preview-company.component.scss']
})
export class PreviewCompanyComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private companySrv: CompanyService,private toastrService: ToastrService) {}

  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  dataSource:any;
  checkCompanies:Company[]=[];


  ngOnInit() {
    this.refreshCompanyTable();
    this.companySrv.deleteAllComEvent.subscribe((res)=>{
      if(res){
        this.refreshCompanyTable();
        this.companySrv.deleteAllComEvent.next(false);
      }
    });
  }


  refreshCompanyTable(){
    this.companySrv.getAllCompanies().subscribe((res)=>{
      this.checkCompanies=res;
      console.log(this.checkCompanies);
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      });
  }

  deleteCompany(id:number){
      this.companySrv.deleteCompany(id).subscribe((res)=>{
        this.toastrService.success('Company deleted','Success!');
        this.refreshCompanyTable();
      });
  }

}


