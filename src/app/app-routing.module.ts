import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {
    path: "employees",
    component: EmployeeComponent
  },
  // {
  //   path: "settings",
  //   component: EmployeeComponent
  // },
  { path: '', pathMatch: 'full', redirectTo: 'employees' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
