import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `

<div class="login-container">
  <i class="bi bi-person-circle fs-1 icon"></i> 
  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <h2>Login</h2>
    <label>Email</label>
    <input formControlName="email" type="email" />
    <label>Password</label>
    <div class="input-icon-wrapper">
        <input [type]="showPassword ? 'text' : 'password'" formControlName="password" />
        <i class="bi" [ngClass]="showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'" (click)="toggleShowPassword()"></i>
      </div>
    <button type="submit" [disabled]="loginForm.invalid">Login</button>
    <p *ngIf="errorMessage">{{ errorMessage }}</p>
    <div class="button-group">
      <button type="button" (click)="goToRegister()">Register</button>
      <button type="button" (click)="goToRecoverPassword()">Forgot Password?</button>
    </div>
  </form>
</div>
  `,
   styles: [`
    .login-container {
      background-color: #f9f9f9;
      width: 350px;
      margin: 0 auto;
      padding: 2em;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
    .icon {
      display: block;
      margin: 0 auto 20px;
      text-align: center;
    }

    .input-icon-wrapper input {
      padding-right: 2em; /* Espacio para el icono */
    }

    .input-icon-wrapper .bi {
      position: relative;
      right: 1.5em;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }

    form {
      display: flex;
      flex-direction: column;
    }
    label {
      margin-bottom: 5px;
    }
    input {
      margin-bottom: 15px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .password-container {
      position: relative;
    }
    .password-container input {
      width: 100%;
      padding-right: 50px; /* Espacio para el botón */
      .input-icon-wrapper {
      position: relative;
    }
    .input-icon-wrapper input {
      padding-right: 2em; /* Espacio para el icono */
    }
    .input-icon-wrapper .bi {
      position: absolute;
      right: 0.5em;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    }
    .toggle-password {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      padding: 5px 10px;
      font-size: 0.875em;
      margin-top: -7px;
    }
    .toggle-password:hover {
      background-color: #0056b3;
    }
    button {
      padding: 10px;
      margin-top: 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875em; /* Tamaño de fuente más pequeño */
    }
    button:hover {
      background-color: #0056b3;
    }
    .button-group {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .button-group button {
      width: 48%;
      padding: 0.3em;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875em; /* Tamaño de fuente más pequeño */
    }
    .button-group button:hover {
      background-color: #0056b3;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/exam-list']),
        error: (err) => this.errorMessage = 'Invalid login credentials',
      });
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToRecoverPassword() {
    this.router.navigate(['/recover-password']);
  }
}
