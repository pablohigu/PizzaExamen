import { Component, input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss' // Opcional si no metes estilos específicos
})
export class FooterComponent {
  // Input obligatorio como pide el examen (configurable)
  author = input.required<string>(); 
  
  // Cálculo del año actual
  year = new Date().getFullYear();
}