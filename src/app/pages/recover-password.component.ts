import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="recover-password-container">
      <i class="bi bi-person-circle fs-1 icon"></i>
      <form [formGroup]="recoverPasswordForm" (ngSubmit)="onSubmit()">
        <h2>Recover Password</h2>
        <label>Email</label>
        <input formControlName="email" type="email" />
        <button type="submit" [disabled]="recoverPasswordForm.invalid">Recover Password</button>
        <p *ngIf="errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
  `,
  styles: [`
    .recover-password-container {
      width: 350px;
      margin: 0 auto;
      padding: 2em;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      text-align: center;
      background-color: #fff;
    }
    .icon {
      margin-bottom: 1em;
    } 
    form {
      display: flex;
      flex-direction: column;
      align-items: center; 
    }
    h2 {
      font-size: 2em; /* Hacer el título más grande */
      margin-bottom: 1em; /* Espacio debajo del título */
    }
    label {
      font-size: 1.2em; /* Hacer el texto del label más grande */
      margin-bottom: 0.5em; /* Espacio debajo del label */
    }
    input {
      padding: 0.8em;
      font-size: 1.2em; /* Tamaño del input más grande */
      width: 100%;
      margin-bottom: 1.5em; /* Espacio debajo del input */
    }
    button {
      padding: 0.8em;
      font-size: 1.2em; /* Hacer el botón más grande */
      cursor: pointer;
      width: 100%;
      background-color: #007BFF; /* Botón azul */
      color: white; /* Texto blanco */
      border: none;
      border-radius: 5px; /* Borde redondeado */
      margin-bottom: 1em; /* Separación entre el botón y otros elementos */
    }
    button:disabled {
      background-color: #A9A9A9; /* Color gris para el botón deshabilitado */
      cursor: not-allowed;
    }
    p {
      margin-top: 1em;
      font-size: 1.1em; /* Tamaño del mensaje de error más grande */
      color: red;
    }
  `]
})
export class RecoverPasswordComponent {
  recoverPasswordForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.recoverPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.recoverPasswordForm.valid) {
      this.authService.recoverPassword(this.recoverPasswordForm.value.email).subscribe({
        next: () => alert('Password recovery email sent!'),
        error: (err) => this.errorMessage = 'Failed to send recovery email',
      });
    }
  }
}
