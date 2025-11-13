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

  // DICCIONARIO DE ICONOS (Formas y Colores Bootstrap)
  ingredientConfig: {[key: string]: {icon: string, color: string}} = {
    // Rojos
    'tomate': { icon: 'bi-circle-fill', color: 'text-danger' },
    'carne': { icon: 'bi-hexagon-fill', color: 'text-danger' },
    'jamon': { icon: 'bi-square-fill', color: 'text-danger opacity-75' },
    'bacon': { icon: 'bi-hdd-stack-fill', color: 'text-danger' },
    
    // Amarillos/Naranjas
    'queso': { icon: 'bi-circle-fill', color: 'text-warning' },
    'piña': { icon: 'bi-sun-fill', color: 'text-warning' },
    'huevo': { icon: 'bi-egg-fill', color: 'text-warning' },
    
    // Verdes/Vegetales
    'albahaca': { icon: 'bi-flower1', color: 'text-success' },
    'pimiento': { icon: 'bi-triangle-fill', color: 'text-success' },
    
    // Neutros/Otros
    'cebolla': { icon: 'bi-nut-fill', color: 'text-secondary' },
    'setas': { icon: 'bi-umbrella-fill', color: 'text-secondary' },
    'ajo': { icon: 'bi-gem', color: 'text-dark' },
    'pescado': { icon: 'bi-water', color: 'text-info' }
  };

  inc() { this.cantidad.update(v => v + 1); }
  dec() { this.cantidad.update(v => v > 1 ? v - 1 : 1); }
  
  submit() {
    this.add.emit({ pizza: this.pizza(), cantidad: this.cantidad() });
    this.cantidad.set(1);
  }

  // Helper para obtener la config, con fallback por si falta alguno
  getConfig(ingrediente: string) {
    return this.ingredientConfig[ingrediente] || { icon: 'bi-circle', color: 'text-muted' };
  }
}