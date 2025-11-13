import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HeaderComponent } from '../organisms/header/header';
import { FooterComponent } from '../organisms/footer/footer';
import { PizzaListComponent } from '../organisms/pizza-list/pizza-list';
import { CartSummaryComponent } from '../organisms/cart-summary/cart-summary';
import { CheckoutFormComponent } from '../organisms/checkout-form/checkout-form';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, PizzaListComponent, CartSummaryComponent, CheckoutFormComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePageComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  // ESTA ES LA FUNCIÓN QUE TE FALTABA O TENÍA OTRO NOMBRE
  handleReset() {
    const element = this.document.getElementById('catalogo-pizzas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}