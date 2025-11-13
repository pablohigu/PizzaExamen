import { Component, input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  author = input.required<string>(); 
  course = input<string>('2º DAM'); // Nuevo input opcional
  email = input<string>('contacto@4vpizza.com'); // Nuevo input opcional
  
  year = new Date().getFullYear();
}