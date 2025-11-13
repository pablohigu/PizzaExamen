import { Component, input, output, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './pizza-card.html',
  styleUrl: './pizza-card.scss'
})
export class PizzaCardComponent {
  pizza = input.required<Pizza>();
  add = output<{pizza: Pizza, cantidad: number}>();
  cantidad = signal(1);

  inc() { this.cantidad.update(v => v + 1); }
  dec() { this.cantidad.update(v => v > 1 ? v - 1 : 1); }
  
  submit() {
    this.add.emit({ pizza: this.pizza(), cantidad: this.cantidad() });
    this.cantidad.set(1); // Reset
  }
}