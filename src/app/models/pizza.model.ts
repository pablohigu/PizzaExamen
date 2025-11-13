export interface Pizza {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  ingredientes: string[];
}

export interface CartItem {
  pizza: Pizza;
  cantidad: number;
  subtotal: number;
}