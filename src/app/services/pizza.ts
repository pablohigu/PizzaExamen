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
    { id: 4, nombre: 'Vegetariana', precio: 12.00, imagen: 'https://th.bing.com/th/id/R.120755f1eb33b7f12744c1d5a69da28e?rik=BZ4oPZbsLwZy9A&riu=http%3a%2f%2fmilrecetas.net%2fwp-content%2fuploads%2f2015%2f07%2fPizza-Vegetariana-3.jpg&ehk=8AErN32M1kph5rJtEPwsnXdXRv5JQeJ%2fG11%2bZDaJ%2fno%3d&risl=&pid=ImgRaw&r=0', ingredientes: ['setas', 'pimiento', 'cebolla'] },
    { id: 5, nombre: 'Hawaiana', precio: 20.50, imagen: 'https://nuestrasrecetas.es/wp-content/uploads/2015/05/hawaiana-1024x683.jpg', ingredientes: ['piña', 'jamon', 'queso'] },
    { id: 6, nombre: 'Carbonara', precio: 17.00, imagen: 'https://imag.bonviveur.es/articulos/pizza-carbonara.jpg', ingredientes: ['huevo', 'bacon', 'queso'] }
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