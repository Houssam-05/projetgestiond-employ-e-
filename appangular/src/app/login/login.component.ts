import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';  // Assure-toi d'importer correctement ton service
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,  // <-- Indiquer que le composant est standalone
  imports: [FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private sharedService: SharedService, private router: Router) { }

  onLogin() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.sharedService.login(credentials).subscribe(
      (response: any) => {
        // Sauvegarder le token JWT dans localStorage
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        console.log('Connexion réussie !');

        // Rediriger vers une autre page après la connexion
        this.router.navigate(['login']);  // Remplace 'dashboard' par la route de ton choix
      },
      (      error: any) => {
        console.error('Erreur de connexion :', error);
      }
    );
  }
}
