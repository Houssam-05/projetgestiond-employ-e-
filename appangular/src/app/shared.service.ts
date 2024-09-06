import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl= "http://127.0.0.1:8000/";
  readonly PhotoUrl=" http://127.0.0.1:8000/media/";
  constructor(private http:HttpClient) { }
  getDepList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/department/');
  }
  addDepartement(val:any){
    return this.http.post(this.APIUrl+'/department/',val);
  }
  updateDepartement(val:any){
    return this.http.put(this.APIUrl+'/department/',val);
  }

  deleteDepartement(val:any){
    return this.http.delete(this.APIUrl+'/department/'+val);
  }

  getEmployelist():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/employee/');
  }
  addEmploye(val:any){
    return this.http.post(this.APIUrl+'/employee/',val);
  }
  updateEmploye(val:any){
    return this.http.put(this.APIUrl+'/employee/',val);
  }

  deleteEmploye(val:any){
    return this.http.delete(this.APIUrl+'/employee/'+val);
  }
  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/SaveFile',val);
  }
  getAllDepartementsNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/departement/');

  }





}
