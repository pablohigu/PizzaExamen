import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss' // Asegúrate de que este archivo exista
})
export class HeaderComponent {
  // Textos
  titulo = input.required<string>();
  subtitle = input<string>('Sabor auténtico');
  
  // Logos
  pizzaLogoUrl = input<string>(); // Tu logo de pizza (ahora lo renombramos para claridad)
  cuatroVientosLogoUrl = input<string>(); // NUEVO: Logo de Cuatrovientos
  iconClass = input<string>('bi-circle-fill'); // Fallback si no hay pizzaLogoUrl

  // Horarios Configurables
  lunchOpenHour = input<number>(13);
  lunchCloseHour = input<number>(16);
  dinnerOpenHour = input<number>(20);
  dinnerCloseHour = input<number>(24);

  // Estado de la tienda
  shopStatus = signal<{isOpen: boolean, message: string, color: string}>({
    isOpen: false,
    message: 'Calculando...',
    color: 'text-secondary'
  });

  constructor() {
    this.checkStatus();
    setInterval(() => this.checkStatus(), 60000);
  }

  private checkStatus() {
    const now = new Date();
    const hour = now.getHours();

    const isLunch = hour >= this.lunchOpenHour() && hour < this.lunchCloseHour();
    const isDinner = hour >= this.dinnerOpenHour() && hour < this.dinnerCloseHour();

    if (isLunch || isDinner) {
      const closeTime = isLunch ? `${this.lunchCloseHour()}:00` : '00:00';
      this.shopStatus.set({
        isOpen: true,
        message: `ABIERTO • Cierra a las ${closeTime}`,
        color: 'text-success border-success-subtle bg-success-subtle'
      });
    } else {
      let nextOpen = '';
      if (hour < this.lunchOpenHour()) {
        nextOpen = `${this.lunchOpenHour()}:00`;
      } else if (hour < this.dinnerOpenHour()) {
        nextOpen = `${this.dinnerOpenHour()}:00`;
      } else {
        nextOpen = `Mañana ${this.lunchOpenHour()}:00`;
      }
      this.shopStatus.set({
        isOpen: false,
        message: `CERRADO • Abre a las ${nextOpen}`,
        color: 'text-danger border-danger-subtle bg-danger-subtle'
      });
    }
  }
}