import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-descarga-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './descarga-pdf.component.html',
  styleUrls: ['./descarga-pdf.component.css']
})
export class DescargaPdfComponent {
  // Ruta o URL del archivo PDF ya descargado
  pdfUrl: string = 'assets/tu-archivo.pdf'; // Ajusta la ruta según el archivo

  // Método para descargar el archivo PDF
  descargarPdf() {
    const link = document.createElement('a');
    link.href = this.pdfUrl;
    link.download = 'nombre-del-archivo.pdf'; // Cambia el nombre según el archivo
    link.click();
  }

  // Método para abrir el PDF en una nueva pestaña
  verPdf() {
    window.open(this.pdfUrl, '_blank');
  }
}
