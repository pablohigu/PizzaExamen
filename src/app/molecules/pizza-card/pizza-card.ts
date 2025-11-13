import { Component, input, output, signal } from '@angular/core';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './pizza-card.html',
  styleUrl: './pizza-card.scss'
})
export class PizzaCardComponent {
  pizza = input.required<Pizza>();
  add = output<{pizza: Pizza, cantidad: number}>();
  
  cantidad = signal(1);

  readonly DEFAULT_IMG = 'https://img.icons8.com/color/48/ingredients.png';

  ingredientImages: {[key: string]: string} = {
    'tomate': 'https://img.icons8.com/color/48/tomato.png',
    'queso': 'https://img.icons8.com/color/48/cheese.png',
    'carne': 'https://img.icons8.com/color/48/steak-medium.png',
    'bacon': 'https://img.icons8.com/color/48/bacon.png',
    'piña': 'https://img.icons8.com/color/48/pineapple.png',
    'huevo': 'https://img.icons8.com/color/48/egg.png',
    'albahaca': 'https://img.icons8.com/color/48/basil.png',
    'pimiento': 'https://img.icons8.com/color/48/paprika.png',
    'cebolla': 'https://img.icons8.com/color/48/onion.png',
    'setas': 'https://img.icons8.com/color/48/mushroom.png',
    'ajo': 'https://img.icons8.com/color/48/garlic.png'
  };

  inc() { this.cantidad.update(v => v + 1); }
  dec() { this.cantidad.update(v => v > 1 ? v - 1 : 1); }
  
  submit() {
    this.add.emit({ pizza: this.pizza(), cantidad: this.cantidad() });
    this.cantidad.set(1);
  }
  getIngredientImage(ingrediente: string): string {
    return this.ingredientImages[ingrediente] || this.DEFAULT_IMG;
  }

  handleImageError(event: any) {
    event.target.src = this.DEFAULT_IMG;
  }
}