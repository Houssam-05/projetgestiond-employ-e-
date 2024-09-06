import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { CommonModule, NgFor, NgIf } from '@angular/common'; // NgFor is part of CommonModule
import { DepartmentComponent } from '../department.component';
import { AddEditDepComponent } from '../add-edit-dep/add-edit-dep.component';

@Component({
  selector: 'app-show-dep',
  standalone: true,
  imports: [NgIf,CommonModule,AddEditDepComponent], // Importing CommonModule instead of just NgFor
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css'] // Corrected typo from 'styleUrl' to 'styleUrls'
})
export class ShowDepComponent implements OnInit {
  constructor(private service: SharedService) {}

  DepartmentList: any[] = [];
  ModalTitle: any;
  ActivateAddEditDepComp: boolean = false;
  dep: any;

  DepartmentIdFilter: string = "";
  DepartmentNameFilter: string = "";
  DepartmentListWithoutFilter: any[] = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick(): void {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: ""
    };
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepComp = true;
  }

  editClick(item: any): void {
    this.dep = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepComp = true;
  }

  deleteClick(item: any): void {
    if (confirm('Are you sure??')) {
      this.service.deleteDepartement(item.DepartmentId).subscribe(data => {
        alert(data.toString());
        this.refreshDepList();
      });
    }
  }

  refreshDepList(): void {
    this.service.getDepList().subscribe(data => {
      this.DepartmentList = data;
    });
  }

  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.refreshDepList();
  }
}

