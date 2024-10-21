import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ExamListComponent } from './pages/exam-list.component'; 
import { MyComponent } from './components/my-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, ExamListComponent, MyComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
  <router-outlet></router-outlet>
  <app-my-component></app-my-component>
  `,
})
export class AppComponent {
  title = 'ProyectoExamenes';
}
