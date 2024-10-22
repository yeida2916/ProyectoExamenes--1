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
      max-width: 400px;
      margin: 0 auto;
      padding: 1em;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    .button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 1em;
    }
    .button-group button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.5em 1em;
      cursor: pointer;
      border-radius: 4px;
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
