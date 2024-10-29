import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-generator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './test-generator.component.html',
  styleUrls: ['./test-generator.component.css']
})
export class TestGeneratorComponent {
  examForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.examForm = this.fb.group({
      totalQuestions: [10, [Validators.required, Validators.min(1)]],
      difficultQuestions: [0, [Validators.required, Validators.min(0)]],
      trueFalseQuestions: [0, [Validators.required, Validators.min(0)]]
    });
  }

  submitSettings() {
    if (this.examForm.valid) {
      const settings = this.examForm.value;
      console.log('Configuración del examen:', settings);
      // Aquí puedes manejar los datos para generar el examen.
    }
  }
}
