import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-my-side-nav',
  templateUrl: './my-side-nav.component.html',
  styleUrls: ['./my-side-nav.component.scss']
})
export class MySideNavComponent {

constructor(private companySrv: CompanyService,
 public dialog: MatDialog,private toastrService: ToastrService){}

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  @Output() deletedConfirmed = new EventEmitter();

  ngOnInit() {}

  openTempDialog() {
    const myTempDialog = this.dialog.open(this.dialogRef, { data: null });
    myTempDialog.afterClosed().subscribe(() => {});
  }

  deleteDialog(){
    this.companySrv.deleteAllCompanies().subscribe(()=>{this.toastrService.success('All companies deleted','Success!');this.companySrv.deleteAllComEvent.next(true)});
}

}
