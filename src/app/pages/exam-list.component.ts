import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamService } from '../core/exam.service';

@Component({
  selector: 'app-exam-list',
  standalone: true, 
  imports: [CommonModule],
  template: `
  <div class="drag-and-drop" 
       (dragover)="onDragOver($event)" 
       (drop)="onFileDrop($event)">
    Arrastra y suelta un archivo Excel o PDF aquí o selecciona un archivo.
  </div>
  <input type="file" (change)="onFileSelect($event)" accept=".xlsx,.xls,.pdf" />
  <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
  <table *ngIf="excelData.length > 0">
    <tr *ngFor="let row of excelData">
      <td *ngFor="let cell of row">{{ cell }}</td>
    </tr>
  </table>
  `,
  styles: [`
    .drag-and-drop {
      border: 2px dashed #ccc;
      padding: 20px;
      text-align: center;
      margin: 10px 0;
    }
    .error {
      color: red;
      font-weight: bold;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    table, th, td {
      border: 1px solid black;
    }
  `],
  providers: [ExamService]  // Declarar el servicio en el componente
})
export class ExamListComponent {
  errorMessage: string = '';
  excelData: any[] = [];

  constructor(private examService: ExamService) {}

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileType = file.type;

      if (fileType === 'application/pdf') {
        // Lógica para manejar archivos PDF
        this.handlePdfFile(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === 'application/vnd.ms-excel') {
        // Lógica para manejar archivos Excel
        this.handleExcelFile(file);
      } else {
        this.errorMessage = 'Tipo de archivo no soportado';
      }
    }
  }

  handlePdfFile(file: File): void {
    // Implementar la lógica para manejar archivos PDF
    console.log('Archivo PDF seleccionado:', file);
  }

  handleExcelFile(file: File): void {
    // Implementar la lógica para manejar archivos Excel
    console.log('Archivo Excel seleccionado:', file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type;

      if (fileType === 'application/pdf') {
        // Lógica para manejar archivos PDF
        this.handlePdfFile(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === 'application/vnd.ms-excel') {
        // Lógica para manejar archivos Excel
        this.handleExcelFile(file);
      } else {
        this.errorMessage = 'Tipo de archivo no soportado';
      }
    }
  }
}
