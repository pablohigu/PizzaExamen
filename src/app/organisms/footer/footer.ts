import { Component, input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss' 
})
export class FooterComponent {
  // Input obligatorio(configurable)
  author = input.required<string>(); 
  year = new Date().getFullYear();
}