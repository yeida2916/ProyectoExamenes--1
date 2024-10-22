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
        <input formControlName="password" type="password" />
        <button type="submit" [disabled]="loginForm.invalid">Login</button>
        <p *ngIf="errorMessage">{{ errorMessage }}</p>
        <a (click)="goToRegister()">Register</a> | 
        <a (click)="goToRecoverPassword()">Forgot Password?</a>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 2em;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      text-align: center;
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
      font-size: 1em;
    }
    button {
      padding: 10px 20px;
      font-size: 1.1em;
      cursor: pointer;
    }
    a {
      color: blue;
      cursor: pointer;
      text-decoration: none;
      margin-top: 0.5em;
    }

    a:hover {
      text-decoration: underline;
    }

    .icon {
      font-size: 4em; /* Tamaño grande del ícono */
      margin-bottom: 0.5em;
      color: #333;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

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

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToRecoverPassword() {
    this.router.navigate(['/recover-password']);
  }
}
