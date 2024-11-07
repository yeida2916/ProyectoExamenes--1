import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelToPdfService {

  constructor() { }

  convertExcelToPdf(excelFile: File, questions: string[]): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(firstSheet);

      const filteredData = excelData.filter((row: any) =>
        questions.includes(row['Pregunta']) // Ajusta esto según la columna de preguntas en el Excel
      );

      this.generatePdf(filteredData);
    };

    reader.readAsArrayBuffer(excelFile);
  }

  private generatePdf(data: any[]): void {
    const pdf = new jsPDF();
    pdf.text("Preguntas Seleccionadas", 10, 10);

    data.forEach((row, index) => {
      pdf.text(`${index + 1}. ${row['Pregunta']}`, 10, 20 + index * 10);
    });

    pdf.save("PreguntasSeleccionadas.pdf");
  }
}
