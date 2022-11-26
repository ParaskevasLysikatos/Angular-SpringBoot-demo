import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/interfaces/company.interface';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent {
  companyForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private companySrv: CompanyService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      });
  }

  get companyFormControl() {
    return this.companyForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.companyForm.valid) {
      console.table(this.companyForm.value);
    }
    let newCompany:Company={id:null,name:this.companyForm.controls['name'].value};
    this.companySrv.createCompany(newCompany).subscribe((res)=>{
      console.table(res);
      this.submitted = false;
      this.companyForm.markAsPristine();
      this.companyForm.reset();
      this.toastrService.success('Company created','Success!');
    });
  }
}
