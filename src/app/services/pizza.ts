import { Injectable, signal, computed } from '@angular/core';
import { Pizza, CartItem } from '../models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  // Datos del catálogo (Mock)
  private readonly mockPizzas: Pizza[] = [
    { id: 1, nombre: 'Margarita', precio: 15.50, imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002', ingredientes: ['🧀', '🍅'] },
    { id: 2, nombre: 'BBQ', precio: 18.00, imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', ingredientes: ['🍖', '🧅', '🥓'] },
    { id: 3, nombre: 'Napolitana', precio: 16.00, imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591', ingredientes: ['🐟', '🍅', '🧄'] },
    { id: 4, nombre: 'Vegetariana', precio: 12.00, imagen: 'https://images.unsplash.com/photo-1571407970349-bc1671709caa', ingredientes: ['🍄', '🫑', '🧅'] },
    { id: 5, nombre: 'Hawaiana', precio: 20.50, imagen: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', ingredientes: ['🍍', '🍖', '🧀'] },
    { id: 6, nombre: 'Carbonara', precio: 17.00, imagen: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56', ingredientes: ['🥚', '🥓', '🧀'] }
  ];

  // Estados (Signals)
  pizzas = signal<Pizza[]>(this.mockPizzas);
  cart = signal<CartItem[]>([]);

  // Computados (Se actualizan solos)
  totalPrice = computed(() => this.cart().reduce((acc, i) => acc + i.subtotal, 0));

  // Acciones
  addToCart(pizza: Pizza, cantidad: number) {
    this.cart.update(items => {
      const existing = items.find(i => i.pizza.id === pizza.id);
      if (existing) {
        // Si ya existe, actualizamos la cantidad
        return items.map(i => i.pizza.id === pizza.id 
          ? { ...i, cantidad: i.cantidad + cantidad, subtotal: (i.cantidad + cantidad) * i.pizza.precio } 
          : i);
      }
      // Si no existe, lo añadimos
      return [...items, { pizza, cantidad, subtotal: pizza.precio * cantidad }];
    });
  }

  clearCart() {
    this.cart.set([]);
  }
}