import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../shared.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule,RouterLink]
})
export class RegisterComponent {
  registerData = {
    username: '',
    password: '',
    role: 'user'  // Définir un rôle par défaut
  };

  constructor(private sharedService: SharedService, private router: Router) { }

  onSubmit() {
    this.sharedService.register(this.registerData).subscribe(
      (response: any) => {
        // Stocker le rôle de l'utilisateur après inscription
        localStorage.setItem('user_role', this.registerData.role);
        console.log('Inscription réussie !');
        this.router.navigate(['login']);
      },
      (error: any) => {
        console.error('Erreur lors de l\'inscription :', error);
      }
    );
  }
}
