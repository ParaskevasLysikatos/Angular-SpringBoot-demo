import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { MatToolbarModule } from  '@angular/material/toolbar'
import { MatSidenavModule } from  '@angular/material/sidenav'
import { MatListModule } from  '@angular/material/list'
import { MatButtonModule } from  '@angular/material/button'
import { MatIconModule } from  '@angular/material/icon'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MySideNavComponent } from './components/my-side-nav/my-side-nav.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { PreviewCompanyComponent } from './components/preview-company/preview-company.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { GlobalHttpInterceptorService } from './services/globalHttpInterceptor.service';
import { NumericDirective } from './services/numeric.directive';


@NgModule({
  declarations: [
    AppComponent,
    MySideNavComponent,
    PageNotFoundComponent,
    DashboardComponent,
    CreateCompanyComponent,
    PreviewCompanyComponent,
    EditCompanyComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    NumericDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 2 seconds
      progressBar: true,
    }),

    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [ GlobalHttpInterceptorService,
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
