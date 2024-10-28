import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../core/exam.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-exam-list',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css'],
  providers: [ExamService]
})
export class ExamListComponent {
  errorMessage: string = '';
  excelData: any[] = [];
  isUserMenuOpen: boolean = false;
  
  constructor(private examService: ExamService, private authService: AuthService) {}

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    this.authService.logout(); // Usar el método logout del AuthService
    this.isUserMenuOpen = false;
  }

   // Detectar clics fuera del menú para cerrarlo
   @HostListener('document:click', ['$event'])
   onClickOutside(event: Event): void {
     const target = event.target as HTMLElement;
     if (!target.closest('.user-menu')) {
       this.isUserMenuOpen = false;
     }
   }
  
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.handleFile(file);
    }
  }

  handleFile(file: File): void {
    const fileType = file.type;
    if (fileType === 'application/pdf') {
      this.handlePdfFile(file);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === 'application/vnd.ms-excel') {
      this.handleExcelFile(file);
    } else {
      this.errorMessage = 'Tipo de archivo no soportado';
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
}