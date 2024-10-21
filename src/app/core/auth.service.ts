import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';  // Import para manejo de errores

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/auth'; // URL de tu API de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  get isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Verificar si hay token al iniciar la app
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError(err => {
        console.error('Error en el login:', err);
        return of({ error: 'Error al iniciar sesión, por favor verifica tus credenciales.' }); // Devolver un objeto de error
      })
    );
  }
  

  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user).pipe(
      catchError(err => {
        console.error('Error en el registro:', err);
        return of({ error: 'Error al registrar el usuario. Inténtalo de nuevo.' }); // Devolver un objeto de error
      })
    );
  }
  

  recoverPassword(email: string): Observable<any> {
    return this.http.post(`${this.authUrl}/recover-password`, { email }).pipe(
      catchError(err => {
        console.error('Error en recuperación de contraseña:', err);
        return of(null); // Devuelve null en caso de error para manejarlo
      })
    );
  }

  logout() {
    // Eliminar el token y marcar como no autenticado
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Método para obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
