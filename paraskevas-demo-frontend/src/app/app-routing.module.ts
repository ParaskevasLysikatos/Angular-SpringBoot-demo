import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PreviewCompanyComponent } from './components/preview-company/preview-company.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-company', component: CreateCompanyComponent },
  { path: 'preview-company', component: PreviewCompanyComponent },
  { path: 'edit-company/:id', component: EditCompanyComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
