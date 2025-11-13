import { Injectable, signal, computed } from '@angular/core';
import { Pizza, CartItem } from '../models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  // Datos limpios con ingredientes como strings identificadores
  private readonly mockPizzas: Pizza[] = [
    { id: 1, nombre: 'Margarita', precio: 15.50, imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80', ingredientes: ['tomate', 'queso', 'albahaca'] },
    { id: 2, nombre: 'BBQ', precio: 18.00, imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80', ingredientes: ['carne', 'cebolla', 'queso'] },
    { id: 3, nombre: 'Napolitana', precio: 16.00, imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80', ingredientes: ['pescado', 'tomate', 'ajo'] },
    { id: 4, nombre: 'Vegetariana', precio: 12.00, imagen: 'https://images.unsplash.com/photo-1571407970349-bc1671709caa?auto=format&fit=crop&w=500&q=80', ingredientes: ['setas', 'pimiento', 'cebolla'] },
    { id: 5, nombre: 'Hawaiana', precio: 20.50, imagen: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=80', ingredientes: ['piña', 'jamon', 'queso'] },
    { id: 6, nombre: 'Carbonara', precio: 17.00, imagen: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=500&q=80', ingredientes: ['huevo', 'bacon', 'queso'] }
  ];

  pizzas = signal<Pizza[]>(this.mockPizzas);
  cart = signal<CartItem[]>([]);

  totalPrice = computed(() => this.cart().reduce((acc, i) => acc + i.subtotal, 0));

  addToCart(pizza: Pizza, cantidad: number) {
    this.cart.update(items => {
      const existing = items.find(i => i.pizza.id === pizza.id);
      if (existing) {
        return items.map(i => i.pizza.id === pizza.id 
          ? { ...i, cantidad: i.cantidad + cantidad, subtotal: (i.cantidad + cantidad) * i.pizza.precio } 
          : i);
      }
      return [...items, { pizza, cantidad, subtotal: pizza.precio * cantidad }];
    });
  }

  clearCart() {
    this.cart.set([]);
  }
}