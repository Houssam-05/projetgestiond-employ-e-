import { Component } from '@angular/core';
import { ShowDepComponent } from './show-dep/show-dep.component';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [ShowDepComponent],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  DepartmentId: string | undefined;
  DepartmentName: string | undefined;

}
