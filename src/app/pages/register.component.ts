import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="register-container">
      <i class="bi bi-person-circle fs-1 icon"></i>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <h2>Register</h2>
        <label>Email</label>
        <input formControlName="email" type="email" />
        <label>Password</label>
        <div class="input-icon-wrapper">
        <input [type]="showPassword ? 'text' : 'password'" formControlName="password" />
        <i class="bi" [ngClass]="showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'" (click)="toggleShowPassword()"></i>
      </div>
        <label>Confirm Password</label>
        <div class="input-icon-wrapper">
        <input [type]="showPassword ? 'text' : 'password'" formControlName="password" />
        <i class="bi" [ngClass]="showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'" (click)="toggleShowPassword()"></i>
      </div>
        <button type="submit" [disabled]="registerForm.invalid">Register</button>
        <p *ngIf="errorMessage">{{ errorMessage }}</p>
      </form>
   </div>
  `,
  styles: [`
    .register-container {
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
      background-color: #fff
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
      font-size: 2em;
      margin-bottom: 1em;  
    }
    label {
      font-size: 1em;
      margin-bottom: 0.5em;
    }
    input {
      width: 100%;
      padding: 10px;
      margin-bottom: 1em;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .input-icon-wrapper {
      position: relative;
      width: 100%; /* Asegura que el contenedor use todo el ancho */
    }
    .input-icon-wrapper input {
      width: 100%; /* Asegura que el input use todo el ancho */
      padding-right: 2em; /* Espacio para el icono */
    } .input-icon-wrapper i {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-70%);
      cursor: pointer;
      font-size: 1.2em;
      color: black;
    }
    .password-field {
      position: relative;
      width: 100%;
    }
    .password-field i {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-70%);
      cursor: pointer;
      font-size: 1.2em;
      color: black;
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
    button:disabled {
      background-color: #A9A9A9;
      cursor: not-allowed;
    }
    p {
      margin-top: 1em;
      font-size: 1em;
      color: red;
    }

  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => this.errorMessage = 'Registration failed',
      });
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}

      