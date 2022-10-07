import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { CommonModule } from '@angular/common';
import { from } from 'rxjs';
const routes: Routes = [
{path: 'list', component: ListEmployeesComponent },
{path: 'create', component: CreateEmployeeComponent},
{path: '',redirectTo:'/list', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
