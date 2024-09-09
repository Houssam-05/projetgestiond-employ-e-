import { Routes,RouterModule } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';




export const routes: Routes = [

  {path:'login',component:LoginComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'departement',component:DepartmentComponent},
  {path: '', redirectTo:'login',pathMatch:'full' },

];


