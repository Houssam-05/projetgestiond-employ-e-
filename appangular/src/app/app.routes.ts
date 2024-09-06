import { Routes,RouterModule } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { AppComponent } from './app.component';




export const routes: Routes = [
  {path:'employee',component:EmployeeComponent},
  {path:'departement',component:DepartmentComponent},


];


