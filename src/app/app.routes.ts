import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard'; // si lo implementas
import { ExamListComponent } from './pages/exam-list/exam-list.component';
import { ExcelReaderComponent } from './pages/excel-reader/excel-reader.component';
import { LoginComponent } from './pages/login/login.component';
import { DescargaPdfComponent } from './pages/pantalla-descarga-pdf/descarga-pdf.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component'; // si lo implementas
import { RegisterComponent } from './pages/register/register.component'; // supondremos que tienes este componente
import { TestGeneratorComponent } from './pages/test-generator/test-generator.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'exam-list', component: ExamListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/exam-list', pathMatch: 'full' },
  { path: 'test-generator', component: TestGeneratorComponent},
  { path: 'excel-reader', component: ExcelReaderComponent },
  { path: 'pantalla-descarga-pdf', component: DescargaPdfComponent }, // si lo implementas
];
