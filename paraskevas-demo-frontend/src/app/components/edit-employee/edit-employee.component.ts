import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/interfaces/employee.interface';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent {
  employeeForm!: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private fb: FormBuilder,
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['',],
      salary: ['', Validators.required],
      });
     }




  ngOnInit() {
    this.employeeForm.patchValue(this.data);
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

