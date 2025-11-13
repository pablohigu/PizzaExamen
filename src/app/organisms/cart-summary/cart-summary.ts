import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { PizzaService } from '../../services/pizza';
@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.scss'
})
export class CartSummaryComponent {
  service = inject(PizzaService);
}