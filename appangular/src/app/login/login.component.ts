import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../shared.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterLink]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string = '';

  constructor(private sharedService: SharedService, private router: Router) { }

  onLogin() {
    const credentials = {
      username: this.username,
      password: this.password,
    };

    this.sharedService.login(credentials).subscribe(
      (response: any) => {
        // Sauvegarder le token JWT dans localStorage
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);

        this.router.navigate(['/employee']);


        // Récupérer et afficher le rôle
        this.retrieveUserRole();


      },
      (error: any) => {
        console.error('Erreur lors de la connexion :', error);
      }
    );
  }

  // Méthode pour récupérer le rôle depuis localStorage
  retrieveUserRole() {
    this.role = localStorage.getItem('user_role') || 'user';  // Valeur par défaut si le rôle n'est pas trouvé
    console.log('Le rôle de l\'utilisateur est :', this.role);
  }
}
