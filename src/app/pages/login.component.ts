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
        <input [type]="showPassword ? 'text' : 'password'" formControlName="password" />
        <div>
          <input type="checkbox" (change)="toggleShowPassword()"> Show Password
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
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h2 {
      font-size: 2em;
      margin-bottom: 1em;  
    }
    input {
      width: 100%;
      padding: 10px;
      margin-bottom: 1em;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .show-password {
      margin-bottom: 1em;
    }
    button {
      width: 100%;
      padding: 10px;
      margin-bottom: 1em;
      margin-top: 1em;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
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
