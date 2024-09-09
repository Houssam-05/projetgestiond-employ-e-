import { Component, OnInit } from '@angular/core';
import { AddEditEmpComponent } from './add-edit-emp/add-edit-emp.component';
import { NgModel } from '@angular/forms';
import { ShowDepComponent } from '../department/show-dep/show-dep.component';
import { ShowEmpComponent } from './show-emp/show-emp.component';

@Component({
  standalone:true,
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  imports:[ShowEmpComponent],

})
export class EmployeeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
