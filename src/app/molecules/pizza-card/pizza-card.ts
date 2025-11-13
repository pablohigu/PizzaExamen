import { Component, input, output, signal } from '@angular/core';
import { CurrencyPipe, CommonModule } from '@angular/common'; // CommonModule para ngClass
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

  // DICCIONARIO DE ICONOS (Lógica de presentación pura)
  ingredientIcons: {[key: string]: {icon: string, color: string, label: string}} = {
    'tomate': { icon: 'bi-circle-fill', color: 'text-danger', label: 'Salsa de Tomate' },
    'queso': { icon: 'bi-circle-fill', color: 'text-warning', label: 'Mozzarella' },
    'carne': { icon: 'bi-hexagon-fill', color: 'text-danger', label: 'Carne Picada' },
    'cebolla': { icon: 'bi-nut-fill', color: 'text-secondary', label: 'Cebolla' },
    'pescado': { icon: 'bi-water', color: 'text-info', label: 'Anchoas' },
    'ajo': { icon: 'bi-gem', color: 'text-white bg-dark rounded-circle', label: 'Ajo' },
    'setas': { icon: 'bi-umbrella-fill', color: 'text-secondary', label: 'Champiñones' },
    'pimiento': { icon: 'bi-triangle-fill', color: 'text-success', label: 'Pimiento' },
    'piña': { icon: 'bi-sun-fill', color: 'text-warning', label: 'Piña' },
    'jamon': { icon: 'bi-square-fill', color: 'text-danger opacity-75', label: 'Jamón York' },
    'huevo': { icon: 'bi-egg-fill', color: 'text-warning', label: 'Huevo' },
    'bacon': { icon: 'bi-hdd-stack-fill', color: 'text-danger', label: 'Bacon' },
    'albahaca': { icon: 'bi-flower1', color: 'text-success', label: 'Albahaca Fresca' }
  };

  inc() { this.cantidad.update(v => v + 1); }
  dec() { this.cantidad.update(v => v > 1 ? v - 1 : 1); }
  
  submit() {
    this.add.emit({ pizza: this.pizza(), cantidad: this.cantidad() });
    this.cantidad.set(1);
  }

  // Helper para obtener datos del icono de forma segura
  getIcon(ingrediente: string) {
    return this.ingredientIcons[ingrediente] || { icon: 'bi-circle', color: 'text-secondary', label: ingrediente };
  }
}