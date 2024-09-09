import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { EmployeeComponent } from '../employee.component';
import { AddEditEmpComponent } from '../add-edit-emp/add-edit-emp.component';
import { CommonModule } from '@angular/common';


@Component({
  standalone:true,
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css'],
  imports: [EmployeeComponent,AddEditEmpComponent,CommonModule],
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  EmployeeList:any=[];

  ModalTitle:string | undefined;
  ActivateAddEditEmpComp:boolean=false;
  emp:any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.emp={
      EmployeesId:0,
      EmployeesName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;

  }

  editClick(item: any){
    console.log(item);
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }

  deleteClick(item: { EmployeesId: any; }){
    if(confirm('Are you sure??')){
      this.service.deleteEmploye(item.EmployeesId).subscribe((data: { toString: () => any; })=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
  }


  refreshEmpList(){
    this.service.getEmployelist().subscribe((data: any)=>{
      this.EmployeeList=data;
    });
  }

}
