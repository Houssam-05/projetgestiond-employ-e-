import { Component,Input,OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { CommonModule, NgFor } from '@angular/common';

import { AddEditDepComponent } from '../add-edit-dep/add-edit-dep.component';
import { DepartmentComponent } from '../department.component';



@Component({
  selector: 'app-show-dep',
  standalone: true,
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css'],
  imports: [NgFor,DepartmentComponent,AddEditDepComponent,CommonModule],

})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }
  DepartmentList:any=[];
  dep:any;

  ModalTitle:string | undefined;
  ActivateAddEditDepComp:boolean=false;


  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshDepList();


  }
  addClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department";
    this.ActivateAddEditDepComp=true;

  }

  editClick(item: any){
    this.dep=item;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditDepComp=true;
  }
  deleteClick(item: { DepartmentId: any }) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.service.deleteDepartement(item.DepartmentId).subscribe(
        (response) => {
          // Optionally log the response or perform other actions
          alert('Department deleted successfully!');
          this.refreshDepList();  // Refresh the list to reflect changes
        },
        (error) => {
          console.error('Error deleting department', error);
          alert('Failed to delete department. Please try again.');
        }
      );
    }
  }
  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.refreshDepList();
  }
  refreshDepList(){
    this.service.getDepList().subscribe(data =>{
      this.DepartmentList=data;
    })
  }

}
