import { Component } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { UploadFileComponent } from "./components/upload-file/upload-file.component";
import { ExcelUploaderComponent } from './core/services/genetaor-exame';
import { ExamGeneratorComponent } from "./exam-generator/exam-generator.component";
export const routes: Routes = [];
@Component({

  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UploadFileComponent,ExamGeneratorComponent,ExcelUploaderComponent],
  templateUrl: './app.component.html',

  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProyectoExamenes';
}
