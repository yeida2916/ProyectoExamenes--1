import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MyComponent } from './components/my-component';
import { ExamListComponent } from './pages/exam-list/exam-list.component';
import { DescargaPdfComponent } from './pages/pantalla-descarga-pdf/descarga-pdf.component';
import { TestGeneratorComponent } from './pages/test-generator/test-generator.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ExamListComponent, MyComponent, TestGeneratorComponent,DescargaPdfComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
  <router-outlet></router-outlet>
  <app-my-component></app-my-component>

  `,

})
export class AppComponent {
  title = 'ProyectoExamenes';

/**APP-GENERAR EXAMEN */


  /** 1. Introducción
Este documento describe de manera técnica el desarrollo y funcionalidades del proyecto basado en Angular standalone. El objetivo principal es generar exámenes a partir de archivos Excel,
permitiendo su conversión a formato PDF, almacenamiento local en formato .json, y manejo de descargas de los archivos generados.
 El proyecto está diseñado para facilitar la gestión de exámenes por parte de docentes y administradores. */

/** 2. Tecnologías Utilizadas
Framework: Angular (Standalone).
Lenguaje: TypeScript.
Pruebas: Jasmine, para la validación de funcionalidades mediante pruebas unitarias.
Base de datos: MySQL con conexión mediante Java.
Además, se ha configurado TypeScript mediante el archivo tsconfig.spec.json, que especifica las opciones necesarias para compilar y ejecutar las pruebas unitarias del proyecto.

 */


/**4. Componentes del Proyecto
Componentes principales:
Carga de archivos Excel: Pantalla para que los usuarios carguen archivos Excel desde sus dispositivos.
Conversión a PDF: Funcionalidad que procesa el archivo Excel y genera un documento PDF con las preguntas seleccionadas.
Botón de guardar: Permite almacenar los exámenes generados en formato .json localmente.
Descarga de PDF: Proporciona un enlace para descargar los archivos generados.
Todos los componentes están diseñados modularmente, siguiendo las mejores prácticas de Angular. */

/**5. Procesos de Desarrollo
El desarrollo sigue un flujo iterativo:

Implementación de componentes.
Integración de servicios backend y frontend.
Creación y ejecución de pruebas unitarias.
Se utilizan herramientas como Angular CLI para optimizar y acelerar el desarrollo. */

/**6. Generación de Exámenes
El flujo para generar un examen es el siguiente:

Cargar un archivo Excel con preguntas.
Procesar el archivo para extraer preguntas seleccionadas.
Generar un archivo PDF con el contenido seleccionado.
El sistema ofrece una interfaz intuitiva para que los docentes gestionen este proceso fácilmente. */

/**7. Almacenamiento y Descarga
La funcionalidad de almacenamiento local permite guardar exámenes en formato .json. El botón de guardar utiliza la API del navegador para crear y descargar archivos. Ejemplo de implementación:

typescript
Copiar código
 */
}
