import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedService } from './shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',  // Le sélecteur utilisé pour intégrer ce composant dans le DOM
  templateUrl: './app.component.html',  // Le fichier HTML lié à ce composant
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports: [LoginComponent,RouterOutlet,CommonModule]
})
export class AppComponent {
  title = 'Mon Application Angular';

  constructor(public sharedService: SharedService){}

  // Tu peux ajouter des méthodes ici pour gérer la logique de l'application
}
