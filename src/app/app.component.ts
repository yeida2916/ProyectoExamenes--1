import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ExamListComponent } from './pages/exam-list.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, ExamListComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'ProyectoExamenes';
}
