import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  // Configuración obligatoria según examen
  author = input.required<string>();
  
  // Configuraciones opcionales para dar contexto
  course = input<string>('2º DAM - Desarrollo de Interfaces');
  email = input<string>('info@4vpizza.com');
  
  // Cálculo automático del año (Requisito Examen)
  currentYear = new Date().getFullYear();
}