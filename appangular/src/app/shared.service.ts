import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  getEmpList() {
    throw new Error('Method not implemented.');
  }
  readonly APIUrl = "http://127.0.0.1:8000/";
  readonly PhotoUrl = "http://127.0.0.1:8000/media/";

  constructor(private http: HttpClient) { }

  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(this.APIUrl + '/api/token/', credentials)
      .pipe(catchError(this.handleError));
  }

  // Ajoute le token JWT dans les en-têtes
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');  // Récupère le token JWT depuis localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Ajoute le token dans le header Authorization
    });
  }

  // Méthodes API
  getDepList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'department/', { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  addDepartement(val: any): Observable<any> {
    return this.http.post(this.APIUrl + 'department/', val, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateDepartement(val: any): Observable<any> {
    return this.http.put(this.APIUrl + 'department/', val, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteDepartement(val: any): Observable<any> {
    return this.http.delete(this.APIUrl + 'department/' + val, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getEmployelist(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'employee/', { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  addEmploye(val: any): Observable<any> {
    return this.http.post(this.APIUrl + 'employee/', val, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateEmploye(val: any): Observable<any> {
    return this.http.put(this.APIUrl + 'employee/', val, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteEmploye(val: any): Observable<any> {
    return this.http.delete(this.APIUrl + 'employee/' + val, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  UploadPhoto(val: any): Observable<any> {
    return this.http.post(this.APIUrl + 'saveFile/', val, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getAllDepartementsNames(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'department/', { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }


}

