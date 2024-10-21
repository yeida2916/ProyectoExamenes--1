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
    Arrastra y suelta un archivo Excel aquí o selecciona un archivo.
  </div>
  <input type="file" (change)="onFileSelect($event)" accept=".xlsx,.xls" />
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
  excelData: any[] = [];
  errorMessage: string | null = null;

  constructor(private examService: ExamService) {}

  async onFileSelect(event: any): Promise<void> {
    this.errorMessage = null; // Reiniciar el mensaje de error
    const file: File = event.target.files[0];
    if (file) {
      try {
        this.excelData = await this.examService.readExcel(file);
      } catch (error: unknown) {
        this.errorMessage = this.getErrorMessage(error); // Capturar y mostrar el error
      }
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Evitar el comportamiento predeterminado del navegador
  }

  async onFileDrop(event: DragEvent): Promise<void> {
    event.preventDefault();
    this.errorMessage = null; // Reiniciar el mensaje de error
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      try {
        this.excelData = await this.examService.readExcel(file);
      } catch (error: unknown) {
        this.errorMessage = this.getErrorMessage(error); // Capturar y mostrar el error
      }
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Error desconocido. No se pudo procesar el archivo.';
  }
}
