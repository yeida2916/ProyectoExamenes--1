import { Component } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-test-generator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TestGeneratorComponent, NavbarComponent],
  templateUrl: './test-generator.component.html',
  styleUrls: ['./test-generator.component.css']
})
export class TestGeneratorComponent {
  navbarVisible: boolean = true;

    }

