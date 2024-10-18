import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule], // Importa RouterModule aquí
  templateUrl: '../app.component.html',  // Plantilla HTML del componente  Login   
  styleUrls: ['../app.component.css'],  // Estilos CSS del componente Login
})
export class LoginComponent {
  // Aquí va la lógica del componente Login
}
