import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://127.0.0.1:8000/";
  readonly PhotoUrl = "http://127.0.0.1:8000/media/";

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue :', error);
    return throwError(error);
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
  retrieveUserRole(): string {
    const role = localStorage.getItem('user_role') || 'user';  // Valeur par défaut si le rôle n'est pas trouvé
    console.log('Le rôle de l\'utilisateur est :', role);
    return role;
  }

  // Méthode pour vérifier si l'utilisateur est un administrateur
  isAdmin(): boolean {
    const role = this.retrieveUserRole();  // Récupérer le rôle en utilisant retrieveUserRole
    return role === 'admin';
  }

  // Ajouter des headers d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Méthode pour le login
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(this.APIUrl + 'api/token/', credentials)
      .pipe(catchError(this.handleError));
  }

  // Méthode pour l'inscription
  register(data: { username: string, password: string, role: string }): Observable<any> {
    return this.http.post(this.APIUrl + 'register/', data)
      .pipe(catchError(this.handleError));
  }

  // CRUD Department
  addDepartement(val: any): Observable<any> {
    if (this.isAdmin()) {
      return this.http.post(this.APIUrl + 'department/', val, { headers: this.getAuthHeaders() })
        .pipe(catchError(this.handleError));
    } else {
      return throwError('Accès interdit : l\'utilisateur n\'est pas administrateur.');
    }
  }

  updateDepartement(val: any): Observable<any> {
    if (this.isAdmin()) {
      return this.http.put(this.APIUrl + 'department/', val, { headers: this.getAuthHeaders() })
        .pipe(catchError(this.handleError));
    } else {
      return throwError('Accès interdit : l\'utilisateur n\'est pas administrateur.');
    }
  }

  deleteDepartement(val: any): Observable<any> {
    const url = `${this.APIUrl}department/${val}/`; // Corrigez l'URL pour utiliser "department"
    if (this.isAdmin()) {
      return this.http.delete(url, { headers: this.getAuthHeaders() })
        .pipe(catchError(this.handleError));
    } else {
      return throwError(() => new Error('Unauthorized access - Only admins can delete departments.'));
    }
  }

  getDepList(): Observable<any[]> {
    // Tout utilisateur connecté peut consulter la liste des départements
    return this.http.get<any[]>(this.APIUrl + 'department/', { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // CRUD Employee
  getEmployelist(): Observable<any[]> {
    // Tout utilisateur connecté peut consulter la liste des employés
    return this.http.get<any[]>(this.APIUrl + 'employee/', { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  addEmploye(val: any): Observable<any> {
    if (this.isAdmin()) {
      return this.http.post(this.APIUrl + 'employee/', val, { headers: this.getAuthHeaders() })
        .pipe(catchError(this.handleError));
    } else {
      return throwError('Accès interdit : l\'utilisateur n\'est pas administrateur.');
    }
  }

  updateEmploye(val: any): Observable<any> {
    if (this.isAdmin()) {
      return this.http.put(this.APIUrl + 'employee/', val, { headers: this.getAuthHeaders() })
        .pipe(catchError(this.handleError));
    } else {
      return throwError('Accès interdit : l\'utilisateur n\'est pas administrateur.');
    }
  }

  deleteEmploye(val: any): Observable<any> {
    if (this.isAdmin()) {
      return this.http.delete(this.APIUrl + 'employee/' + val, { headers: this.getAuthHeaders() })
        .pipe(catchError(this.handleError));
    } else {
      return throwError('Accès interdit : l\'utilisateur n\'est pas administrateur.');
    }
  }

  // Méthode pour uploader une photo
  UploadPhoto(val: any): Observable<any> {
    return this.http.post(this.APIUrl + 'saveFile/', val, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Méthode pour obtenir la liste des noms des départements (accessibilité selon le rôle)
  getAllDepartementsNames(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'department/', { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
}
