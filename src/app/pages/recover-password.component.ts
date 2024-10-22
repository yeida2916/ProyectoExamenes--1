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
      max-width: 400px;
      margin: 0 auto;
      padding: 1em;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    input {
      margin-bottom: 1em;
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
