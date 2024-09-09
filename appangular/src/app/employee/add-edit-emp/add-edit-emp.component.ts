import { Component, OnInit,Input } from '@angular/core';
import { SharedService } from '../../shared.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  standalone:true,
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css'],
  imports:[CommonModule,FormsModule]
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() emp:any;
  EmployeesId:string | undefined;
  EmployeesName:string | undefined;
  Department:string | undefined;
  DateOfJoining:string | undefined;
  PhotoFileName:string | undefined;
  PhotoFilePath:string | undefined;

  DepartmentsList:any=[];

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList(){
    this.service.getAllDepartementsNames().subscribe((data:any)=>{
      this.DepartmentsList=data;

      this.EmployeesId=this.emp.EmployeesId;
      this.EmployeesName=this.emp.EmployeesName;
      this.Department=this.emp.Department;
      this.DateOfJoining=this.emp.DateOfJoining;
      this.PhotoFileName=this.emp.PhotoFileName;
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    });
  }

  addEmployee(){
    var val = {EmployeesId:this.EmployeesId,
                EmployeesName:this.EmployeesName,
                Department:this.Department,
                DateOfJoining:this.DateOfJoining,
                PhotoFileName:this.PhotoFileName};

    this.service.addEmploye(val).subscribe((res: { toString: () => any; })=>{
      alert(res.toString());
    });
  }

  updateEmployee(){
    var val = {EmployeeId:this.EmployeesId,
      EmployeesName:this.EmployeesName,
      Department:this.Department,
    DateOfJoining:this.DateOfJoining,
  PhotoFileName:this.PhotoFileName};

    this.service.updateEmploye(val).subscribe((res: { toString: () => any; })=>{
    alert(res.toString());
    });
  }


  uploadPhoto(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];  // Correction du type
    if (file) {
      const formData: FormData = new FormData();
      formData.append('file', file);

      this.service.UploadPhoto(formData).subscribe((data: any) => {
        this.PhotoFilePath = this.service.PhotoUrl + data.toString();
      });
    }
  }

}
