import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ExcelToPdfService } from './excel-to-pdf.service';


@Component({
  selector: 'app-test-generator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent,],
  templateUrl: './test-generator.component.html',
  styleUrls: ['./test-generator.component.css']
})
export class TestGeneratorComponent implements OnInit {
  examForm!: FormGroup;
  navbarVisible: boolean = true;
  subjects: string[] = ['Matemáticas', 'Historia', 'Ciencias', 'Literatura', 'Geografía'];
  maxQuestionsOptions: number[] = [];
  difficultQuestionsOptions: number[] = [];
  trueFalseQuestionsOptions: number[] = [];
  selectedFile!: File;

  constructor(private fb: FormBuilder, private excelToPdfService: ExcelToPdfService) {} // Inyecta el servicio

  ngOnInit() {
    // Configuración inicial del formulario
    this.maxQuestionsOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);
    this.examForm = this.fb.group({
      totalQuestions: [10, [Validators.required, Validators.min(5)]],
      difficultQuestions: [0, [Validators.required, Validators.min(0)]],
      trueFalseQuestions: [0, [Validators.required, Validators.min(0)]],
      subject: ['', Validators.required]
    });

    this.updateQuestionLimits();
    this.examForm.get('totalQuestions')?.valueChanges.subscribe(() => this.updateQuestionLimits());
    this.examForm.get('difficultQuestions')?.valueChanges.subscribe(() => this.updateQuestionLimits());
    this.examForm.get('trueFalseQuestions')?.valueChanges.subscribe(() => this.updateQuestionLimits());
  }

  updateQuestionLimits() {
    const totalQuestions = this.examForm.get('totalQuestions')?.value || 0;
    const difficultQuestions = this.examForm.get('difficultQuestions')?.value || 0;
    const trueFalseQuestions = this.examForm.get('trueFalseQuestions')?.value || 0;

    const maxDifficultQuestions = totalQuestions - trueFalseQuestions;
    const maxTrueFalseQuestions = totalQuestions - difficultQuestions;

    this.difficultQuestionsOptions = Array.from({ length: maxDifficultQuestions + 1 }, (_, i) => i);
    this.trueFalseQuestionsOptions = Array.from({ length: maxTrueFalseQuestions + 1 }, (_, i) => i);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  generatePdf(): void {
    const selectedQuestions = ['Pregunta 1', 'Pregunta 2']; // Ajusta según tus necesidades
    if (this.selectedFile) {
      this.excelToPdfService.convertExcelToPdf(this.selectedFile, selectedQuestions);
    }
  }

  submitSettings() {
    if (this.examForm.valid) {
      const settings = this.examForm.value;
      console.log('Configuración del examen:', settings);
      // Aquí puedes manejar los datos para generar el examen.
    }
  }
}
