import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [
    HttpClientModule
  ],
  providers: [
    { provide: HttpClient, useClass: HttpClient } // Proveedor válido para HttpClient
  ],
  template: `
    <button (click)="fetchData()">Fetch Data</button>
  `
})
export class MyComponent {
  constructor(private http: HttpClient) {}

  fetchData() {
    this.http.get('https://api.example.com/data')
      .subscribe(data => {
        console.log(data);   

        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('data', JSON.stringify(data));
        }
      });
  }
}