import { CommonModule } from '@angular/common'; // Necesario para *ngFor, *ngIf
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-exam-generator',
  standalone: true, // Declarar el componente como standalone
  templateUrl: './exam-generator.component.html',
  styleUrls: ['./exam-generator.component.css'],
  imports: [CommonModule] // Importar CommonModule para usar directivas estructurales como *ngFor y *ngIf
})
export class ExamGeneratorComponent {
  file: File | null = null;
  questions: { text: string, options: string[] }[] = [];

  // Manejar el cambio de archivo
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.file = input.files[0];
    }
  }

  // Generar preguntas a partir del archivo de Excel
  generateExam() {
    if (this.file) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convertir hoja de cálculo a JSON
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Generar preguntas a partir de los datos del Excel
        this.questions = this.generateQuestions(data);
      };

      reader.readAsBinaryString(this.file);
    }
  }

  // Procesar datos y generar las preguntas con opciones
  generateQuestions(data: any[]): { text: string, options: string[] }[] {
    const questions: { text: string, options: string[] }[] = [];

    data.forEach((row, index) => {
      if (index > 0 && row[0]) { // Omitir la fila de encabezados
        const question = {
          text: row[0],          // Primera columna: la pregunta
          options: row.slice(1)  // Resto de columnas: las opciones
        };
        questions.push(question);
      }
    });

    return questions;
  }
}
