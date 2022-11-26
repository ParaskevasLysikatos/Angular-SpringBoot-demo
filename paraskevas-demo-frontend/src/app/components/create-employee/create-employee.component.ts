import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/interfaces/employee.interface';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {

  employeeForm!: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<CreateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private fb: FormBuilder,
  ) { }




  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['',],
      salary: ['', Validators.required],
      });
  }

  get employeeFormControl() {
    return this.employeeForm.controls;
  }

  onCancelUserDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.valid) {
      console.table(this.employeeForm.value);
      console.table(this.employeeForm.controls);
    }
      this.submitted = false;
      this.dialogRef.close(this.employeeForm.value);
  }
}
