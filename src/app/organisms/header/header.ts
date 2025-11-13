import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  titulo = input.required<string>(); // Configurable
}