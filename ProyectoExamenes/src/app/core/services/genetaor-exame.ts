import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  standalone:true,
  selector: 'app-excel-uploader',
  template: `
    <div class="file-uploader">
      <h2>Subir archivo Excel</h2>
      <input type="file" (change)="onFileChange($event)" accept=".xls,.xlsx" />
      <div *ngIf="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <table *ngIf="excelData.length > 0">
        <tr *ngFor="let row of excelData">
          <td *ngFor="let cell of row">{{ cell }}</td>
        </tr>
      </table>
    </div>
  `,
  styles: [`
    .file-uploader {
      margin: 20px;
    }
    .error-message {
      color: red;
      margin-top: 10px;
    }
  `]
})
export class ExcelUploaderComponent {
  excelData: any[] = [];
  errorMessage: string = '';

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    
    if (target.files.length !== 1) {
      this.errorMessage = 'Por favor, selecciona un solo archivo.';
      return;
    }

    const file = target.files[0];
    const reader: FileReader = new FileReader();
    
    reader.onload = (e: any) => {
      const binaryStr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary' });

      // Supongamos que el archivo debe tener una hoja llamada 'Hoja1'
      const sheetName = 'Hoja1';
      
      if (!workbook.Sheets[sheetName]) {
        this.errorMessage = `El archivo no tiene la hoja requerida: ${sheetName}`;
        return;
      }

      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Valida que el archivo tiene el formato esperado
      if (!this.isValidFormat(jsonData)) {
        this.errorMessage = 'El archivo Excel no tiene el formato correcto.';
        return;
      }

      this.errorMessage = '';
      this.excelData = jsonData;
      console.log('Datos cargados correctamente:', this.excelData);
    };

    reader.onerror = () => {
      this.errorMessage = 'Error al leer el archivo.';
    };

    reader.readAsBinaryString(file);
  }

  isValidFormat(data: any[]): boolean {
    // Verificación básica: que al menos tenga 3 columnas y más de 1 fila
    const expectedColumns = 3;
    if (data.length < 2 || data[0].length < expectedColumns) {
      return false;
    }

    // Validación específica del encabezado o estructura del archivo (ejemplo)
    const expectedHeaders = ['Nombre', 'Apellido', 'Edad'];
    return data[0].every((header: string, index: number) => header === expectedHeaders[index]);
  }
}
