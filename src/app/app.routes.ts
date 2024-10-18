import { Routes } from '@angular/router';
import { ExamListComponent } from './pages/exam-list.component';
import { LoginComponent } from './pages/login.component';

export const routes: Routes = [
  { path: '', component: ExamListComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Ruta de comodín para redirigir a la página principal
];